import React from "react";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getAllProjects, getProjectById } from "@/data/projects";
import styles from "./page.module.css";

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  const projects = getAllProjects();
  return projects.map((project) => ({
    id: project.id,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const project = getProjectById(id);

  if (!project) {
    return {
      title: "Project Not Found",
    };
  }

  return {
    title: `${project.title} — LocalBizz`,
    description: project.tagline || project.description,
  };
}

export default async function ProjectDetailPage({ params }: PageProps) {
  const { id } = await params;
  const project = getProjectById(id);

  if (!project) {
    notFound();
  }

  const allProjects = getAllProjects();
  const currentIndex = allProjects.findIndex((p) => p.id === id);
  const nextProject = allProjects[(currentIndex + 1) % allProjects.length];

  return (
    <div className={styles.pageWrapper}>
      <div className="container">
        {/* 1. TOP NAVIGATION / BACK BUTTON */}
        <div className={styles.topNav}>
          <Link href="/#projects" className={styles.backLink}>
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="19" y1="12" x2="5" y2="12" />
              <polyline points="12 19 5 12 12 5" />
            </svg>
            <span>Back to Projects</span>
          </Link>
          <span className={styles.topIndex}>
            0{currentIndex + 1} / 0{allProjects.length}
          </span>
        </div>

        {/* 2. PROJECT HERO */}
        <header className={styles.hero}>
          <div className={styles.heroMetaRow}>
            <span className={styles.heroCategory}>{project.category}</span>
            <span className={styles.heroMetaDot} />
            <span className={styles.heroYear}>{project.year}</span>
          </div>

          <h1 className={styles.heroTitle}>{project.title}</h1>

          {project.tagline && (
            <p className={styles.heroTagline}>{project.tagline}</p>
          )}

          <div className={styles.heroActions}>
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.btnPrimaryLink}
              >
                <span>View Live Site</span>
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="7" y1="17" x2="17" y2="7" />
                  <polyline points="7 7 17 7 17 17" />
                </svg>
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.btnSecondaryLink}
              >
                <span>View on GitHub</span>
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
                  <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
                </svg>
              </a>
            )}
          </div>
        </header>

        {/* 3. PROJECT VISUAL SHOWCASE */}
        <div className={styles.visualContainer}>
          {project.image ? (
            <div className={styles.visualFrame}>
              <Image
                src={project.image}
                alt={project.title}
                fill
                priority
                sizes="(max-width: 1200px) 100vw, 1140px"
                className={styles.visualImage}
              />
            </div>
          ) : (
            <div
              className={styles.visualPlaceholder}
              style={{ background: project.accentColor || "var(--bg-surface)" }}
            >
              <div className={styles.placeholderInner}>
                <span className={styles.placeholderBadge}>{project.category}</span>
                <h2 className={styles.placeholderTitle}>{project.title}</h2>
              </div>
            </div>
          )}
        </div>

        {/* 4. METADATA STRIP */}
        <div className={styles.metaStrip}>
          <div className={styles.metaItem}>
            <span className={styles.metaLabel}>Role</span>
            <span className={styles.metaValue}>
              {project.role || "Independent Developer"}
            </span>
          </div>
          <div className={styles.metaItem}>
            <span className={styles.metaLabel}>Year</span>
            <span className={styles.metaValue}>{project.year}</span>
          </div>
          <div className={styles.metaItem}>
            <span className={styles.metaLabel}>Client / Context</span>
            <span className={styles.metaValue}>{project.client}</span>
          </div>
          <div className={styles.metaItem}>
            <span className={styles.metaLabel}>Category</span>
            <span className={styles.metaValue}>{project.category}</span>
          </div>
        </div>

        {/* 5. EDITORIAL CASE STUDY CONTENT */}
        <div className={styles.caseContent}>
          {/* Project Overview */}
          {(project.longDescription || project.description) && (
            <section className={styles.editorialSection}>
              <div className={styles.sectionHeaderCol}>
                <span className="section-label">Overview</span>
                <h2 className={styles.sectionHeading}>Project Overview</h2>
              </div>
              <div className={styles.sectionBodyCol}>
                <p className={styles.leadParagraph}>
                  {project.longDescription || project.description}
                </p>
                {project.longDescription &&
                  project.description &&
                  project.longDescription !== project.description && (
                    <p className={styles.bodyParagraph}>{project.description}</p>
                  )}
              </div>
            </section>
          )}

          {/* Metrics if present */}
          {project.metrics && project.metrics.length > 0 && (
            <section className={styles.editorialSection}>
              <div className={styles.sectionHeaderCol}>
                <span className="section-label">Impact</span>
                <h2 className={styles.sectionHeading}>Key Results</h2>
              </div>
              <div className={styles.sectionBodyCol}>
                <div className={styles.metricsGrid}>
                  {project.metrics.map((m, idx) => (
                    <div key={idx} className={styles.metricCard}>
                      <span className={styles.metricVal}>{m.value}</span>
                      <span className={styles.metricLbl}>{m.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* The Challenge */}
          {project.challenge && (
            <section className={styles.editorialSection}>
              <div className={styles.sectionHeaderCol}>
                <span className="section-label">Problem</span>
                <h2 className={styles.sectionHeading}>The Challenge</h2>
              </div>
              <div className={styles.sectionBodyCol}>
                <p className={styles.bodyParagraph}>{project.challenge}</p>
              </div>
            </section>
          )}

          {/* The Solution */}
          {project.solution && (
            <section className={styles.editorialSection}>
              <div className={styles.sectionHeaderCol}>
                <span className="section-label">Execution</span>
                <h2 className={styles.sectionHeading}>The Solution</h2>
              </div>
              <div className={styles.sectionBodyCol}>
                <p className={styles.bodyParagraph}>{project.solution}</p>
              </div>
            </section>
          )}

          {/* Key Deliverables / Features */}
          {project.features && project.features.length > 0 && (
            <section className={styles.editorialSection}>
              <div className={styles.sectionHeaderCol}>
                <span className="section-label">Highlights</span>
                <h2 className={styles.sectionHeading}>Key Deliverables</h2>
              </div>
              <div className={styles.sectionBodyCol}>
                <div className={styles.featuresGrid}>
                  {project.features.map((feature, idx) => (
                    <div key={idx} className={styles.featureCard}>
                      <span className={styles.featureNum}>0{idx + 1}</span>
                      <h3 className={styles.featureTitle}>{feature.title}</h3>
                      <p className={styles.featureDesc}>{feature.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* Architecture / Structural highlights */}
          {project.architecture && project.architecture.length > 0 && (
            <section className={styles.editorialSection}>
              <div className={styles.sectionHeaderCol}>
                <span className="section-label">Structure</span>
                <h2 className={styles.sectionHeading}>Architecture</h2>
              </div>
              <div className={styles.sectionBodyCol}>
                <ul className={styles.archList}>
                  {project.architecture.map((item, idx) => (
                    <li key={idx} className={styles.archItem}>
                      <span className={styles.archBullet}>—</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </section>
          )}

          {/* Technologies */}
          {project.techStack && project.techStack.length > 0 && (
            <section className={styles.editorialSection}>
              <div className={styles.sectionHeaderCol}>
                <span className="section-label">Stack</span>
                <h2 className={styles.sectionHeading}>Technologies</h2>
              </div>
              <div className={styles.sectionBodyCol}>
                <div className={styles.techCluster}>
                  {project.techStack.map((tech) => (
                    <span key={tech} className={styles.techPill}>
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </section>
          )}
        </div>

        {/* 6. NEXT PROJECT TRANSITION */}
        {nextProject && (
          <section className={styles.nextSection}>
            <Link
              href={`/work/${nextProject.id}`}
              className={styles.nextCard}
            >
              <div className={styles.nextInfo}>
                <span className={styles.nextLabel}>
                  <span>Next Project</span>
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </span>
                <h3 className={styles.nextTitle}>{nextProject.title}</h3>
                {nextProject.tagline && (
                  <p className={styles.nextTagline}>{nextProject.tagline}</p>
                )}
              </div>

              {nextProject.image && (
                <div className={styles.nextVisualPreview}>
                  <Image
                    src={nextProject.image}
                    alt={nextProject.title}
                    fill
                    sizes="180px"
                    className={styles.nextThumbnail}
                  />
                </div>
              )}

              <div className={styles.nextArrowWrap}>
                <span className={styles.nextArrowCircle}>
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </span>
              </div>
            </Link>
          </section>
        )}
      </div>
    </div>
  );
}
