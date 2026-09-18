import React from "react";
import Link from "next/link";
import type { Metadata } from "next";
import { getAllProjects } from "@/data/projects";

export const metadata: Metadata = {
  title: "All Projects",
  description: "Browse all projects built by LocalBizz.",
};

export default function AllProjectsPage() {
  const projects = getAllProjects();
  return (
    <div style={{ paddingTop: 100, paddingBottom: 80, minHeight: "100vh", position: "relative" }}>
      <div style={{ position: "absolute", inset: 0, background: "var(--gradient-mesh)", pointerEvents: "none" }} />
      <div style={{ maxWidth: 1120, margin: "0 auto", padding: "0 20px", position: "relative" }}>
        <header style={{ marginBottom: 56 }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, color: "var(--accent)", fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", fontWeight: 600, marginBottom: 16 }}>
            <span style={{ width: 18, height: 1.5, background: "var(--gradient-1)", borderRadius: 1 }} />
            All Projects
          </div>
          <h1 style={{ fontSize: "clamp(2rem, 5vw, 3.2rem)", fontWeight: 800, letterSpacing: "-0.03em", marginBottom: 8 }}>All Projects</h1>
          <p style={{ fontSize: 15, color: "var(--muted)", maxWidth: 560 }}>A complete collection of websites, dashboards, and digital tools.</p>
        </header>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))", gap: 20 }}>
          {projects.map((project, i) => (
            <article key={project.id} className="card-shine hover-lift" style={{ background: "var(--card-bg)", border: "1px solid var(--card-border)", borderRadius: 16, overflow: "hidden", transition: "transform 0.3s, box-shadow 0.3s" }}>
              <div className="img-zoom" style={{ height: 180, position: "relative", background: project.accentColor }}>
                <img src={project.image} alt={project.title} loading="lazy" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.4) 0%, transparent 50%)" }} />
                <span style={{ position: "absolute", top: 12, left: 12, fontSize: 11, fontWeight: 600, padding: "4px 10px", borderRadius: 8, background: "rgba(255,255,255,0.15)", backdropFilter: "blur(8px)", color: "#fff" }}>{project.category}</span>
                <span style={{ position: "absolute", bottom: 12, right: 12, fontSize: 28, fontWeight: 800, color: "rgba(255,255,255,0.12)" }}>0{i + 1}</span>
              </div>
              <div style={{ padding: 22 }}>
                <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
                  <span style={{ fontSize: 11, padding: "4px 10px", borderRadius: 6, background: "var(--bg-deep)", color: "var(--muted)" }}>{project.year}</span>
                </div>
                <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 6 }}>
                  <Link href={`/work/${project.id}`}>{project.title}</Link>
                </h2>
                <p style={{ fontSize: 13, color: "var(--muted)", lineHeight: 1.6, marginBottom: 14 }}>{project.tagline}</p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 16 }}>
                  {project.techStack.map((t) => (
                    <span key={t} style={{ fontSize: 11, padding: "4px 10px", borderRadius: 6, background: "var(--bg-deep)", color: "var(--fg-soft)" }}>{t}</span>
                  ))}
                </div>
                <Link href={`/work/${project.id}`} style={{ fontSize: 13, fontWeight: 600, color: "var(--accent)" }}>
                  Explore Case Study →
                </Link>
              </div>
            </article>
          ))}
        </div>
        <div style={{ marginTop: 48, textAlign: "center" }}>
          <Link href="/" style={{ fontSize: 14, color: "var(--muted)", fontWeight: 500 }}>← Back to Home</Link>
        </div>
      </div>
    </div>
  );
}
