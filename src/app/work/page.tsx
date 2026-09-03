import React from "react";
import Link from "next/link";
import type { Metadata } from "next";
import { getAllProjects } from "@/data/projects";
import { GlassCard } from "@/components/ui/GlassCard";
import { Badge } from "@/components/ui/Badge";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Engineering Archives & All Projects",
  description: "Comprehensive portfolio of software architectures, systems engineering, and modern digital applications.",
};

export default function AllProjectsPage() {
  const projects = getAllProjects();

  return (
    <div className={styles.pageWrapper}>
      <div className="container">
        {/* Top Header */}
        <header className={styles.header}>
          <div className={styles.badgeWrapper}>
            <Badge variant="cyan" dot>
              Engineering Archives
            </Badge>
          </div>
          <h1 className={styles.title}>All Projects &amp; Systems</h1>
          <p className={styles.subtitle}>
            An exhaustive collection of cloud infrastructures, responsive web applications, and precision-engineered client software.
          </p>
        </header>

        {/* Projects List Grid */}
        <div className={styles.projectsGrid}>
          {projects.map((project, index) => (
            <GlassCard
              key={project.id}
              variant="interactive"
              className={styles.projectCard}
            >
              <div className={styles.cardHeader}>
                <div className={styles.badgeRow}>
                  <Badge variant="primary">{project.category}</Badge>
                  <span className={styles.yearText}>{project.year}</span>
                </div>
                <span className={styles.indexNum}>0{index + 1}</span>
              </div>

              <div className={styles.cardBody}>
                <h2 className={styles.projectTitle}>
                  <Link href={`/work/${project.id}`} className={styles.titleLink}>
                    {project.title}
                  </Link>
                </h2>
                <p className={styles.projectDesc}>{project.tagline}</p>
              </div>

              {/* Metrics */}
              <div className={styles.metricsRow}>
                {project.metrics.slice(0, 2).map((m, i) => (
                  <div key={i} className={styles.metricItem}>
                    <span className={styles.metricVal}>{m.value}</span>
                    <span className={styles.metricLbl}>{m.label}</span>
                  </div>
                ))}
              </div>

              {/* Tech stack */}
              <div className={styles.techList}>
                {project.techStack.map((tech) => (
                  <span key={tech} className={styles.techPill}>
                    {tech}
                  </span>
                ))}
              </div>

              <div className={styles.cardFooter}>
                <Link href={`/work/${project.id}`} className={styles.viewLink}>
                  <span>Explore Case Study</span>
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </Link>
              </div>
            </GlassCard>
          ))}
        </div>

        {/* Back to Home CTA */}
        <div className={styles.backHomeWrapper}>
          <Link href="/" className={styles.backHomeBtn}>
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
