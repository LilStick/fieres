import type { Metadata } from "next";
import { PodcastHero } from "@/components/podcast/hero";
import { FeaturedEpisodes } from "@/components/podcast/featured-episodes";
import { HostSection } from "@/components/podcast/host-section";
import { ResidenceHighlight } from "@/components/podcast/residence-highlight";
import { FestivalFeature } from "@/components/podcast/festival-feature";
import { SocialWall } from "@/components/podcast/social-wall";
import { brand } from "@/data/brand";

export const metadata: Metadata = {
  title: `${brand.name} — ${brand.tagline}`,
  description: brand.description,
};

export default function HomePage() {
  return (
    <>
      <PodcastHero />
      <FeaturedEpisodes />
      <ResidenceHighlight />
      <HostSection />
      <FestivalFeature />
      <SocialWall />
    </>
  );
}
