"use client";
import { useState } from "react";
import { navigation } from "../../data/portfolio";
export type Destination = "home" | "about" | "skills" | "projects" | "experience" | "education" | "certifications" | "achievements" | "contact";
export function Navigation({ onNavigate }: { onNavigate?: (section: Destination) => void }) {
  const [open, setOpen] = useState(false);
  return <header className="site-header"><a className="wordmark" href="#home" aria-label="Karthikeya home">KARTHIKEYA<span>.DEV</span></a>
    <button className="menu-toggle" aria-expanded={open} aria-controls="primary-nav" onClick={() => setOpen(!open)}><span/>{open ? "CLOSE" : "MENU"}</button>
    <nav id="primary-nav" className={open ? "nav-links is-open" : "nav-links"} aria-label="Primary navigation">{navigation.map((item) => { const destination = item.toLowerCase().replace(/^\d+_/, "") as Destination; return <a key={item} href={`#${destination}`} onClick={(event) => { setOpen(false); if (onNavigate) { event.preventDefault(); onNavigate(destination); } }}>{item}</a>; })}<a className="nav-resume" href="/resume.pdf" data-cursor="hand">RESUME <span aria-hidden="true">↗</span></a></nav>
  </header>;
}
