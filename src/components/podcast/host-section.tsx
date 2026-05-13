"use client";

import { motion } from "framer-motion";
import { host } from "@/data/podcast";
import { Star } from "@/components/shared/star";

export function HostSection() {
  return (
    <section className="relative overflow-hidden bg-bone py-24 text-ink md:py-32">
      <Star
        aria-hidden
        className="absolute -left-12 top-12 h-44 w-44 text-orange/40"
      />
      <Star
        aria-hidden
        className="absolute -right-16 bottom-12 h-56 w-56 text-orange/30"
      />

      <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-5 sm:px-8 md:grid-cols-[1fr_1.3fr]">
        {/* Portrait placeholder */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
          className="relative aspect-[4/5] w-full overflow-hidden rounded-3xl border-2 border-ink bg-orange shadow-[10px_10px_0_0_rgba(0,0,0,1)]"
        >
          {[
            { top: "8%", left: "10%", size: 28 },
            { top: "18%", right: "12%", size: 22 },
            { top: "70%", left: "10%", size: 20 },
            { top: "82%", right: "16%", size: 30 },
          ].map((s, i) => (
            <Star
              key={i}
              className="absolute text-ink/80"
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
            className="absolute inset-0 flex items-center justify-center font-display text-[36vw] font-black italic leading-none text-ink drop-shadow-[3px_3px_0_rgba(0,0,0,0.2)] sm:text-[20vw] md:text-[12vw]"
            aria-hidden
          >
            TC
          </span>
          <span className="absolute bottom-4 left-4 text-[10px] font-bold uppercase tracking-[0.2em] text-ink">
            TODO: photo HD
          </span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, delay: 0.15 }}
        >
          <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-orange">
            <Star className="h-3 w-3" /> Aux manettes
          </span>
          <h2 className="mt-3 font-display text-5xl font-black italic leading-[0.95] md:text-6xl">
            {host.name}
          </h2>
          <p className="mt-1 text-sm font-bold uppercase tracking-[0.18em] text-ink/60">
            {host.pronouns} — {host.role}
          </p>
          <p className="mt-6 text-lg leading-relaxed text-ink/85">
            {host.bio}
          </p>
          <blockquote className="mt-8 border-l-4 border-orange pl-5 font-display text-2xl font-black italic leading-tight text-ink/90 md:text-3xl">
            « On peut pas tout dire, mais on essaie quand même. »
          </blockquote>
        </motion.div>
      </div>
    </section>
  );
}
