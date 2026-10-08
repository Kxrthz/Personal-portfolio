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

const bootLines = ["loading identity...", "loading projects...", "loading experience...", "loading skills...", "system ready."];
gsap.registerPlugin(ScrollTrigger);

export function PortfolioExperience() {
  const [bootCount, setBootCount] = useState(0);
  const [bootDone, setBootDone] = useState(false);
  const [section, setSection] = useState<Destination | "ending">("home");
  const sceneRef = useRef<HTMLDivElement>(null);
  const panelsRef = useRef<HTMLDivElement>(null);
  const homeRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLSpanElement>(null);
  const roleRef = useRef<HTMLSpanElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  const finishBoot = useCallback(() => setBootDone(true), []);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setBootCount(bootLines.length);
      setBootDone(true);
      return;
    }
    const timers = bootLines.map((_, index) => window.setTimeout(() => setBootCount(index + 1), 170 + index * 220));
    const finishTimer = window.setTimeout(finishBoot, 1780);
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
    const intro = gsap.context(() => {
      if (!reducedMotion) {
        gsap.fromTo("[data-hero-reveal]", { y: 24, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.78, stagger: 0.12, ease: "power2.out", delay: bootDone ? 0 : 1.68 });
      }
    }, home);
    return () => { cleanup(); intro.revert(); };
  }, [bootDone]);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const context = gsap.context(() => {
      registerSectionTransitions(document.querySelector(".portfolio-main") ?? document, reducedMotion);
      ScrollTrigger.create({
        trigger: document.documentElement,
        start: "top top",
        end: "bottom bottom",
        onUpdate: (self) => {
          if (progressRef.current) gsap.set(progressRef.current, { scaleX: self.progress });
          const skills = document.getElementById("skills");
          if (!skills || window.scrollY + window.innerHeight * 0.45 < skills.getBoundingClientRect().top + window.scrollY) return;
          const order = ["skills", "projects", "experience", "education", "certifications", "achievements", "contact", "ending"] as const;
          const readingLine = window.scrollY + window.innerHeight * 0.45;
          let current: (typeof order)[number] = "skills";
          for (const id of order) {
            const sectionNode = document.getElementById(id);
            if (sectionNode && sectionNode.getBoundingClientRect().top + window.scrollY <= readingLine) current = id;
          }
          setSection(current);
        },
      });
      document.querySelectorAll<HTMLElement>("[data-project-chapter]").forEach((chapter) => {
        const visual = chapter.querySelector<HTMLElement>("[data-project-visual]");
        if (!visual || reducedMotion) return;
        gsap.fromTo(visual, { scale: 0.96 }, { scale: 1, ease: "none", scrollTrigger: { trigger: chapter, start: "top 90%", end: "top 54%", scrub: true, invalidateOnRefresh: true } });
      });
      if (!reducedMotion) {
        gsap.fromTo("[data-skill-reveal]", { y: 18, autoAlpha: 0.28 }, { y: 0, autoAlpha: 1, stagger: 0.08, ease: "none", scrollTrigger: { trigger: "#skills", start: "top 80%", end: "top 15%", scrub: true } });
        document.querySelectorAll<HTMLElement>("[data-chapter-reveal]").forEach((element) => {
          gsap.fromTo(element, { y: 20, autoAlpha: 0.35 }, { y: 0, autoAlpha: 1, ease: "none", scrollTrigger: { trigger: element, start: "top 88%", end: "top 55%", scrub: true } });
        });
        const line = document.querySelector<HTMLElement>("[data-timeline-line]");
        if (line) gsap.fromTo(line, { scaleY: 0, transformOrigin: "top center" }, { scaleY: 1, ease: "none", scrollTrigger: { trigger: "#experience", start: "top 70%", end: "bottom 55%", scrub: true } });
        document.querySelectorAll<HTMLElement>("[data-timeline-item]").forEach((item) => {
          const dot = item.querySelector<HTMLElement>(".timeline-dot");
          if (dot) gsap.fromTo(dot, { scale: 0.7, backgroundColor: "#49443a" }, { scale: 1, backgroundColor: "#e0b363", ease: "none", scrollTrigger: { trigger: item, start: "top 75%", end: "top 45%", scrub: true } });
        });
      }
      ScrollTrigger.refresh();
    });
    return () => context.revert();
  }, []);

  const goToSection = useCallback((destination: Destination) => {
    const node = document.getElementById(destination);
    if (!node) return;
    setSection(destination);
    const target = destination === "home" ? 0 : destination === "about" ? (sceneRef.current?.offsetTop ?? 0) + (sceneRef.current?.offsetHeight ?? 0) - window.innerHeight + 16 : node.getBoundingClientRect().top + window.scrollY - 88;
    window.scrollTo({ top: Math.max(0, target), behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
  }, []);

  return <>
    <div className="experience-shell">
    <div className="scroll-progress" aria-hidden="true"><div ref={progressRef}/></div>
    <div className="section-indicator" aria-live="polite"><span className="section-number"><span key={section} className="section-digit">0{{ home: "1", about: "2", projects: "3", skills: "4", experience: "4", education: "5", certifications: "5", achievements: "5", contact: "6", ending: "6" }[section]}</span><i> / 06</i></span><span className="section-name">{section.toUpperCase()}</span></div>
    <Navigation onNavigate={goToSection}/>
    <main className="portfolio-main">
    <div className="story-scene" ref={sceneRef}>
      <div className="scene-panels" ref={panelsRef}>
        <div ref={homeRef} className="scene-home"><Hero titleRef={titleRef} roleRef={roleRef} terminalRef={terminalRef}/></div>
        <div ref={aboutRef} className="scene-about"><About onNavigate={goToSection}/></div>
      </div>
    </div>
    <SkillsSection/>
    <section id="projects" className="projects-section" aria-labelledby="projects-title" data-cinematic-section>
      <div className="projects-intro" data-cinematic-content><div className="chapter-head"><p>03 / SELECTED WORK</p><span>PROJECTS / 03</span></div><h2 id="projects-title">BUILT WITH<br/><em>INTENTION.</em></h2></div>
      {projects.map((project) => <ProjectShowcase key={project.id} project={project}/>) }
    </section>
    <Part4Sections onNavigate={goToSection}/>
    </main>
    <div className="grain" aria-hidden="true"/>
    <div className={bootDone ? "boot-overlay is-finished" : "boot-overlay"} aria-live={bootDone ? "off" : "polite"} aria-hidden={bootDone} aria-label="Portfolio boot sequence">
      <div className="boot-window"><div className="boot-heading"><span><i/> TERMINAL / BOOT</span><button onClick={finishBoot} data-cursor="hand">SKIP <b>↗</b></button></div><p className="boot-command"><span>karthikeya@dev:~$</span> init portfolio<i/></p><div className="boot-lines">{bootLines.slice(0, bootCount).map((line, index) => <p key={line} style={{ animationDelay: `${index * 15}ms` }}>&gt; {line}</p>)}</div></div>
    </div>
    </div>
  </>;
}
