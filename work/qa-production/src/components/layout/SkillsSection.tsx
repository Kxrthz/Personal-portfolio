import { skillGroups } from "../../data/portfolio";

export function SkillsSection() {
  return <section id="skills" className="skills-section" aria-labelledby="skills-title" data-cinematic-section>
    <div className="skills-inner" data-cinematic-content>
      <div className="chapter-head"><p>04 / SKILLS</p><span>CAPABILITIES / INDEX</span></div>
      <div className="skills-title-row"><h2 id="skills-title">TOOLS OF<br/><em>THE TRADE.</em></h2><p>Skills and foundations<br/>built through study and projects.</p></div>
      <div className="skills-terminal">
        <div className="skills-terminal-bar"><span>karthikeya@dev:~$ ls skills/</span><span>7 DIRECTORIES</span></div>
        <div className="skill-groups">{skillGroups.map((group) => <section className="skill-group" key={group.name} data-skill-reveal>
          <h3><span>drwxr-xr-x</span> {group.name}/</h3><ul>{group.skills.map((skill) => <li key={skill}>{skill}</li>)}</ul>
        </section>)}</div>
        <p className="skills-terminal-prompt"><span>karthikeya@dev:~$</span> <i aria-hidden="true"/></p>
      </div>
    </div>
  </section>;
}
