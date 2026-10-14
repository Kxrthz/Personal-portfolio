"use client";

import { useState, type FormEvent } from "react";
import type { Destination } from "../layout/Navigation";
import { PirateEasterEgg } from "./PirateEasterEgg";

type Entry = { command: string; output?: string };
const commands = ["help", "about", "projects", "skills", "experience", "education", "certifications", "achievements", "contact", "coffee", "sudo hire-karthikeya", "clear"];

export function InteractiveTerminal({ onNavigate, ending = false }: { onNavigate: (section: Destination) => void; ending?: boolean }) {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<Entry[]>([]);
  const [showPirate, setShowPirate] = useState(false);

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const command = input.trim().toLowerCase();
    if (!command) return;
    setInput("");

    if (command === "clear") {
      setHistory([]);
      setShowPirate(false);
      return;
    }
    if (command === "luffy" && ending) {
      setShowPirate(true);
      setHistory((items) => [...items, { command, output: "> A little pirate dropped by. Type 'clear' to send him off." }]);
      return;
    }
    if (command === "coffee") {
      setHistory((items) => [...items, { command, output: "> brewing...\n> developer mode: ON" }]);
      return;
    }
    if (command === "sudo hire-karthikeya") {
      setHistory((items) => [...items, { command, output: "> Permission granted.\n> Let’s build something." }]);
      return;
    }
    if (!commands.includes(command)) {
      setHistory((items) => [...items, { command, output: "> command not found. Type 'help' to see available commands." }]);
      return;
    }
    if (["about", "skills", "projects", "experience", "education", "certifications", "achievements", "contact"].includes(command)) {
      setHistory((items) => [...items, { command, output: `> navigating to /${command}...` }]);
      onNavigate(command as Destination);
      return;
    }
    if (command === "help") {
      setHistory((items) => [...items, { command, output: `> available: ${commands.join("  ")}` }]);
      return;
    }
    setHistory((items) => [...items, { command, output: `> /${command} is queued for a later portfolio section.` }]);
  }

  if (ending) return <div className="ending-terminal" aria-label="Final interactive terminal">
    <p><span>karthikeya@portfolio:~$</span> echo "Thanks for visiting."</p>
    <p className="ending-thanks">Thanks for visiting.</p>
    {history.map((entry, index) => <div className="command-entry ending-command-entry" key={`${entry.command}-${index}`}><p><span className="prompt-user">{ending ? "karthikeya@portfolio" : "karthikeya@dev"}</span><span className="prompt-path">:~$</span> {entry.command}</p>{entry.output && <p className="terminal-output">{entry.output}</p>}</div>)}
    <form className="ending-prompt" onSubmit={submit}><label className="sr-only" htmlFor="ending-terminal-command">Terminal command</label><span>karthikeya@portfolio:~$</span><input id="ending-terminal-command" value={input} onChange={(event) => setInput(event.target.value)} autoComplete="off" spellCheck={false} placeholder="_" aria-label="Final terminal command"/><button type="submit" data-cursor="hand" aria-label="Run terminal command">↵</button></form>
    {showPirate && <PirateEasterEgg />}
  </div>;

  return <div className="terminal interactive-terminal" aria-label="Interactive developer terminal">
    <div className="terminal-bar"><span className="terminal-lights" aria-hidden="true"><i/><i/><i/></span><span>LOCAL / TERMINAL</span><span className="terminal-status"><b/> READY</span></div>
    <div className="interactive-terminal-body" aria-live="polite">
      {!history.length && <p className="terminal-hint">Type <kbd>help</kbd> to inspect available commands.</p>}
      {history.map((entry, index) => <div className="command-entry" key={`${entry.command}-${index}`}><p><span className="prompt-user">karthikeya@dev</span><span className="prompt-path">:~$</span> {entry.command}</p>{entry.output && <p className="terminal-output">{entry.output}</p>}</div>)}
      <form className="terminal-form" onSubmit={submit}><label className="sr-only" htmlFor="terminal-command">Terminal command</label><span><span className="prompt-user">karthikeya@dev</span><span className="prompt-path">:~$</span></span><input id="terminal-command" value={input} onChange={(event) => setInput(event.target.value)} autoComplete="off" spellCheck={false} aria-label="Enter a terminal command"/><button type="submit" aria-label="Run command" data-cursor="hand">↵</button></form>
    </div>
  </div>;
}
