import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Marquee } from "@/components/sections/Marquee";
import { FeaturedProjects } from "@/components/sections/FeaturedProjects";
import { Services } from "@/components/sections/Services";
import { PlansSection } from "@/components/sections/PlansSection";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { ReviewsSection } from "@/components/sections/ReviewsSection";
import { EnquirySection } from "@/components/sections/EnquirySection";

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Marquee />
      <FeaturedProjects />
      <Services />
      <PlansSection />
      <HowItWorks />
      <ReviewsSection />
      <EnquirySection />
    </>
  );
}
