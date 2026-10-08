type Kind = "default" | "click" | "hand" | "hand-click" | "zoom-in" | "zoom-out" | "wait" | "resize-y" | "resize-x" | "resize-diagonal" | "text" | "loading" | "disabled" | "help";

const outline = {
  fill: "none",
  stroke: "#eeeae1",
  strokeWidth: 1.45,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export function CursorIcon({ kind }: { kind: Kind }) {
  return (
    <svg className={`cursor-icon cursor-${kind}`} width="24" height="28" viewBox="0 0 24 28" {...outline}>
      {kind === "default" || kind === "click" ? <>
        {kind === "click" ? <g className="cursor-click-mark" stroke="#c68a32" strokeWidth="1.35">
          <circle cx="7" cy="7" r="6.2"/><circle cx="7" cy="7" r="3.7"/><circle cx="7" cy="7" r="1.2" fill="#c68a32"/>
        </g> : null}
        <path d="M3.5 2.5v18.2l4.6-4.5 3.1 7 3.1-1.4-3.1-7 6.5-.2L3.5 2.5Z" fill="#f3f0e9" stroke="#171512" strokeWidth="1.45"/>
      </> : null}
      {kind === "hand" || kind === "hand-click" ? <>
        {kind === "hand-click" ? <g className="cursor-click-mark" stroke="#c68a32" strokeWidth="1.35">
          <circle cx="7" cy="7" r="6.2"/><circle cx="7" cy="7" r="3.7"/><circle cx="7" cy="7" r="1.2" fill="#c68a32"/>
        </g> : null}
        <path d="M8.2 13.2V5.1a1.65 1.65 0 0 1 3.3 0v5.4-2.2a1.65 1.65 0 0 1 3.3 0v2-1.2a1.65 1.65 0 0 1 3.3 0v2a1.65 1.65 0 0 1 3.3.3v4.1c0 4.3-2.8 7-7.1 7h-.8c-2.6 0-4.4-1.2-5.9-3.1l-3-3.7a1.8 1.8 0 0 1 2.7-2.3l1.8 1.7"/>
      </> : null}
      {kind === "zoom-in" || kind === "zoom-out" ? <>
        <circle cx="9.3" cy="9.3" r="6.1"/><path d="m13.8 13.8 7.1 7.1"/>
        <path d={kind === "zoom-in" ? "M9.3 6.5v5.6m-2.8-2.8h5.6" : "M6.5 9.3h5.6"} stroke="#c68a32" strokeWidth="1.8"/>
      </> : null}
      {kind === "wait" ? <>
        <path d="M4 3h16M4 25h16M6 4c0 4.7 2.2 7.2 6 10-3.8 2.8-6 5.3-6 10m12-20c0 4.7-2.2 7.2-6 10 3.8 2.8 6 5.3 6 10"/>
        <path d="M8 5h8l-3.1 4.4L12 11l-.9-1.6L8 5Zm0 18h8l-3.1-4.4L12 17l-.9 1.6L8 23Z" fill="#e6a23b" stroke="#c68a32" strokeWidth=".85"/>
      </> : null}
      {kind === "resize-y" ? <path d="m12 2.7-3.2 3.5M12 2.7l3.2 3.5M12 2.7v22.6m0 0-3.2-3.5m3.2 3.5 3.2-3.5"/> : null}
      {kind === "resize-x" ? <path d="m2.5 12 3.5-3.2M2.5 12 6 15.2M2.5 12h19m0 0L18 8.8m3.5 3.2L18 15.2"/> : null}
      {kind === "resize-diagonal" ? <path d="M4 20 20 4m-6.2 0H20v6.2M10.2 20H4v-6.2"/> : null}
      {kind === "text" ? <path d="M6 4.5h12M12 4.5v19M6 23.5h12"/> : null}
      {kind === "loading" ? <g stroke="#e6a23b" strokeWidth="1.7">
        <path d="M12 2.2v3.1M12 22.7v3.1M2.2 12h3.1m13.4 0h3.1M5.1 5.1l2.2 2.2m9.4 9.4 2.2 2.2m0-13.8-2.2 2.2m-9.4 9.4-2.2 2.2"/>
      </g> : null}
      {kind === "disabled" ? <><circle cx="12" cy="14" r="9"/><path d="m5.6 7.6 12.8 12.8" stroke="#c68a32"/></> : null}
      {kind === "help" ? <path d="M8.2 9a3.9 3.9 0 1 1 6.7 2.7c-1.4 1.4-2.9 2.1-2.9 4.1m0 3.2v.2"/> : null}
    </svg>
  );
}
