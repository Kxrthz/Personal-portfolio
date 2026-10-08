"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { CursorIcon } from "./CursorIcon";

type CursorKind = "default" | "click" | "hand" | "hand-click" | "zoom-in" | "zoom-out" | "wait" | "resize-y" | "resize-x" | "resize-diagonal" | "text" | "loading" | "disabled" | "help";
type CursorContextValue = { setCursor: (kind: CursorKind) => void };
const CursorContext = createContext<CursorContextValue>({ setCursor: () => undefined });
export const useCustomCursor = () => useContext(CursorContext);

const getKind = (target: EventTarget | null): CursorKind => {
  if (!(target instanceof Element)) return "default";
  const tagged = target.closest<HTMLElement>("[data-cursor]")?.dataset.cursor as CursorKind | undefined;
  if (tagged) return tagged;
  if (target.closest("[aria-busy=true]")) return "loading";
  if (target.closest("input, textarea, [contenteditable=true]")) return "text";
  if (target.closest("button:disabled, [aria-disabled=true], :disabled")) return "disabled";
  if (target.closest("a, button, [role=button]")) return "hand";
  if (target.closest("p, h1, h2, h3, h4, li, label, blockquote, code")) return "text";
  return "default";
};

export function CursorProvider({ children }: { children: ReactNode }) {
  const [kind, setKind] = useState<CursorKind>("default");
  const [enabled, setEnabled] = useState(false);
  const setCursor = useCallback((next: CursorKind) => setKind((current) => current === next ? current : next), []);
  const contextValue = useMemo(() => ({ setCursor }), [setCursor]);

  useEffect(() => {
    const media = window.matchMedia("(pointer: fine) and (hover: hover)");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let x = -100, y = -100, targetX = x, targetY = y, frame = 0;
    const move = (event: PointerEvent) => {
      if (!media.matches || event.pointerType === "touch") return;
      targetX = event.clientX; targetY = event.clientY;
      if (reducedMotion.matches) {
        x = targetX; y = targetY;
        document.documentElement.style.setProperty("--cursor-x", `${targetX}px`);
        document.documentElement.style.setProperty("--cursor-y", `${targetY}px`);
      } else if (frame === 0) frame = requestAnimationFrame(animate);
    };
    const over = (event: PointerEvent) => { if (media.matches && event.pointerType !== "touch") setCursor(getKind(event.target)); };
    const down = (event: PointerEvent) => { if (media.matches && event.pointerType !== "touch") setKind((current) => current === "hand" ? "hand-click" : current === "default" ? "click" : current); };
    const up = (event: PointerEvent) => { if (media.matches && event.pointerType !== "touch") setCursor(getKind(event.target)); };
    const animate = () => {
      if (!media.matches || reducedMotion.matches) { frame = 0; return; }
      x += (targetX - x) * 0.32; y += (targetY - y) * 0.32;
      if (Math.abs(targetX - x) < 0.2 && Math.abs(targetY - y) < 0.2) {
        x = targetX; y = targetY; frame = 0;
        document.documentElement.style.setProperty("--cursor-x", `${x}px`);
        document.documentElement.style.setProperty("--cursor-y", `${y}px`);
        return;
      }
      document.documentElement.style.setProperty("--cursor-x", `${x}px`);
      document.documentElement.style.setProperty("--cursor-y", `${y}px`);
      frame = requestAnimationFrame(animate);
    };
    const update = () => {
      setEnabled(media.matches);
      document.documentElement.toggleAttribute("data-custom-cursor", media.matches);
      if (!media.matches) setCursor("default");
      if (media.matches && !reducedMotion.matches && frame === 0) frame = requestAnimationFrame(animate);
      if ((!media.matches || reducedMotion.matches) && frame !== 0) { cancelAnimationFrame(frame); frame = 0; }
    };
    update();
    media.addEventListener("change", update);
    reducedMotion.addEventListener("change", update);
    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("pointerover", over);
    window.addEventListener("pointerdown", down);
    window.addEventListener("pointerup", up);
    window.addEventListener("pointercancel", up);
    return () => {
      media.removeEventListener("change", update);
      reducedMotion.removeEventListener("change", update);
      document.documentElement.removeAttribute("data-custom-cursor");
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerover", over);
      window.removeEventListener("pointerdown", down);
      window.removeEventListener("pointerup", up);
      window.removeEventListener("pointercancel", up);
    };
  }, [setCursor]);

  return <CursorContext.Provider value={contextValue}>{children}<div className="custom-cursor" data-visible={enabled} aria-hidden="true"><CursorIcon kind={kind}/></div></CursorContext.Provider>;
}
