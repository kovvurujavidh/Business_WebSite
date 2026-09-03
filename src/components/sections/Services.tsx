"use client";

import React from "react";
import styles from "./Services.module.css";

const SERVICES = [
  { num: "01", title: "Business Websites", desc: "Clean, professional websites designed around what your customers actually need to find.", color: "var(--accent)" },
  { num: "02", title: "Landing Pages", desc: "Focused pages built to explain your offer clearly and turn visitors into leads.", color: "var(--accent-cyan)" },
  { num: "03", title: "Custom Digital Tools", desc: "Practical tools and dashboards built around your specific business workflow.", color: "var(--accent-emerald)" },
  { num: "04", title: "Forms & Automation", desc: "Connect enquiry forms, notifications, spreadsheets, and everyday business data.", color: "var(--accent-amber)" },
  { num: "05", title: "Chatbots & Assistants", desc: "Useful conversational experiences that handle common questions and qualify leads.", color: "var(--accent)" },
];

export function Services() {
  return (
    <section id="services" className={styles.section}>
      <div className="container">
        <div className={styles.header}>
          <span className="section-label">Services</span>
          <h2 className={styles.title}>What I Build</h2>
          <p className={styles.subtitle}>Practical digital solutions that help local businesses look professional and operate smoothly.</p>
        </div>
        <div className={styles.list}>
          {SERVICES.map((s) => (
            <div key={s.num} className={styles.row}>
              <span className={styles.num} style={{ color: s.color }}>{s.num}</span>
              <div className={styles.rowContent}>
                <h3 className={styles.rowTitle}>{s.title}</h3>
                <p className={styles.rowDesc}>{s.desc}</p>
              </div>
              <svg className={styles.arrow} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
