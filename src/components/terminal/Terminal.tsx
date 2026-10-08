export function Terminal({ command, output, compact = false }: { command: string; output?: string; compact?: boolean }) {
  return <div className={`terminal ${compact ? "terminal-compact" : ""}`} role="group" aria-label="Terminal prompt">
    <div className="terminal-bar"><span className="terminal-lights" aria-hidden="true"><i/><i/><i/></span><span>LOCAL / TERMINAL</span><span className="terminal-status"><b/> READY</span></div>
    <div className="terminal-body"><p><span className="prompt-user">karthikeya@dev</span><span className="prompt-path">:~$</span> <span>{command}</span><i className="terminal-caret" aria-hidden="true"/></p>{output && <p className="terminal-output">{output}</p>}</div>
  </div>;
}
