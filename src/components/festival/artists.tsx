"use client";

import { motion } from "framer-motion";
import { artists } from "@/data/festival";
import { ArtistPortrait } from "./artist-portrait";
import { Star } from "@/components/shared/star";

export function Artists() {
  return (
    <section
      id="artistes"
      className="relative overflow-hidden bg-ink py-24 md:py-32"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
          className="mb-12 md:mb-16"
        >
          <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-orange">
            <Star className="h-3 w-3" /> Sur scène
          </span>
          <h2 className="mt-3 max-w-3xl font-display text-5xl font-black italic leading-[0.95] text-bone md:text-7xl">
            Les artistes
            <span className="text-orange"> .</span>
          </h2>
          <p className="mt-4 max-w-2xl text-base text-bone/70 md:text-lg">
            Une plateau drag, un showcase live et trois voix qui prennent le
            mic. Roulement de tambour, projecteurs, on commence.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {artists.map((artist, i) => (
            <motion.article
              key={artist.name}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: 0.6,
                delay: i * 0.08,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="group flex flex-col gap-4"
            >
              <div className="relative transition-transform duration-500 group-hover:-translate-y-2 group-hover:rotate-[-1.5deg]">
                <ArtistPortrait artist={artist} />
                <div className="absolute inset-0 rounded-2xl ring-0 ring-orange transition-all duration-300 group-hover:ring-4 group-hover:ring-offset-2 group-hover:ring-offset-ink" />
              </div>
              <div>
                <h3 className="font-display text-3xl font-black italic leading-tight text-bone transition-colors group-hover:text-orange">
                  {artist.name}
                </h3>
                <p className="mt-1 text-xs font-bold uppercase tracking-[0.18em] text-bone/60">
                  {artist.role}
                </p>
                <p className="mt-3 text-sm text-bone/70">{artist.bio}</p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
