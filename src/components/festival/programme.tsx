"use client";

import { motion } from "framer-motion";
import { Mic, Music, ShoppingBag, Sparkles } from "lucide-react";
import { programme, type ProgramSlot } from "@/data/festival";
import { Star } from "@/components/shared/star";

const iconMap = {
  "shopping-bag": ShoppingBag,
  mic: Mic,
  sparkles: Sparkles,
  music: Music,
};

function ProgramCard({ slot, index }: { slot: ProgramSlot; index: number }) {
  const Icon = iconMap[slot.icon];
  return (
    <motion.article
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{
        duration: 0.7,
        delay: index * 0.1,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="group relative flex flex-col gap-4 rounded-3xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-sm transition-colors hover:border-orange/60 hover:bg-orange/[0.06] md:p-7"
    >
      <div className="flex items-center justify-between">
        <span className="font-display text-5xl font-black italic leading-none text-orange md:text-6xl">
          {slot.time}
        </span>
        <div className="flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-ink text-orange transition-colors group-hover:bg-orange group-hover:text-ink">
          <Icon className="h-5 w-5" />
        </div>
      </div>
      <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-bone/60">
        <span>{slot.tag}</span>
        {slot.endTime && <span aria-hidden>· jusqu'à {slot.endTime}</span>}
      </div>
      <h3 className="font-display text-2xl font-black italic leading-tight text-bone md:text-3xl">
        {slot.title}
      </h3>
      <p className="text-sm leading-relaxed text-bone/75 md:text-base">
        {slot.description}
      </p>
    </motion.article>
  );
}

export function Programme() {
  return (
    <section
      id="programme"
      className="relative overflow-hidden bg-ink py-24 md:py-32"
    >
      {/* Decorative marquee */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 select-none overflow-hidden border-y border-white/10 bg-orange py-3 text-ink"
      >
        <div className="flex w-max animate-marquee gap-10 whitespace-nowrap font-display text-2xl font-black italic">
          {Array.from({ length: 8 }).map((_, i) => (
            <span key={i} className="inline-flex items-center gap-6">
              Programme
              <Star className="h-6 w-6" />
              13 juin
              <Star className="h-6 w-6" />
              Césure
              <Star className="h-6 w-6" />
            </span>
          ))}
        </div>
      </div>

      <div className="mx-auto mt-20 max-w-7xl px-5 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
          className="mb-12 flex flex-col gap-4 md:mb-16 md:flex-row md:items-end md:justify-between"
        >
          <div>
            <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-orange">
              <Star className="h-3 w-3" /> Le programme
            </span>
            <h2 className="mt-3 max-w-2xl font-display text-5xl font-black italic leading-[0.95] text-bone md:text-7xl">
              Huit heures, quatre rendez&#8209;vous.
            </h2>
          </div>
          <p className="max-w-md text-base text-bone/70">
            Un fil rouge du marché au showcase. Chaque créneau peut se vivre
            seul ou enchaîné — le ticket donne accès à toute la journée.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-6 lg:grid-cols-4">
          {programme.map((slot, i) => (
            <ProgramCard key={slot.title} slot={slot} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
