"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight, Mic } from "lucide-react";
import { residence } from "@/data/residence";
import { Star } from "@/components/shared/star";

export function ResidenceHighlight() {
  return (
    <section className="relative overflow-hidden bg-ink py-24 md:py-32">
      <div
        aria-hidden
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 20%, rgba(244,98,10,0.25), transparent 40%), radial-gradient(circle at 80% 80%, rgba(244,98,10,0.18), transparent 50%)",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
          className="mb-10 flex flex-col gap-4 md:mb-14 md:flex-row md:items-end md:justify-between"
        >
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-orange/15 px-3 py-1 text-xs font-bold uppercase tracking-[0.2em] text-orange">
              <Mic className="h-3.5 w-3.5" /> Résidence — {residence.status}
            </span>
            <h2 className="mt-4 max-w-3xl font-display text-5xl font-black italic leading-[0.95] text-bone md:text-7xl">
              Fier.e.s à la <span className="text-orange">Gaîté Lyrique</span>.
            </h2>
          </div>
          <p className="max-w-md text-base text-bone/70">{residence.pitch}</p>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="max-w-3xl text-lg leading-relaxed text-bone/80"
        >
          {residence.description}
        </motion.p>

        <div className="mt-12 grid gap-5 sm:grid-cols-2">
          {residence.guests.map((g, i) => (
            <motion.div
              key={g.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: 0.1 + i * 0.08 }}
              className="relative overflow-hidden rounded-3xl border-2 border-bone/15 bg-white/[0.03] p-6 transition-colors hover:border-orange/60 hover:bg-orange/5 md:p-8"
            >
              <Star
                aria-hidden
                className="absolute -right-4 -top-4 h-16 w-16 text-orange/30"
              />
              <div className="text-xs font-bold uppercase tracking-[0.18em] text-orange">
                {g.role}
              </div>
              <h3 className="mt-2 font-display text-4xl font-black italic leading-tight text-bone md:text-5xl">
                {g.name}
              </h3>
              <p className="mt-4 text-base text-bone/75">{g.blurb}</p>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 flex flex-wrap items-center gap-3">
          <Link
            href="/residence"
            className="inline-flex items-center gap-2 rounded-full bg-orange px-6 py-3 text-sm font-bold uppercase tracking-[0.16em] text-ink transition hover:scale-105"
          >
            Tout savoir sur la résidence
            <ArrowUpRight className="h-4 w-4" />
          </Link>
          <Link
            href={residence.externalUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-[0.16em] text-bone underline-offset-4 hover:underline"
          >
            Site Gaîté Lyrique
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
