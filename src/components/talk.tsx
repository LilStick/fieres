"use client";

import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import { speakers } from "@/data/festival";
import { Star } from "./star";

export function Talk() {
  return (
    <section
      id="talk"
      className="relative overflow-hidden bg-orange py-24 text-ink md:py-32 noise"
    >
      {/* Decorative big stars */}
      <Star
        className="absolute -left-10 top-20 hidden h-44 w-44 text-ink/15 md:block"
        aria-hidden
      />
      <Star
        className="absolute -right-12 bottom-12 hidden h-52 w-52 text-ink/15 md:block"
        aria-hidden
      />

      <div className="mx-auto max-w-5xl px-5 text-center sm:px-8">
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 rounded-full bg-ink px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-bone"
        >
          <Quote className="h-3.5 w-3.5" /> 18h — Le Talk
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="mt-6 font-display text-5xl font-black italic leading-[0.95] md:text-7xl"
        >
          Un temps pour la parole queer.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mx-auto mt-6 max-w-2xl text-base font-medium md:text-lg"
        >
          Une heure et demie d'échange avec trois voix queer incontournables,
          modérée par les <strong>Inverti·es</strong>. Représentation,
          plateformes, agentivité, drague, deuil — on parle vraiment.
        </motion.p>

        <div className="mt-12 flex flex-wrap items-stretch justify-center gap-4">
          {speakers.map((s, i) => (
            <motion.div
              key={s.name}
              initial={{ opacity: 0, y: 30, rotate: -2 }}
              whileInView={{ opacity: 1, y: 0, rotate: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: 0.1 * i }}
              whileHover={{ rotate: [-1.5, 1.5, 0], transition: { duration: 0.3 } }}
              className="flex max-w-xs flex-col gap-2 rounded-2xl border-2 border-ink bg-bone px-6 py-5 text-left shadow-[6px_6px_0_0_rgba(0,0,0,1)]"
            >
              <span className="font-display text-2xl font-black italic">
                {s.name}
              </span>
              <span className="text-sm text-ink/80">{s.pitch}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
