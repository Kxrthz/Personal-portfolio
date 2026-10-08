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
      // Fully clear Home as the About panel arrives; keeping the outgoing hero
      // visible underneath made the first page read like a ghosted duplicate.
      const homeFade = clamp01(progress / 0.3);
      const homeProgress = clamp01((progress - 0.12) / 0.2);
      const aboutProgress = clamp01((progress - 0.32) / 0.62);
      const aboutContent = about.querySelector<HTMLElement>("[data-cinematic-content]");

      // Derive every animated value from the current scroll progress. This makes
      // reverse scrolling deterministic, including under reduced-motion settings.
      gsap.set(homeTitle, {
        yPercent: (reducedMotion ? -4 : -38) * progress,
        z: (reducedMotion ? 0 : -165) * titleProgress,
        rotationX: (reducedMotion ? 0 : -2.4) * titleProgress,
        transformPerspective: 1400,
        autoAlpha: 1,
      });
      gsap.set(roleTitle, {
        xPercent: (reducedMotion ? 0 : 7) * progress,
        yPercent: (reducedMotion ? -2 : -20) * progress,
        z: (reducedMotion ? 0 : -125) * titleProgress,
        rotationY: (reducedMotion ? 0 : -1.5) * titleProgress,
        transformPerspective: 1400,
        autoAlpha: 1,
      });
      gsap.set(homeTerminal, {
        y: (reducedMotion ? 0 : -18) * progress,
        z: (reducedMotion ? 0 : -78) * progress,
        autoAlpha: 1,
      });
      gsap.set(home, {
        autoAlpha: 1 - homeFade,
        scale: reducedMotion ? 1 : 1 - 0.018 * homeProgress,
        z: (reducedMotion ? 0 : -120) * homeProgress,
        rotationX: (reducedMotion ? 0 : -1.3) * homeProgress,
        transformPerspective: 1400,
      });
      gsap.set(about, {
        // Keep the scene's opaque backdrop independent from its content fade,
        // so the outgoing Home panel cannot show through the About panel.
        autoAlpha: aboutProgress > 0 ? 1 : 0,
        y: (reducedMotion ? 0 : 7) * (1 - aboutProgress),
        z: (reducedMotion ? 0 : -125) * (1 - aboutProgress),
        rotationX: (reducedMotion ? 0 : 1.4) * (1 - aboutProgress),
        scale: reducedMotion ? 1 : 0.985 + 0.015 * aboutProgress,
        transformPerspective: 1400,
        clipPath: reducedMotion ? "inset(0% 0% 0%)" : `inset(${10 * (1 - aboutProgress)}% 0% 0%)`,
      });
      if (aboutContent) gsap.set(aboutContent, {
        autoAlpha: aboutProgress > 0 ? 1 : 0,
        y: (reducedMotion ? 0 : 8) * (1 - aboutProgress),
        z: (reducedMotion ? 0 : -70) * (1 - aboutProgress),
        transformPerspective: 1400,
        clipPath: reducedMotion ? "inset(0% 0% 0%)" : `inset(${8 * (1 - aboutProgress)}% 0% 0%)`,
      });
      const sceneTop = scene.getBoundingClientRect().top + window.scrollY;
      const sceneEnd = sceneTop + scene.offsetHeight - window.innerHeight;
      // The story trigger clamps to progress 1 after its scene ends. On a
      // restored deep-scroll page load, do not let that final story update
      // overwrite the section selected by the rest of the page.
      if (window.scrollY <= sceneTop) setSection("home");
      else if (window.scrollY < sceneEnd) setSection(progress > 0.32 ? "about" : "home");
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
