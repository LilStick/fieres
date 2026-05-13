"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Ticket, Menu, X } from "lucide-react";
import Link from "next/link";
import { festival, navLinks } from "@/data/festival";
import { Star } from "./star";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    let lastY = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 40);
      // Hide on scroll down, show on scroll up. Always visible near the top.
      if (y < 80) {
        setHidden(false);
      } else if (y > lastY + 4) {
        setHidden(true);
      } else if (y < lastY - 4) {
        setHidden(false);
      }
      lastY = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: 0 }}
        animate={{ y: hidden ? -120 : 0 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-colors",
          scrolled
            ? "bg-ink/85 backdrop-blur-md border-b border-white/10"
            : "bg-transparent"
        )}
      >
        <nav
          aria-label="Navigation principale"
          className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8"
        >
          <Link
            href="#top"
            className="flex items-center gap-2 text-bone"
            aria-label="Retour en haut"
          >
            <Star className="h-5 w-5 text-orange" />
            <span className="font-display text-xl font-black italic tracking-tight">
              Fier.e.s
            </span>
          </Link>

          <ul className="hidden items-center gap-7 md:flex">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="text-sm font-medium tracking-wide text-bone/80 transition hover:text-orange"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-3">
            <Link
              href={festival.ticketsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group hidden items-center gap-2 rounded-full bg-orange px-5 py-2.5 text-sm font-bold uppercase tracking-wider text-ink shadow-[0_4px_0_0_rgba(0,0,0,1)] transition hover:translate-y-[2px] hover:shadow-[0_2px_0_0_rgba(0,0,0,1)] sm:inline-flex"
            >
              <Ticket className="h-4 w-4" />
              Billets
            </Link>
            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-label="Ouvrir le menu"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-bone md:hidden"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </nav>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex flex-col bg-orange px-6 py-6 md:hidden"
          >
            <div className="flex items-center justify-between">
              <span className="font-display text-2xl font-black italic text-ink">
                Fier.e.s
              </span>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Fermer le menu"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-ink text-bone"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <ul className="mt-16 flex flex-col gap-6">
              {navLinks.map((link, i) => (
                <motion.li
                  key={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 + i * 0.05 }}
                >
                  <a
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="font-display text-5xl font-black italic text-ink"
                  >
                    {link.label}.
                  </a>
                </motion.li>
              ))}
            </ul>
            <Link
              href={festival.ticketsUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setOpen(false)}
              className="mt-auto inline-flex items-center justify-center gap-2 rounded-full bg-ink px-6 py-4 text-base font-bold uppercase tracking-wider text-bone"
            >
              <Ticket className="h-5 w-5" />
              Prendre mes billets
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
