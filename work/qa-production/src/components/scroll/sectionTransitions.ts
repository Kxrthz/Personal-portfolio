import gsap from "gsap";

/** Attach the same reversible entrance scrub to each marked section in a scope. */
export function registerSectionTransitions(scope: ParentNode, reducedMotion: boolean) {
  scope.querySelectorAll<HTMLElement>("[data-cinematic-section]").forEach((section) => {
    const content = section.querySelector<HTMLElement>("[data-cinematic-content]");
    if (!content) return;

    const from = reducedMotion ? { autoAlpha: 0.9 } : { y: 22, autoAlpha: 0.78 };
    gsap.fromTo(
      content,
      from,
      {
        ...(reducedMotion ? {} : { y: 0 }),
        autoAlpha: 1,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top 90%",
          end: "top 54%",
          scrub: true,
          invalidateOnRefresh: true,
        },
      },
    );
  });
}
