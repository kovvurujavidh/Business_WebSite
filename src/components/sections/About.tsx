"use client";

import React from "react";
import styles from "./About.module.css";

export function About() {
  return (
    <section id="about" className={styles.section}>
      <div className="container">
        <div className={styles.grid}>
          <div className={styles.left}>
            <span className="section-label">Founder</span>
            <h2 className={styles.title}>Javidh</h2>
            <p className={styles.lead}>Founder &amp; Independent Digital Builder</p>

            <div className={styles.brandCard}>
              <span className={styles.brandSubtitle}>Digital solutions for local businesses.</span>
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
          </div>
          <div className={styles.right}>
            <p className={styles.body}>
              I build practical websites and digital solutions for real businesses —
              hotels, function halls, restaurants, shops, and service businesses
              that need a professional online presence.
            </p>
            <p className={styles.body}>
              My work focuses on clean design, fast performance, and clear
              information architecture. Every project is built to help
              businesses look professional and be easier to find, understand, and contact.
            </p>
            <div className={styles.focusGrid}>
              <div className={styles.focusItem}>
                <span className={styles.focusIcon}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18"/></svg>
                </span>
                <span className={styles.focusLabel}>Websites</span>
              </div>
              <div className={styles.focusItem}>
                <span className={styles.focusIcon}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>
                </span>
                <span className={styles.focusLabel}>Digital Experiences</span>
              </div>
              <div className={styles.focusItem}>
                <span className={styles.focusIcon}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>
                </span>
                <span className={styles.focusLabel}>Automation</span>
              </div>
              <div className={styles.focusItem}>
                <span className={styles.focusIcon}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>
                </span>
                <span className={styles.focusLabel}>Practical Tools</span>
              </div>
            </div>
            <div className={styles.techRow}>
              <span className={styles.techTag}>Next.js</span>
              <span className={styles.techTag}>React</span>
              <span className={styles.techTag}>TypeScript</span>
              <span className={styles.techTag}>CSS</span>
              <span className={styles.techTag}>Node.js</span>
              <span className={styles.techTag}>Prisma</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
