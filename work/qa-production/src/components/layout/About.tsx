"use client";

import { InteractiveTerminal } from "../terminal/InteractiveTerminal";
import type { Destination } from "./Navigation";

export function About({ onNavigate }: { onNavigate: (section: Destination) => void }) {
  return <section id="about" className="about-section" aria-labelledby="about-title">
    <div className="about-content">
      <p className="about-eyebrow"><span>02 / ABOUT</span><span>BACKGROUND / 01</span></p>
      <div className="about-copy-grid"><div><p className="about-overline">PROFILE / 01</p><h2 id="about-title">WHO IS<br/><em>KARTHIKEYA?</em></h2></div><div className="about-details"><p className="about-summary">I’m a BCA student at KL University (CGPA 8.44/10), focused on full-stack development. I’m especially interested in backend engineering, software architecture, and AI/ML fundamentals.</p><div className="about-facts"><div><span>EDUCATION</span><b>BCA · KL UNIVERSITY</b></div><div><span>CURRENT CGPA</span><b>8.44 / 10</b></div><div><span>GRADUATION</span><b>EXPECTED · 2027</b></div></div></div></div>
      <div className="about-terminal-wrap"><p className="about-overline">SHELL / INTERACTIVE</p><InteractiveTerminal onNavigate={onNavigate}/></div>
    </div>
  </section>;
}
