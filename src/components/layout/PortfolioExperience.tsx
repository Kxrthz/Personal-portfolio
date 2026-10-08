"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Navigation } from "./Navigation";
import { Hero } from "./Hero";
import { About } from "./About";
import { SkillsSection } from "./SkillsSection";
import { ProjectShowcase } from "./ProjectShowcase";
import { Part4Sections } from "./Part4Sections";
import type { Destination } from "./Navigation";
import { projects } from "../../data/portfolio";
import { initStoryScroll } from "../scroll/scrollAnimations";
import { registerSectionTransitions } from "../scroll/sectionTransitions";
import { CinematicWorld, type ScrollProgress } from "../scroll/CinematicWorld";

const bootLines = ["loading identity...", "loading projects...", "loading experience...", "loading skills...", "system ready."];
gsap.registerPlugin(ScrollTrigger);

export function PortfolioExperience() {
  const [bootCount, setBootCount] = useState(0);
  const [bootDone, setBootDone] = useState(false);
  const [section, setSection] = useState<Destination | "ending">("home");
  const sceneRef = useRef<HTMLDivElement>(null);
  const panelsRef = useRef<HTMLDivElement>(null);
  const mainRef = useRef<HTMLElement>(null);
  const homeRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLSpanElement>(null);
  const roleRef = useRef<HTMLSpanElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const worldProgress = useRef<ScrollProgress>({ current: 0, invalidate: null });
  const worldAnchors = useRef<number[]>([]);

  const finishBoot = useCallback(() => setBootDone(true), []);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setBootCount(bootLines.length);
      setBootDone(true);
      return;
    }
    const timers = bootLines.map((_, index) => window.setTimeout(() => setBootCount(index + 1), 170 + index * 220));
    const finishTimer = window.setTimeout(finishBoot, 2000);
    const onKeyDown = (event: KeyboardEvent) => { if (event.key === "Escape") finishBoot(); };
    window.addEventListener("keydown", onKeyDown);
    return () => { timers.forEach(window.clearTimeout); window.clearTimeout(finishTimer); window.removeEventListener("keydown", onKeyDown); };
  }, [finishBoot]);

  useEffect(() => {
    const scene = sceneRef.current, panels = panelsRef.current, home = homeRef.current, about = aboutRef.current;
    const homeTitle = titleRef.current, roleTitle = roleRef.current, homeTerminal = terminalRef.current;
    if (!scene || !panels || !home || !about || !homeTitle || !roleTitle || !homeTerminal) return;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const cleanup = initStoryScroll({ scene, panels, home, about, homeTitle, roleTitle, homeTerminal, setSection, reducedMotion });
    return cleanup;
  }, [setSection]);

  useEffect(() => {
    if (!bootDone || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const home = homeRef.current;
    if (!home) return;
    const intro = gsap.context(() => {
      gsap.fromTo(".hero-kicker, .hero-description, .hero-actions", { y: 24, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.78, stagger: 0.12, ease: "power2.out" });
    }, home);
    return () => intro.revert();
  }, [bootDone]);

  useEffect(() => {
    const main = mainRef.current;
    if (!main) return;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const context = gsap.context(() => {
      registerSectionTransitions(main, reducedMotion);
      const anchorIds = ["skills", "projects", "nivor", "medishield", "tmfy", "experience", "education", "certifications", "achievements", "contact", "ending"];
      const measureAnchors = () => {
        const story = sceneRef.current;
        const storyTop = story ? story.getBoundingClientRect().top + window.scrollY : 0;
        const aboutY = story ? storyTop + Math.max(0, story.offsetHeight - window.innerHeight) * 0.58 : 0;
        worldAnchors.current = [0, aboutY, ...anchorIds.map((id) => {
          const node = main.querySelector<HTMLElement>(`#${id}`);
          return node ? node.getBoundingClientRect().top + window.scrollY : 0;
        })];
      };
      const updateWorldProgress = () => {
        const anchors = worldAnchors.current;
        if (anchors.length < 2) return;
        const scrollY = window.scrollY;
        let index = 0;
        while (index < anchors.length - 2 && scrollY >= anchors[index + 1]) index++;
        const start = anchors[index];
        const end = Math.max(start + 1, anchors[index + 1]);
        worldProgress.current.current = index + Math.max(0, Math.min(1, (scrollY - start) / (end - start)));
        worldProgress.current.invalidate?.();
      };
      const updateSection = () => {
        const story = sceneRef.current;
        const storyTop = story ? story.getBoundingClientRect().top + window.scrollY : 0;
        const storyEnd = storyTop + Math.max(0, (story?.offsetHeight ?? 0) - window.innerHeight);
        // The pinned Home/About story owns its indicator until its scroll scene
        // has completed. In the short gap before Skills reaches the reading line,
        // keep About selected instead of leaving a stale Skills indicator.
        if (window.scrollY <= storyEnd) return;
        const skills = main.querySelector<HTMLElement>("#skills");
        if (!skills) return;
        const readingLine = window.scrollY + window.innerHeight * 0.45;
        if (readingLine < skills.getBoundingClientRect().top + window.scrollY) {
          setSection("about");
          return;
        }
        const order = ["skills", "projects", "experience", "education", "certifications", "achievements", "contact", "ending"] as const;
        let current: (typeof order)[number] = "skills";
        for (const id of order) {
          const sectionNode = main.querySelector<HTMLElement>(`#${id}`);
          if (sectionNode && sectionNode.getBoundingClientRect().top + window.scrollY <= readingLine) current = id;
        }
        setSection(current);
      };
      measureAnchors();
      ScrollTrigger.create({
        trigger: document.documentElement,
        start: "top top",
        end: "bottom bottom",
        invalidateOnRefresh: true,
        onRefresh: () => { measureAnchors(); updateWorldProgress(); updateSection(); },
        onUpdate: (self) => {
          if (progressRef.current) gsap.set(progressRef.current, { scaleX: self.progress });
          updateWorldProgress();
          updateSection();
        },
      });
      updateWorldProgress();
      if (!reducedMotion) {
        const experience = main.querySelector<HTMLElement>("#experience");
        const line = main.querySelector<HTMLElement>("[data-timeline-line]");
        if (line && experience) gsap.fromTo(line, { scaleY: 0, transformOrigin: "top center" }, { scaleY: 1, ease: "none", scrollTrigger: { trigger: experience, start: "top 70%", end: "bottom 55%", scrub: true } });
        main.querySelectorAll<HTMLElement>("[data-timeline-item]").forEach((item) => {
          const dot = item.querySelector<HTMLElement>(".timeline-dot");
          if (dot) gsap.fromTo(dot, { scale: 0.7, backgroundColor: "#49443a" }, { scale: 1, backgroundColor: "#e0b363", ease: "none", scrollTrigger: { trigger: item, start: "top 75%", end: "top 45%", scrub: true } });
        });
      }
      ScrollTrigger.refresh();
    }, main);
    let mounted = true;
    void document.fonts.ready.then(() => {
      if (mounted) ScrollTrigger.refresh();
    });
    return () => { mounted = false; context.revert(); };
  }, []);

  const goToSection = useCallback((destination: Destination) => {
    const node = document.getElementById(destination);
    if (!node) return;
    setSection(destination);
    const target = destination === "home" ? 0 : destination === "about" ? (sceneRef.current?.offsetTop ?? 0) + (sceneRef.current?.offsetHeight ?? 0) - window.innerHeight + 16 : node.getBoundingClientRect().top + window.scrollY - 88;
    window.scrollTo({ top: Math.max(0, target), behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
  }, []);

  return <>
    <div className="experience-shell" data-loading={bootDone ? undefined : "true"}>
    <CinematicWorld progress={worldProgress.current}/>
    <div className="scroll-progress" aria-hidden="true"><div ref={progressRef}/></div>
    <div className="section-indicator" aria-live="polite"><span className="section-number"><span key={section} className="section-digit">{{ home: "01", about: "02", skills: "03", projects: "04", experience: "05", education: "06", certifications: "07", achievements: "08", contact: "09", ending: "10" }[section]}</span><i> / 10</i></span><span className="section-name">{section.toUpperCase()}</span></div>
    <Navigation onNavigate={goToSection}/>
    <main ref={mainRef} className="portfolio-main">
    <div className="story-scene" ref={sceneRef}>
      <div className="scene-panels" ref={panelsRef}>
        <div ref={homeRef} className="scene-home"><Hero titleRef={titleRef} roleRef={roleRef} terminalRef={terminalRef}/></div>
        <div ref={aboutRef} className="scene-about" data-cinematic-section><About onNavigate={goToSection}/></div>
      </div>
    </div>
    <SkillsSection/>
    <section id="projects" className="projects-section" aria-labelledby="projects-title" data-cinematic-section>
      <div className="projects-intro" data-cinematic-content><div className="chapter-head"><p>04 / SELECTED WORK</p><span>PROJECTS / 03</span></div><h2 id="projects-title">BUILT WITH<br/><em>INTENTION.</em></h2></div>
    </section>
    {projects.map((project) => <ProjectShowcase key={project.id} project={project}/>) }
    <Part4Sections onNavigate={goToSection}/>
    </main>
    <div className="grain" aria-hidden="true"/>
    <div className={bootDone ? "boot-overlay is-finished" : "boot-overlay"} aria-live={bootDone ? "off" : "polite"} aria-hidden={bootDone} aria-label="Portfolio boot sequence">
      <div className="boot-window"><div className="boot-heading"><span><i/> TERMINAL / BOOT</span><button onClick={finishBoot} data-cursor="hand">SKIP <b>↗</b></button></div><p className="boot-command"><span>karthikeya@dev:~$</span> init portfolio<i/></p><div className="boot-progress" role="progressbar" aria-label="Loading portfolio" aria-valuemin={0} aria-valuemax={100}><span className="boot-progress-fill"/></div><div className="boot-lines">{bootLines.slice(0, bootCount).map((line, index) => <p key={line} style={{ animationDelay: `${index * 15}ms` }}>&gt; {line}</p>)}</div></div>
    </div>
    </div>
  </>;
}
