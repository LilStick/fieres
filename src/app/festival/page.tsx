import type { Metadata } from "next";
import { Hero } from "@/components/festival/hero";
import { Programme } from "@/components/festival/programme";
import { Artists } from "@/components/festival/artists";
import { Talk } from "@/components/festival/talk";
import { PracticalInfo } from "@/components/festival/practical-info";
import { Partners } from "@/components/festival/partners";
import { festival } from "@/data/festival";

export const metadata: Metadata = {
  title: `Festival Fier.e.s — ${festival.date.label}`,
  description: festival.manifesto,
};

export default function FestivalPage() {
  return (
    <>
      <Hero />
      <Programme />
      <Artists />
      <Talk />
      <PracticalInfo />
      <Partners />
    </>
  );
}
