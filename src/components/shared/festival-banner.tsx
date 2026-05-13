"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Ticket, X } from "lucide-react";
import { festival } from "@/data/festival";
import { Star } from "./star";

/**
 * Bandeau sticky de promo festival.
 * Visible sur toutes les pages tant que l'utilisateur·rice ne le ferme pas.
 * État conservé dans sessionStorage.
 */
export function FestivalBanner() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const dismissed = sessionStorage.getItem("fieres-banner-dismissed");
    setOpen(dismissed !== "1");
  }, []);

  const dismiss = () => {
    setOpen(false);
    if (typeof window !== "undefined") {
      sessionStorage.setItem("fieres-banner-dismissed", "1");
    }
    document.documentElement.style.setProperty("--banner-h", "0px");
  };

  useEffect(() => {
    if (typeof document === "undefined") return;
    document.documentElement.style.setProperty(
      "--banner-h",
      open ? "44px" : "0px"
    );
    return () => {
      document.documentElement.style.setProperty("--banner-h", "0px");
    };
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ y: -50 }}
          animate={{ y: 0 }}
          exit={{ y: -50 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-x-0 top-0 z-[60] flex items-center justify-center gap-2 bg-orange px-4 py-2.5 text-ink"
        >
          <Star className="hidden h-4 w-4 sm:inline-block" />
          <span className="text-xs font-bold uppercase tracking-[0.12em] sm:tracking-[0.18em]">
            Festival Fier.e.s — {festival.date.label}, Césure.
          </span>
          <Link
            href={festival.ticketsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-full bg-ink px-3 py-1 text-[11px] font-bold uppercase tracking-[0.18em] text-bone transition hover:bg-ink/80"
          >
            <Ticket className="h-3 w-3" />
            Billets
          </Link>
          <button
            type="button"
            onClick={dismiss}
            aria-label="Fermer le bandeau"
            className="ml-2 inline-flex h-6 w-6 items-center justify-center rounded-full hover:bg-ink/10"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
