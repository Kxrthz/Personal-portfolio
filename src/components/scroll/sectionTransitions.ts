import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const clamp01 = (value: number) => Math.max(0, Math.min(1, value));
const mix = (from: number, to: number, progress: number) => from + (to - from) * progress;

/**
 * One scrubbed trigger per section boundary animates both scenes together.
 * The outgoing scene recedes as the incoming scene is masked and brought
 * forward, so normal scrolling never has to wait for a one-shot entrance.
 */
export function registerSectionTransitions(scope: ParentNode, reducedMotion: boolean) {
  const sections = Array.from(scope.querySelectorAll<HTMLElement>("[data-cinematic-section]"));

  sections.slice(1).forEach((incomingSection, index) => {
    const outgoingSection = sections[index];
    const outgoing = outgoingSection.querySelector<HTMLElement>("[data-cinematic-content]");
    const incoming = incomingSection.querySelector<HTMLElement>("[data-cinematic-content]");
    if (!outgoing || !incoming) return;

    const outgoingHeading = outgoing.querySelector<HTMLElement>("h1, h2, h3");
    const incomingHeading = incoming.querySelector<HTMLElement>("h1, h2, h3");
    const outgoingVisual = outgoingSection.querySelector<HTMLElement>("[data-project-visual]");
    const incomingVisual = incomingSection.querySelector<HTMLElement>("[data-project-visual]");
    const incomingSkills = Array.from(incomingSection.querySelectorAll<HTMLElement>("[data-skill-reveal]"));
    const mobile = window.matchMedia("(max-width: 720px)").matches;
    const isProject = incomingSection.matches("[data-project-chapter]");
    const isClosing = incomingSection.id === "ending";
    const isAchievement = incomingSection.id === "achievements";
    const state = { progress: 0 };

    const render = (rawProgress: number) => {
      const progress = clamp01(rawProgress);
      const inY = reducedMotion ? 0 : mobile ? 5 : isProject ? 10 : isClosing ? 3 : 7;
      const outY = reducedMotion ? 0 : mobile ? -3 : isClosing ? -4 : 5;
      const inScale = reducedMotion ? 1 : isProject ? 0.994 : isClosing ? 0.996 : 0.991;
      const outScale = reducedMotion ? 1 : 0.994;
      const inMask = reducedMotion ? 0 : mobile ? 3 : isProject ? 12 : 8;
      const outMask = reducedMotion ? 0 : mobile ? 2 : 6;

      gsap.set(outgoing, {
        y: outY * progress,
        z: (reducedMotion ? 0 : -34) * progress,
        rotationX: (reducedMotion ? 0 : -0.55) * progress,
        transformPerspective: 1500,
        scale: mix(1, outScale, progress),
        autoAlpha: 1,
        clipPath: `inset(0% 0% ${outMask * progress}%)`,
      });
      gsap.set(incoming, {
        y: inY * (1 - progress),
        z: (reducedMotion ? 0 : -86) * (1 - progress),
        rotationY: (reducedMotion ? 0 : (index % 2 === 0 ? 1 : -1) * 2.2) * (1 - progress),
        rotationX: (reducedMotion ? 0 : 0.8) * (1 - progress),
        transformPerspective: 1500,
        scale: mix(inScale, 1, progress),
        autoAlpha: 1,
        clipPath: `inset(${inMask * (1 - progress)}% 0% 0%)`,
      });

      if (outgoingHeading) {
        gsap.set(outgoingHeading, {
          y: (reducedMotion ? 0 : -9) * progress,
          scale: mix(1, reducedMotion ? 1 : 0.992, progress),
          letterSpacing: reducedMotion ? "" : `${0.004 * progress}em`,
        });
      }
      if (incomingHeading) {
        gsap.set(incomingHeading, {
          y: (reducedMotion ? 0 : 12) * (1 - progress),
          scale: mix(reducedMotion ? 1 : 0.98, isAchievement ? 1.008 : 1, progress),
          letterSpacing: reducedMotion ? "" : `${0.009 * (1 - progress)}em`,
        });
      }

      if (outgoingVisual) gsap.set(outgoingVisual, { scale: mix(1, reducedMotion ? 1 : 0.982, progress) });
      if (incomingVisual) gsap.set(incomingVisual, { scale: mix(reducedMotion ? 1 : 0.95, isProject ? 1.008 : 1, progress) });

      incomingSkills.forEach((group, groupIndex) => {
        const start = 0.28 + groupIndex * (mobile ? 0.055 : 0.065);
        const reveal = clamp01((progress - start) / (mobile ? 0.22 : 0.27));
        gsap.set(group, {
          clipPath: reducedMotion ? "inset(0% 0% 0%)" : `inset(${7 * (1 - reveal)}% 0% 0%)`,
          autoAlpha: reducedMotion ? 1 : mix(0.88, 1, reveal),
        });
      });

      // The warm surface plane drifts less than the foreground content and
      // stays present through the end of the handoff.
      gsap.set(outgoingSection, {
        "--scene-drift": `${(reducedMotion ? 0 : 5) * progress}px`,
        "--scene-light": mix(0.035, 0.012, progress),
      });
      gsap.set(incomingSection, {
        "--scene-drift": `${(reducedMotion ? 0 : -5) * (1 - progress)}px`,
        "--scene-light": mix(0.012, 0.035, progress),
      });
    };

    render(0);
    gsap.to(state, {
      progress: 1,
      duration: 1,
      ease: "none",
      onUpdate: () => render(state.progress),
      scrollTrigger: {
        trigger: incomingSection,
        // Begin just before the next block reaches the viewport so the
        // outgoing layer can recede while the incoming one arrives.
        start: mobile ? "top bottom+=42" : "top bottom+=88",
        end: "top 45%",
        scrub: true,
        invalidateOnRefresh: true,
      },
    });
  });
}
