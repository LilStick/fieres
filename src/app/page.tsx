import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { Programme } from "@/components/programme";
import { Artists } from "@/components/artists";
import { Talk } from "@/components/talk";
import { PracticalInfo } from "@/components/practical-info";
import { Partners } from "@/components/partners";
import { Footer } from "@/components/footer";

export default function HomePage() {
  return (
    <main className="overflow-x-hidden">
      <Navbar />
      <Hero />
      <Programme />
      <Artists />
      <Talk />
      <PracticalInfo />
      <Partners />
      <Footer />
    </main>
  );
}
