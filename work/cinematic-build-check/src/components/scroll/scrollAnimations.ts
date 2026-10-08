import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function initStoryScroll({
  scene,
  panels,
  home,
  about,
  homeTitle,
  roleTitle,
  homeTerminal,
  setSection,
  reducedMotion,
}: {
  scene: HTMLElement;
  panels: HTMLElement;
  home: HTMLElement;
  about: HTMLElement;
  homeTitle: HTMLElement;
  roleTitle: HTMLElement;
  homeTerminal: HTMLElement;
  setSection: (section: "home" | "about") => void;
  reducedMotion: boolean;
}) {
  const ctx = gsap.context(() => {
    const clamp01 = (value: number) => Math.max(0, Math.min(1, value));
    const sceneState = { progress: 0 };
    const renderScene = (progress: number) => {
      const titleProgress = clamp01(progress / 0.7);
      const homeProgress = clamp01((progress - 0.28) / 0.45);
      const aboutProgress = clamp01((progress - 0.32) / 0.62);

      // Derive every animated value from the current scroll progress. This makes
      // reverse scrolling deterministic, including under reduced-motion settings.
      gsap.set(homeTitle, {
        yPercent: (reducedMotion ? -4 : -38) * progress,
        autoAlpha: 1 - (1 - (reducedMotion ? 0.45 : 0.12)) * titleProgress,
      });
      gsap.set(roleTitle, {
        xPercent: (reducedMotion ? 0 : 7) * progress,
        yPercent: (reducedMotion ? -2 : -20) * progress,
        autoAlpha: 1 - (1 - (reducedMotion ? 0.55 : 0.18)) * titleProgress,
      });
      gsap.set(homeTerminal, {
        y: (reducedMotion ? 0 : -18) * progress,
        autoAlpha: 1 - (1 - (reducedMotion ? 0.65 : 0.15)) * clamp01(progress / 0.6),
      });
      gsap.set(home, {
        autoAlpha: 1 - (1 - (reducedMotion ? 0.35 : 0.12)) * homeProgress,
        scale: reducedMotion ? 1 : 1 - 0.018 * homeProgress,
      });
      gsap.set(about, {
        autoAlpha: aboutProgress,
        y: (reducedMotion ? 0 : 20) * (1 - aboutProgress),
        scale: reducedMotion ? 1 : 0.985 + 0.015 * aboutProgress,
        clipPath: reducedMotion ? "inset(0% 0% 0%)" : `inset(${7 * (1 - aboutProgress)}% 0% 0%)`,
      });
      setSection(progress > 0.32 ? "about" : "home");
    };

    renderScene(0);
    const transition = gsap.timeline({
      scrollTrigger: {
        trigger: scene,
        start: "top top",
        end: "bottom bottom",
        // Keep the animation tied to the scroll position in every motion mode so it
        // always reverses cleanly. Reduced-motion mode only shortens the movement.
        scrub: true,
        onUpdate: (self) => renderScene(self.progress),
        onRefresh: (self) => renderScene(self.progress),
      },
    });
    transition.to(sceneState, { progress: 1, duration: 1, ease: "none" });

  }, panels);

  return () => ctx.revert();
}
