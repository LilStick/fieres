"use client";

import { useEffect, useRef, useState } from "react";
import { Star } from "./star";

/**
 * Replaces the system cursor with a small orange star on fine-pointer devices.
 * Hidden on touch screens. Falls back to native cursor if reduced-motion is on.
 */
export function CustomCursor() {
  const ref = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);
  const [hover, setHover] = useState(false);

  useEffect(() => {
    const isFinePointer = window.matchMedia("(pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)")
      .matches;
    if (!isFinePointer || reduced) return;

    setEnabled(true);
    document.body.classList.add("has-custom-cursor");

    const move = (e: MouseEvent) => {
      if (!ref.current) return;
      ref.current.style.transform = `translate3d(${e.clientX - 14}px, ${
        e.clientY - 14
      }px, 0)`;
    };
    const over = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      const interactive = target.closest("a, button, [role='button']");
      setHover(Boolean(interactive));
    };

    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", over);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", over);
      document.body.classList.remove("has-custom-cursor");
    };
  }, []);

  if (!enabled) return null;

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[100] h-7 w-7 mix-blend-difference will-change-transform"
      style={{ transition: "width 0.2s, height 0.2s" }}
    >
      <Star
        className={`h-full w-full text-white transition-transform duration-200 ${
          hover ? "scale-150 rotate-12" : "scale-100"
        }`}
      />
    </div>
  );
}
