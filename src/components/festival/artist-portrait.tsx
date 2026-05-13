import type { Artist } from "@/data/festival";
import { Star } from "@/components/shared/star";
import { cn } from "@/lib/utils";

const accentClasses: Record<
  Artist["accent"],
  { bg: string; ink: string; stars: string }
> = {
  orange: {
    bg: "bg-orange",
    ink: "text-ink",
    stars: "text-ink/80",
  },
  bone: {
    bg: "bg-bone",
    ink: "text-ink",
    stars: "text-orange",
  },
  ink: {
    bg: "bg-ink",
    ink: "text-bone",
    stars: "text-orange",
  },
  white: {
    bg: "bg-white",
    ink: "text-ink",
    stars: "text-orange",
  },
};

/**
 * Sticker-style placeholder portrait. We can't ship the real ink illustrations
 * from the poster, so we use giant initials inside a half-tone field of stars.
 */
export function ArtistPortrait({ artist }: { artist: Artist }) {
  const classes = accentClasses[artist.accent];
  const initials = artist.name
    .split(" ")
    .map((s) => s[0])
    .join("")
    .slice(0, 3);

  return (
    <div
      className={cn(
        "relative aspect-[3/4] w-full overflow-hidden rounded-2xl",
        classes.bg
      )}
    >
      {/* Scattered stars in background */}
      {[
        { top: "8%", left: "12%", size: 22 },
        { top: "18%", right: "10%", size: 28 },
        { top: "70%", left: "8%", size: 20 },
        { top: "82%", right: "14%", size: 26 },
        { top: "44%", right: "6%", size: 16 },
        { top: "30%", left: "76%", size: 14 },
      ].map((s, i) => (
        <Star
          key={i}
          className={cn("absolute", classes.stars)}
          style={{
            top: s.top,
            left: s.left,
            right: s.right,
            width: s.size,
            height: s.size,
          }}
        />
      ))}

      {/* Big initials */}
      <span
        className={cn(
          "absolute inset-0 flex items-center justify-center font-display text-[40vw] font-black italic leading-none drop-shadow-[3px_3px_0_rgba(0,0,0,0.4)] sm:text-[18vw] lg:text-[140px]",
          classes.ink
        )}
        aria-hidden
      >
        {initials}
      </span>
    </div>
  );
}
