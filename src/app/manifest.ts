import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "LocalBizz — Digital Solutions for Local Businesses",
    short_name: "LocalBizz",
    description: "Professional websites and digital solutions for hotels, restaurants, function halls, and local businesses.",
    start_url: "/",
    display: "standalone",
    background_color: "#0c0b09",
    theme_color: "#c87941",
    icons: [
      {
        src: "/logo.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
    ],
  };
}
