"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { getFeaturedProjects } from "@/data/projects";
import styles from "./FeaturedProjects.module.css";

export function FeaturedProjects() {
  const projects = getFeaturedProjects();

  return (
    <section id="projects" className={styles.section}>
      <div className="container">
        <div className={styles.header}>
          <div>
            <span className="section-label">Featured Work</span>
            <h2 className={styles.title}>Selected Projects</h2>
          </div>
          <p className={styles.subtitle}>Real projects I&apos;ve built for real businesses and purposes.</p>
        </div>

        <div className={styles.grid}>
          {projects.map((project, index) => (
            <article key={project.id} className={styles.card} style={{ animationDelay: `${index * 0.1}s` }}>
              <div className={styles.cardVisual}>
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  sizes="(max-width: 900px) 100vw, 33vw"
                  className={styles.cardImage}
                />
                <span className={styles.visualNum}>0{index + 1}</span>
                <span className={styles.visualCategory}>{project.category}</span>
              </div>
              <div className={styles.cardBody}>
                <div className={styles.cardMeta}>
                  <span className={styles.yearTag}>{project.year}</span>
                  <span className={styles.roleTag}>{project.role}</span>
                </div>
                <h3 className={styles.cardTitle}><Link href={`/work/${project.id}`}>{project.title}</Link></h3>
                <p className={styles.cardDesc}>{project.tagline}</p>
                <div className={styles.cardTech}>
                  {project.techStack.map((t) => <span key={t} className={styles.techPill}>{t}</span>)}
                </div>
                <div className={styles.cardFooter}>
                  <Link href={`/work/${project.id}`} className={styles.caseLink}>
                    View Case Study
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
                  </Link>
                  {project.liveUrl && (
                    <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className={styles.liveLink}>
                      Live Site
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                    </a>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className={styles.viewAll}>
          <Link href="/work" className={styles.viewAllBtn}>
            View All Projects
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
