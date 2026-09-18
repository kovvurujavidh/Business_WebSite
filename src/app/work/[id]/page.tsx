import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getAllProjects, getProjectById } from "@/data/projects";

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  return getAllProjects().map((p) => ({ id: p.id }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const project = getProjectById(id);
  if (!project) return { title: "Project Not Found" };
  return {
    title: project.title,
    description: project.tagline || project.description,
    openGraph: { title: `${project.title} — LocalBizz`, description: project.tagline || project.description },
  };
}

export default async function ProjectDetailPage({ params }: PageProps) {
  const { id } = await params;
  const project = getProjectById(id);
  if (!project) notFound();

  const allProjects = getAllProjects();
  const currentIndex = allProjects.findIndex((p) => p.id === id);
  const nextProject = allProjects[(currentIndex + 1) % allProjects.length];

  return (
    <div style={{ paddingTop: 100, paddingBottom: 80, minHeight: "100vh", position: "relative" }}>
      <div style={{ position: "absolute", inset: 0, background: "var(--gradient-mesh)", pointerEvents: "none" }} />
      <div style={{ maxWidth: 1120, margin: "0 auto", padding: "0 20px", position: "relative" }}>
        {/* Top nav */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 40 }}>
          <Link href="/#projects" style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13, fontWeight: 500, color: "var(--muted)", transition: "color 0.2s" }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>
            Back to Projects
          </Link>
          <span style={{ fontSize: 13, color: "var(--muted)" }}>0{currentIndex + 1} / 0{allProjects.length}</span>
        </div>

        {/* Hero */}
        <header style={{ marginBottom: 48 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 18 }}>
            <span style={{ fontSize: 12, fontWeight: 600, padding: "5px 12px", borderRadius: 8, background: "var(--gradient-1)", color: "#fff" }}>{project.category}</span>
            <span style={{ fontSize: 12, color: "var(--muted)" }}>{project.year}</span>
          </div>
          <h1 style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 800, letterSpacing: "-0.03em", marginBottom: 14 }}>{project.title}</h1>
          {project.tagline && <p style={{ fontSize: 17, color: "var(--muted)", maxWidth: 600, lineHeight: 1.7 }}>{project.tagline}</p>}
          <div style={{ display: "flex", gap: 12, marginTop: 24, flexWrap: "wrap" }}>
            {project.liveUrl && (
              <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="btn-glow" style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "12px 24px", borderRadius: 10, fontSize: 13, fontWeight: 600, background: "var(--gradient-1)", color: "#fff", position: "relative", zIndex: 1 }}>
                View Live Site ↗
              </a>
            )}
            {project.githubUrl && (
              <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "12px 24px", borderRadius: 10, fontSize: 13, fontWeight: 600, border: "1px solid var(--line-strong)", color: "var(--fg)", background: "var(--card-bg)", transition: "all 0.2s" }}>
                View on GitHub ↗
              </a>
            )}
          </div>
        </header>

        {/* Visual */}
        {project.image && (
          <div className="img-zoom" style={{ borderRadius: 18, overflow: "hidden", marginBottom: 48, background: project.accentColor, aspectRatio: "16/8", position: "relative" }}>
            <img src={project.image} alt={project.title} loading="lazy" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.15) 0%, transparent 30%)" }} />
          </div>
        )}

        {/* Meta strip */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: 16, marginBottom: 56, padding: 24, background: "var(--card-bg)", borderRadius: 14, border: "1px solid var(--card-border)" }}>
          {[
            { label: "Role", value: project.role },
            { label: "Year", value: project.year },
            { label: "Client", value: project.client },
            { label: "Category", value: project.category },
          ].map((m) => (
            <div key={m.label}>
              <div style={{ fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--muted)", marginBottom: 4 }}>{m.label}</div>
              <div style={{ fontSize: 14, fontWeight: 600 }}>{m.value}</div>
            </div>
          ))}
        </div>

        {/* Content */}
        <div style={{ maxWidth: 720 }}>
          {(project.longDescription || project.description) && (
            <section style={{ marginBottom: 48 }}>
              <div style={{ display: "inline-flex", alignItems: "center", gap: 8, color: "var(--accent)", fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", fontWeight: 600, marginBottom: 8 }}>
                <span style={{ width: 18, height: 1.5, background: "var(--gradient-1)", borderRadius: 1 }} />
                Overview
              </div>
              <h2 style={{ fontSize: 24, fontWeight: 800, letterSpacing: "-0.02em", marginBottom: 14 }}>Project Overview</h2>
              <p style={{ fontSize: 15, color: "var(--fg-soft)", lineHeight: 1.8 }}>{project.longDescription || project.description}</p>
            </section>
          )}

          {project.challenge && (
            <section style={{ marginBottom: 48 }}>
              <div style={{ display: "inline-flex", alignItems: "center", gap: 8, color: "var(--accent)", fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", fontWeight: 600, marginBottom: 8 }}>
                <span style={{ width: 18, height: 1.5, background: "var(--gradient-2)", borderRadius: 1 }} />
                Problem
              </div>
              <h2 style={{ fontSize: 24, fontWeight: 800, letterSpacing: "-0.02em", marginBottom: 14 }}>The Challenge</h2>
              <p style={{ fontSize: 15, color: "var(--fg-soft)", lineHeight: 1.8 }}>{project.challenge}</p>
            </section>
          )}

          {project.solution && (
            <section style={{ marginBottom: 48 }}>
              <div style={{ display: "inline-flex", alignItems: "center", gap: 8, color: "var(--accent)", fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", fontWeight: 600, marginBottom: 8 }}>
                <span style={{ width: 18, height: 1.5, background: "var(--gradient-3)", borderRadius: 1 }} />
                Execution
              </div>
              <h2 style={{ fontSize: 24, fontWeight: 800, letterSpacing: "-0.02em", marginBottom: 14 }}>The Solution</h2>
              <p style={{ fontSize: 15, color: "var(--fg-soft)", lineHeight: 1.8 }}>{project.solution}</p>
            </section>
          )}

          {project.features && project.features.length > 0 && (
            <section style={{ marginBottom: 48 }}>
              <div style={{ display: "inline-flex", alignItems: "center", gap: 8, color: "var(--accent)", fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", fontWeight: 600, marginBottom: 8 }}>
                <span style={{ width: 18, height: 1.5, background: "var(--gradient-4)", borderRadius: 1 }} />
                Highlights
              </div>
              <h2 style={{ fontSize: 24, fontWeight: 800, letterSpacing: "-0.02em", marginBottom: 18 }}>Key Deliverables</h2>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 14 }}>
                {project.features.map((f, i) => (
                  <div key={i} className="hover-lift card-shine" style={{ padding: 20, background: "var(--card-bg)", borderRadius: 12, border: "1px solid var(--card-border)", transition: "transform 0.3s, box-shadow 0.3s" }}>
                    <span style={{ fontSize: 12, fontWeight: 700, background: "var(--gradient-1)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", display: "block", marginBottom: 8 }}>0{i + 1}</span>
                    <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 6 }}>{f.title}</h3>
                    <p style={{ fontSize: 13, color: "var(--muted)", lineHeight: 1.6 }}>{f.description}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {project.techStack && project.techStack.length > 0 && (
            <section style={{ marginBottom: 48 }}>
              <div style={{ display: "inline-flex", alignItems: "center", gap: 8, color: "var(--accent)", fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", fontWeight: 600, marginBottom: 8 }}>
                <span style={{ width: 18, height: 1.5, background: "var(--gradient-5)", borderRadius: 1 }} />
                Stack
              </div>
              <h2 style={{ fontSize: 24, fontWeight: 800, letterSpacing: "-0.02em", marginBottom: 14 }}>Technologies</h2>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {project.techStack.map((t) => (
                  <span key={t} style={{ padding: "8px 18px", borderRadius: 8, fontSize: 13, fontWeight: 600, background: "var(--card-bg)", border: "1px solid var(--card-border)" }}>{t}</span>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Next project */}
        {nextProject && (
          <section style={{ marginTop: 64, paddingTop: 48, borderTop: "1px solid var(--line)" }}>
            <Link href={`/work/${nextProject.id}`} className="hover-lift" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: 28, background: "var(--card-bg)", border: "1px solid var(--card-border)", borderRadius: 16, transition: "transform 0.3s, box-shadow 0.3s" }}>
              <div>
                <span style={{ fontSize: 12, fontWeight: 600, display: "flex", alignItems: "center", gap: 6, marginBottom: 10, background: "var(--gradient-1)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                  Next Project
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
                </span>
                <h3 style={{ fontSize: 22, fontWeight: 700 }}>{nextProject.title}</h3>
                {nextProject.tagline && <p style={{ fontSize: 13, color: "var(--muted)", marginTop: 6 }}>{nextProject.tagline}</p>}
              </div>
              <div style={{ width: 48, height: 48, borderRadius: "50%", background: "var(--gradient-1)", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
              </div>
            </Link>
          </section>
        )}
      </div>
    </div>
  );
}
