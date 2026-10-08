import type { Destination } from "./Navigation";
import { InteractiveTerminal } from "../terminal/InteractiveTerminal";

const experience = [
  {
    year: "2025", title: "Machine Learning Intern", company: "LearnFlu", dates: "JUNE 2025 — OCTOBER 2025",
    details: ["Developed classification and regression models in Python on structured datasets.", "Preprocessed datasets with 1000+ records: missing values, outliers, and feature scaling.", "Evaluated accuracy, precision, and recall to refine model parameters."],
  },
  {
    year: "2026", title: "Web Development Intern", company: "Thiranex", dates: "JULY 2026 — AUGUST 2026",
    details: ["Built and optimized 5+ responsive interfaces with HTML5, CSS3, and JavaScript (ES6+).", "Tested across browsers and adjusted layouts for mobile and desktop.", "Collaborated with the frontend team using Git and GitHub workflows."],
  },
  {
    year: "2027", title: "Bachelor of Computer Applications", company: "KL University", dates: "EXPECTED GRADUATION · 2027",
    details: ["Current CGPA: 8.44 / 10.0", "Vaddeswaram, Andhra Pradesh"],
  },
];

const coursework = ["Object-Oriented Programming", "Data Structures & Algorithms", "Database Management Systems", "Software Engineering", "Web Technologies", "Artificial Intelligence Fundamentals"];
const certifications = [
  { title: "Microsoft Certified: Azure AI Fundamentals", organization: "Microsoft", date: "JUNE 2026", featured: true },
  { title: "Artificial Intelligence Certification", organization: "LearnFlu · AICTE Approved", date: "2025", featured: false },
  { title: "AI Agent Builder Masterclass", organization: "GSDC", date: "", featured: false },
];

export function Part4Sections({ onNavigate }: { onNavigate: (section: Destination) => void }) {
  return <>
    <section id="experience" className="experience-section" aria-labelledby="experience-title" data-cinematic-section>
      <div className="part4-inner" data-cinematic-content>
        <div className="chapter-head"><p>05 / EXPERIENCE</p><span>WORK + EDUCATION / 03</span></div>
        <h2 id="experience-title" className="part4-heading">LEARNED BY<br/><em>BUILDING.</em></h2>
        <div className="experience-timeline">
          <span className="timeline-rail" aria-hidden="true"><i data-timeline-line/></span>
          {experience.map((item) => <article className="timeline-item" key={item.year} data-timeline-item>
            <div className="timeline-year"><span className="timeline-dot" aria-hidden="true"/>{item.year}</div>
            <div className="timeline-card" data-chapter-reveal>
              <p className="timeline-dates">{item.dates}</p><h3>{item.title}</h3><p className="timeline-company">{item.company}</p>
              <ul>{item.details.map((detail) => <li key={detail}>{detail}</li>)}</ul>
            </div>
          </article>)}
        </div>
      </div>
    </section>

    <section id="education" className="education-section" aria-labelledby="education-title" data-cinematic-section>
      <div className="part4-inner education-layout" data-cinematic-content>
        <div><div className="chapter-head"><p>06 / EDUCATION</p><span>ACADEMIC RECORD / 01</span></div><p className="education-overline">BACHELOR OF</p><h2 id="education-title">BCA</h2><p className="education-university">KL UNIVERSITY</p><p className="education-location">VADDESWARAM, ANDHRA PRADESH</p></div>
        <div className="education-result" data-chapter-reveal><span>CGPA</span><strong>8.44 <i>/ 10.0</i></strong><p>EXPECTED GRADUATION · 2027</p></div>
        <div className="coursework-panel" data-chapter-reveal><div className="skills-terminal-bar"><span>karthikeya@dev:~$ cat coursework.txt</span><span>6 ENTRIES</span></div><ul>{coursework.map((course) => <li key={course}>{course}</li>)}</ul></div>
      </div>
    </section>

    <section id="certifications" className="certifications-section" aria-labelledby="certifications-title" data-cinematic-section>
      <div className="part4-inner" data-cinematic-content>
        <div className="chapter-head"><p>07 / CERTIFICATIONS</p><span>CONTINUOUS LEARNING</span></div>
        <h2 id="certifications-title" className="part4-heading">CREDENTIALS<br/><em>& STUDY.</em></h2>
        <div className="certification-list">{certifications.map((cert, index) => <article key={cert.title} className={cert.featured ? "certification-item is-featured" : "certification-item"} data-chapter-reveal>
          <span className="certification-index">0{index + 1}</span><div><p>{cert.organization}</p><h3>{cert.title}</h3></div><span className="certification-date">{cert.date}</span>
        </article>)}</div>
      </div>
    </section>

    <section id="achievements" className="achievements-section" aria-labelledby="achievements-title" data-cinematic-section>
      <div className="part4-inner" data-cinematic-content>
        <div className="chapter-head"><p>08 / ACHIEVEMENTS</p><span>PARTICIPATION + TRAINING</span></div>
        <h2 id="achievements-title" className="part4-heading">MILESTONES<br/><em>ALONG THE WAY.</em></h2>
        <div className="achievement-list">
          <article data-chapter-reveal><span>2025</span><div><h3>Code4Change</h3><p>48-hour National Level Hackathon</p></div></article>
          <article data-chapter-reveal><span>2026</span><div><h3>IndiaSkills</h3><p>Registered competitor</p></div></article>
          <article data-chapter-reveal><span>TRAINING</span><div><h3>Public Speaking &amp; Presentation</h3><p>5-day intensive training</p></div></article>
        </div>
        <div className="personal-details"><div><span>SOFT SKILLS</span><p>Problem Solving · Analytical Thinking · Team Collaboration · Technical Communication · Public Speaking · Presentation Skills · Adaptability · Time Management</p></div><div><span>LANGUAGES</span><p>English — Fluent <i>·</i> Telugu — Native</p></div></div>
      </div>
    </section>

    <section id="contact" className="contact-section" aria-labelledby="contact-title" data-cinematic-section>
      <div className="part4-inner" data-cinematic-content>
        <div className="chapter-head"><p>09 / CONTACT</p><span>OPEN TO BUILDING</span></div>
        <div className="contact-layout"><div><p className="education-overline">HAVE A PROJECT IN MIND?</p><h2 id="contact-title">LET’S BUILD<br/><em>SOMETHING.</em></h2><p className="contact-location">VIJAYAWADA, ANDHRA PRADESH, INDIA</p></div>
          <div className="contact-links"><a className="button button-primary" href="mailto:karthikeyakoduru56@gmail.com" data-cursor="hand">EMAIL <span aria-hidden="true">↗</span></a><a className="button button-quiet" href="https://linkedin.com/in/k-karthikeya-073221335" target="_blank" rel="noopener noreferrer" data-cursor="hand">LINKEDIN <span aria-hidden="true">↗</span></a><a className="button button-quiet" href="https://github.com/Kxrthz" target="_blank" rel="noopener noreferrer" data-cursor="hand">GITHUB <span aria-hidden="true">↗</span></a><a className="contact-email" href="mailto:karthikeyakoduru56@gmail.com">karthikeyakoduru56@gmail.com</a></div>
        </div>
      </div>
    </section>

    <section id="ending" className="ending-section" aria-label="Terminal ending" data-cinematic-section>
      <div className="ending-content" data-cinematic-content><div data-chapter-reveal><InteractiveTerminal onNavigate={onNavigate} ending/></div>
      <p className="ending-footer">KODURU KARTHIKEYA <span>·</span> PORTFOLIO / 2026—27</p></div>
    </section>
  </>;
}

