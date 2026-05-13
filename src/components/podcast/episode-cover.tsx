import { cn } from "@/lib/utils";
import { Star } from "@/components/shared/star";

/**
 * Cover typographique pour les épisodes — placeholder en attendant les vraies miniatures.
 * TODO: parser le flux RSS Deezer/Apple Podcasts pour récupérer les vraies covers.
 */
export function EpisodeCover({
  guest,
  number,
  variant = "default",
  className,
}: {
  guest: string;
  number: number;
  variant?: "default" | "orange" | "bone";
  className?: string;
}) {
  const bg =
    variant === "orange"
      ? "bg-orange text-ink"
      : variant === "bone"
      ? "bg-bone text-ink"
      : "bg-ink text-bone";
  const accent = variant === "default" ? "text-orange" : "text-ink";
  const initials = guest
    .split(" ")
    .map((s) => s[0])
    .join("")
    .slice(0, 3)
    .toUpperCase();

  return (
    <div
      className={cn(
        "relative aspect-square w-full overflow-hidden rounded-2xl",
        bg,
        className
      )}
    >
      {/* Scattered stars background */}
      {[
        { top: "10%", left: "12%", size: 20 },
        { top: "22%", right: "10%", size: 16 },
        { top: "72%", left: "10%", size: 18 },
        { top: "82%", right: "16%", size: 22 },
        { top: "46%", right: "8%", size: 12 },
      ].map((s, i) => (
        <Star
          key={i}
          className={cn("absolute opacity-60", accent)}
          style={{
            top: s.top,
            left: s.left,
            right: s.right,
            width: s.size,
            height: s.size,
          }}
        />
      ))}

      <span
        className={cn(
          "absolute inset-0 flex items-center justify-center font-display text-[26vw] font-black italic leading-none sm:text-[14vw] lg:text-[110px]"
        )}
        aria-hidden
      >
        {initials}
      </span>

      <span
        className={cn(
          "absolute bottom-3 left-3 text-[10px] font-bold uppercase tracking-[0.18em] opacity-80"
        )}
      >
        #{String(number).padStart(2, "0")}
      </span>
      <span
        className={cn(
          "absolute bottom-3 right-3 text-[10px] font-bold uppercase tracking-[0.18em] opacity-80"
        )}
      >
        Fier.e.s
      </span>
    </div>
  );
}
