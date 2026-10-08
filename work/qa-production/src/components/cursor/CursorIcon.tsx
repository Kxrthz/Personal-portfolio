type Kind = "default" | "click" | "hand" | "hand-click" | "zoom-in" | "zoom-out" | "wait" | "resize-y" | "resize-x" | "resize-diagonal" | "text" | "loading" | "disabled" | "help";
export function CursorIcon({ kind }: { kind: Kind }) {
  const stroke = "#171512";
  const common = { fill: "none", stroke, strokeWidth: 1.45, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  return <svg className={`cursor-icon cursor-${kind}`} width="24" height="28" viewBox="0 0 24 28" {...common}>
    {kind === "default" || kind === "click" ? <><path d="M4 2.5v18l4.7-4.3 3.4 7 3.2-1.6-3.4-6.7 6.8-.4L4 2.5Z" fill="#e9e4da"/><path d="m15 5 2 2M19 2l.5 2.8" stroke="#c68a32"/></> : null}
    {kind === "hand" || kind === "hand-click" ? <><path d="M8.5 13V5.5a1.6 1.6 0 0 1 3.2 0v5.1-2a1.6 1.6 0 0 1 3.2 0v2-1a1.6 1.6 0 0 1 3.2 0v2.2a1.6 1.6 0 0 1 3.1.5v4.4c0 4.5-2.6 7.1-7.2 7.1h-.7c-2.6 0-4.1-1-5.8-3.1l-3.1-3.9a1.7 1.7 0 0 1 2.5-2.2l1.6 1.4"/><path d="M5 7 3.4 5.4m10.2-2.6.2-2M2 12H.5" stroke="#c68a32"/></> : null}
    {kind === "zoom-in" || kind === "zoom-out" ? <><circle cx="10" cy="10" r="6.5"/><path d="m15 15 6 6"/><path d={kind === "zoom-in" ? "M10 7v6m-3-3h6" : "M7 10h6"}/></> : null}
    {kind === "wait" ? <><path d="M5 3h14M5 25h14M7 4c0 5 2 7 5 10-3 3-5 5-5 10m10-20c0 5-2 7-5 10 3 3 5 5 5 10"/><path d="M9 7h6M9 21h6" stroke="#c68a32"/></> : null}
    {kind === "resize-y" ? <><path d="m12 3-4 4m4-4 4 4m-4-4v22m0 0-4-4m4 4 4-4"/></> : null}
    {kind === "resize-x" ? <><path d="m3 12 4-4m-4 4 4 4m-4-4h18m0 0-4-4m4 4-4 4"/></> : null}
    {kind === "resize-diagonal" ? <><path d="M4 20 20 4m-8 0h8v8M4 12v8h8"/></> : null}
    {kind === "text" ? <><path d="M7 5h10M12 5v18M7 23h10"/></> : null}
    {kind === "loading" ? <><circle cx="12" cy="12" r="8" stroke="#c68a32" strokeDasharray="29 22"/></> : null}
    {kind === "disabled" ? <><circle cx="12" cy="12" r="8"/><path d="m6 18 12-12" stroke="#c68a32"/></> : null}
    {kind === "help" ? <><circle cx="12" cy="12" r="9"/><path d="M9.5 9a2.6 2.6 0 1 1 4.5 1.8c-1.2 1.2-2 1.5-2 3.2m0 3v.1" stroke="#c68a32"/></> : null}
    {kind === "click" || kind === "hand-click" ? <circle className="cursor-click-mark" cx="20" cy="4" r="2.2" fill="#c68a32" stroke="#c68a32"/> : null}
  </svg>;
}
