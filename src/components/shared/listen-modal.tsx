"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { X, Headphones, ArrowUpRight } from "lucide-react";
import { useEffect } from "react";
import { platforms } from "@/data/podcast";
import { Star } from "./star";

export function ListenModal({
  open,
  onClose,
  episodeTitle,
  episodeNumber,
}: {
  open: boolean;
  onClose: () => void;
  episodeTitle?: string;
  episodeNumber?: number;
}) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[80] flex items-center justify-center bg-black/80 backdrop-blur-md p-5"
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label="Choisir une plateforme d'écoute"
        >
          <motion.div
            initial={{ scale: 0.95, y: 20, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.95, y: 20, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-md rounded-3xl border-2 border-ink bg-bone p-6 text-ink shadow-[10px_10px_0_0_rgba(244,98,10,1)] sm:p-8"
          >
            <button
              type="button"
              onClick={onClose}
              aria-label="Fermer"
              className="absolute right-4 top-4 inline-flex h-9 w-9 items-center justify-center rounded-full bg-ink text-bone transition hover:scale-105"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-orange">
              <Headphones className="h-3.5 w-3.5" />
              {episodeNumber ? `Épisode ${episodeNumber}` : "Dernier épisode"}
            </div>

            <h2 className="mt-3 font-display text-3xl font-black italic leading-tight">
              {episodeTitle ?? "Écouter Fier.e.s"}
            </h2>
            <p className="mt-2 text-sm text-ink/70">
              Choisis ta plateforme préférée — l'épisode s'ouvre dans un nouvel
              onglet.
            </p>

            <ul className="mt-6 grid gap-3">
              {[...platforms]
                .sort((a, b) => a.priority - b.priority)
                .map((p) => (
                  <li key={p.id}>
                    <Link
                      href={p.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={onClose}
                      className="group flex items-center justify-between gap-3 rounded-2xl border-2 border-ink bg-white px-5 py-3 text-base font-bold transition hover:-translate-y-[2px] hover:bg-orange hover:text-ink"
                    >
                      <span className="inline-flex items-center gap-2">
                        <Star className="h-3.5 w-3.5 text-orange group-hover:text-ink" />
                        {p.label}
                      </span>
                      <ArrowUpRight className="h-4 w-4 transition group-hover:rotate-12" />
                    </Link>
                  </li>
                ))}
            </ul>

            <p className="mt-5 text-xs text-ink/50">
              Tu peux aussi t&apos;abonner directement au flux RSS dans
              l&apos;app podcast de ton choix.
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
