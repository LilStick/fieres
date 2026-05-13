import type { CSSProperties } from "react";
import { cn } from "@/lib/utils";

/**
 * A flat, sticker-style star — five-pointed like the festival poster.
 */
export function Star({
  className,
  filled = true,
  style,
}: {
  className?: string;
  filled?: boolean;
  style?: CSSProperties;
}) {
  return (
    <svg
      viewBox="0 0 100 100"
      aria-hidden
      className={cn("inline-block", className)}
      style={style}
      fill={filled ? "currentColor" : "none"}
      stroke="currentColor"
      strokeWidth={filled ? 0 : 4}
      strokeLinejoin="round"
    >
      <path d="M50 4 L61 38 L97 38 L68 60 L79 94 L50 73 L21 94 L32 60 L3 38 L39 38 Z" />
    </svg>
  );
}
