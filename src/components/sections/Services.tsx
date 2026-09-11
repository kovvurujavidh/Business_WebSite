"use client";

import React from "react";
import { Reveal, Stagger } from "@/components/ui/Reveal";
import { TextReveal } from "@/components/ui/TextReveal";
import styles from "./Services.module.css";

const SERVICES = [
  { num: "01", title: "Business Websites", desc: "Clean, professional websites designed around what your customers actually need to find." },
  { num: "02", title: "Landing Pages", desc: "Focused pages built to explain your offer clearly and turn visitors into leads." },
  { num: "03", title: "Custom Digital Tools", desc: "Practical tools and dashboards built around your specific business workflow." },
  { num: "04", title: "Forms & Automation", desc: "Connect enquiry forms, notifications, spreadsheets, and everyday business data." },
  { num: "05", title: "Chatbots & Assistants", desc: "Useful conversational experiences that handle common questions and qualify leads." },
];

export function Services() {
  return (
    <section id="services" className={styles.section}>
      <div className="container">
        <Reveal>
          <div className={styles.header}>
            <span className="section-label">Services</span>
            <TextReveal text="What I Build" tag="h2" className={styles.title} />
            <p className={styles.subtitle}>Practical digital solutions that help local businesses look professional and operate smoothly.</p>
          </div>
        </Reveal>
        <Stagger stagger={0.08} className={styles.list}>
          {SERVICES.map((s) => (
            <div key={s.num} className={styles.row}>
              <span className={styles.num}>{s.num}</span>
              <div className={styles.rowContent}>
                <h3 className={styles.rowTitle}>{s.title}</h3>
                <p className={styles.rowDesc}>{s.desc}</p>
              </div>
              <svg className={styles.arrow} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
            </div>
          ))}
        </Stagger>
      </div>
    </section>
  );
}