import { HomeHero } from "@/components/sections/HomeHero";
import { HomeAbout } from "@/components/sections/HomeAbout";
import { HomeProjects } from "@/components/sections/HomeProjects";
import { HomeServices } from "@/components/sections/HomeServices";
import { HomeProcess } from "@/components/sections/HomeProcess";
import { HomeContact } from "@/components/sections/HomeContact";

export default function Home() {
  return (
    <>
      <HomeHero />
      <HomeAbout />
      <HomeProjects />
      <HomeServices />
      <HomeProcess />
      <HomeContact />
    </>
  );
}
