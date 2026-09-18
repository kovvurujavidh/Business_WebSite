"use client";

import React, { useState } from "react";
import Link from "next/link";
import { getFeaturedProjects } from "@/data/projects";
import { useScrollReveal, useStaggerReveal } from "@/hooks/useScrollReveal";

export function HomeProjects() {
  const projects = getFeaturedProjects();
  const { ref: headerRef, visible: headerVisible } = useScrollReveal(0.2);
  const { ref: gridRef, visible: gridVisible } = useStaggerReveal(3);

  return (
    <section id="projects" style={{ padding: "120px 20px", background: "var(--bg-deep)", position: "relative", overflow: "hidden" }}>
      {/* Decorative orb */}
      <div className="orb" style={{ width: 400, height: 400, background: "radial-gradient(circle, rgba(99,102,241,0.08) 0%, transparent 70%)", top: "10%", right: "-5%", pointerEvents: "none" }} />

      <div style={{ maxWidth: 1120, margin: "0 auto", position: "relative" }}>
        {/* Header */}
        <div ref={headerRef} className={`reveal ${headerVisible ? "visible" : ""}`} style={{ marginBottom: 56 }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, color: "var(--accent)", fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", fontWeight: 600, marginBottom: 16 }}>
            <span style={{ width: 18, height: 1.5, background: "var(--gradient-1)", borderRadius: 1 }} />
            Featured Work
          </div>
          <h2 style={{ fontSize: "clamp(1.8rem, 4vw, 2.8rem)", fontWeight: 800, letterSpacing: "-0.03em", marginBottom: 8 }}>Selected Projects</h2>
          <p style={{ fontSize: 15, color: "var(--muted)", maxWidth: 480 }}>Real projects I&apos;ve built for real businesses and purposes.</p>
        </div>

        {/* Grid */}
        <div ref={gridRef} className={`stagger-children ${gridVisible ? "visible" : ""}`} style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))", gap: 24 }}>
          {projects.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>

        {/* View All */}
        <div style={{ textAlign: "center", marginTop: 48 }}>
          <Link
            href="/work"
            className="hover-lift"
            style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              padding: "14px 28px", borderRadius: 12, fontSize: 14, fontWeight: 600,
              background: "var(--card-bg)", color: "var(--fg)",
              border: "1px solid var(--card-border)",
              transition: "all 0.3s",
            }}
          >
            View All Projects
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
          </Link>
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ project, index }: { project: ReturnType<typeof getFeaturedProjects>[number]; index: number }) {
  const [loaded, setLoaded] = useState(false);

  return (
    <article className="card-shine hover-lift" style={{ background: "var(--card-bg)", border: "1px solid var(--card-border)", borderRadius: 18, overflow: "hidden", transition: "transform 0.3s, box-shadow 0.3s" }}>
      {/* Visual */}
      <div className="img-zoom" style={{ height: 220, position: "relative", background: project.accentColor }}>
        {!loaded && <div className="skeleton" style={{ position: "absolute", inset: 0 }} />}
        <img
          src={project.image}
          alt={project.title}
          loading="lazy"
          onLoad={() => setLoaded(true)}
          style={{ width: "100%", height: "100%", objectFit: "cover", opacity: loaded ? 1 : 0, transition: "opacity 0.4s ease" }}
        />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 60%)" }} />
        <span style={{ position: "absolute", top: 14, left: 14, fontSize: 11, fontWeight: 600, padding: "5px 12px", borderRadius: 8, background: "rgba(255,255,255,0.15)", backdropFilter: "blur(8px)", color: "#fff" }}>
          {project.category}
        </span>
        <span style={{ position: "absolute", bottom: 14, right: 14, fontSize: 36, fontWeight: 800, color: "rgba(255,255,255,0.12)", lineHeight: 1 }}>
          0{index + 1}
        </span>
      </div>

      {/* Body */}
      <div style={{ padding: 22 }}>
        <div style={{ display: "flex", gap: 8, marginBottom: 14 }}>
          <span style={{ fontSize: 11, padding: "4px 10px", borderRadius: 6, background: "var(--bg-deep)", color: "var(--muted)", fontWeight: 500 }}>{project.year}</span>
          <span style={{ fontSize: 11, padding: "4px 10px", borderRadius: 6, background: "var(--bg-deep)", color: "var(--muted)", fontWeight: 500 }}>{project.role}</span>
        </div>
        <h3 style={{ fontSize: 19, fontWeight: 700, marginBottom: 6, letterSpacing: "-0.01em" }}>
          <Link href={`/work/${project.id}`} style={{ transition: "color 0.2s" }}>
            {project.title}
          </Link>
        </h3>
        <p style={{ fontSize: 13, color: "var(--muted)", lineHeight: 1.6, marginBottom: 16 }}>{project.tagline}</p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 18 }}>
          {project.techStack.map((t) => (
            <span key={t} style={{ fontSize: 11, padding: "4px 10px", borderRadius: 6, background: "var(--bg-deep)", color: "var(--fg-soft)", fontWeight: 500 }}>{t}</span>
          ))}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <Link href={`/work/${project.id}`} style={{ fontSize: 13, fontWeight: 600, color: "var(--accent)", display: "flex", alignItems: "center", gap: 4, transition: "gap 0.2s" }}>
            View Case Study →
          </Link>
          {project.liveUrl && (
            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" style={{ fontSize: 13, fontWeight: 500, color: "var(--muted)", display: "flex", alignItems: "center", gap: 4 }}>
              Live Site ↗
            </a>
          )}
          {project.githubUrl && (
            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" style={{ fontSize: 13, fontWeight: 500, color: "var(--muted)", display: "flex", alignItems: "center", gap: 4 }}>
              GitHub ↗
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
