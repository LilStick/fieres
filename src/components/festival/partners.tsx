"use client";

import { motion } from "framer-motion";
import { partners } from "@/data/festival";
import { Star } from "@/components/shared/star";

export function Partners() {
  return (
    <section className="relative overflow-hidden bg-orange py-20 text-ink noise">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-center gap-3 text-center"
        >
          <Star className="h-4 w-4" />
          <span className="text-xs font-bold uppercase tracking-[0.25em]">
            Avec le soutien de
          </span>
          <Star className="h-4 w-4" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-x-10 gap-y-6 md:gap-x-14"
        >
          {partners.map((p) => (
            <div
              key={p.name}
              className="group flex flex-col items-center gap-1 text-center"
            >
              <span className="font-display text-3xl font-black italic leading-none transition-transform group-hover:-translate-y-1 md:text-4xl">
                {p.name}
              </span>
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-ink/60">
                {p.note}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
