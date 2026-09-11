"use client";

import React from "react";
import Image from "next/image";
import { Reveal, Stagger } from "@/components/ui/Reveal";
import { TextReveal } from "@/components/ui/TextReveal";
import { Magnetic } from "@/components/ui/Magnetic";
import styles from "./About.module.css";

export function About() {
  return (
    <section id="about" className={styles.section}>
      <div className="container">
        <div className={styles.grid}>
          <div className={styles.left}>
            <Reveal delay={0.1}>
              <span className="section-label">Founder</span>
            </Reveal>
            <Reveal delay={0.2}>
              <TextReveal text="Javidh" tag="h2" className={styles.title} />
            </Reveal>
            <Reveal delay={0.3}>
              <p className={styles.lead}>Founder &amp; Independent Digital Builder</p>
            </Reveal>

            <Reveal delay={0.4}>
              <div className={styles.brandCard}>
                <div className={styles.brandCardTop}>
                  <Image src="/logo.svg" alt="LocalBizz" width={32} height={32} />
                  <div>
                    <span className={styles.brandName}>LOCALBIZZ</span>
                    <span className={styles.brandSubtitle}>Digital solutions for local businesses.</span>
                  </div>
                </div>
                <div className={styles.brandDivider} />
                <div className={styles.brandRelationRow}>
                  <span className={styles.brandLabel}>Brand</span>
                  <strong className={styles.brandName}>LOCALBIZZ</strong>
                </div>
                <div className={styles.brandRelationRow}>
                  <span className={styles.brandLabel}>Founded by</span>
                  <span className={styles.founderName}>Javidh</span>
                </div>
              </div>
            </Reveal>
          </div>

          <div className={styles.right}>
            <Reveal delay={0.2}>
              <p className={styles.body}>
                I build practical websites and digital solutions for real businesses —
                hotels, function halls, restaurants, shops, and service businesses
                that need a professional online presence.
              </p>
            </Reveal>
            <Reveal delay={0.3}>
              <p className={styles.body}>
                My work focuses on clean design, fast performance, and clear
                information architecture. Every project is built to help
                businesses look professional and be easier to find, understand, and contact.
              </p>
            </Reveal>

            <Stagger stagger={0.08} className={styles.focusGrid}>
              <Magnetic strength={0.15}>
                <div className={styles.focusItem}>
                  <span className={styles.focusIcon}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18"/></svg>
                  </span>
                  <span className={styles.focusLabel}>Websites</span>
                </div>
              </Magnetic>
              <Magnetic strength={0.15}>
                <div className={styles.focusItem}>
                  <span className={styles.focusIcon}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>
                  </span>
                  <span className={styles.focusLabel}>Digital Experiences</span>
                </div>
              </Magnetic>
              <Magnetic strength={0.15}>
                <div className={styles.focusItem}>
                  <span className={styles.focusIcon}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>
                  </span>
                  <span className={styles.focusLabel}>Automation</span>
                </div>
              </Magnetic>
              <Magnetic strength={0.15}>
                <div className={styles.focusItem}>
                  <span className={styles.focusIcon}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>
                  </span>
                  <span className={styles.focusLabel}>Practical Tools</span>
                </div>
              </Magnetic>
            </Stagger>

            <Reveal delay={0.5}>
              <div className={styles.techRow}>
                {["Next.js", "React", "TypeScript", "CSS", "Node.js", "Prisma"].map((t) => (
                  <Magnetic key={t} strength={0.2}>
                    <span className={styles.techTag}>{t}</span>
                  </Magnetic>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}