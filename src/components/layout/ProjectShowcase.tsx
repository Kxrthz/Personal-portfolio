import type { PortfolioProject } from "../../data/portfolio";
import Image from "next/image";

export function ProjectShowcase({ project }: { project: PortfolioProject }) {
  return <article id={project.id} className="project-chapter" aria-labelledby={`${project.id}-title`} data-project-chapter data-cinematic-section>
    <div className="project-stage">
      <div className="project-chapter-head"><span>{project.number} / 03</span><span>SELECTED WORK</span></div>
      <div className="project-main" data-cinematic-content>
        <div className="project-copy">
          <p className="project-number">{project.number}<span> — CHAPTER</span></p>
          <h3 id={`${project.id}-title`}>{project.title}</h3>
          <p className="project-description">{project.description}</p>
          <ul className="project-highlights">{project.highlights.map((highlight) => <li key={highlight}>{highlight}</li>)}</ul>
          <div className="project-tags" aria-label="Technologies">{project.technologies.map((technology) => <span key={technology}>{technology}</span>)}</div>
          <div className="project-links"><a className="button button-primary" href={project.liveUrl} target="_blank" rel="noopener noreferrer" data-cursor="hand">LIVE DEMO <span aria-hidden="true">↗</span></a><a className="button button-quiet" href={project.sourceUrl} target="_blank" rel="noopener noreferrer" data-cursor="hand">SOURCE CODE <span aria-hidden="true">↗</span></a></div>
        </div>
        <div className="project-visual" data-project-visual data-cursor="zoom-in" role="img" aria-label={`${project.title} project screenshot`}>
          <div className="visual-frame"><Image className="project-screenshot" src={`/projects/${project.id}.png`} alt="" fill sizes="(max-width: 720px) 100vw, 48vw"/><span className="visual-corner visual-corner-tl"/><span className="visual-corner visual-corner-tr"/><span className="visual-corner visual-corner-bl"/><span className="visual-corner visual-corner-br"/><span className="visual-index">PROJECT VISUAL / {project.number}</span><span className="visual-caption">{project.id.toUpperCase()} <i>·</i> LIVE PROJECT</span></div>
        </div>
      </div>
    </div>
  </article>;
}
