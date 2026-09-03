"use client";

import React, { useEffect, useRef, useState } from "react";
import styles from "./HowItWorks.module.css";

const STEPS = [
  { num: "01", title: "Tell Me What You Need", desc: "Fill out the short enquiry form with your business details and what you're looking for." },
  { num: "02", title: "We Discuss", desc: "A quick conversation to align on your goals, requirements, and timeline." },
  { num: "03", title: "I Build", desc: "I design and develop your website or solution, keeping you updated along the way." },
  { num: "04", title: "We Refine", desc: "You review the work. We make adjustments. Then your project goes live." },
];

export function HowItWorks() {
  const [active, setActive] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.getAttribute("data-step") || "0", 10);
            setActive((prev) => Math.max(prev, index));
          }
        });
      },
      { threshold: 0.5 }
    );
    const steps = section.querySelectorAll("[data-step]");
    steps.forEach((step) => observer.observe(step));
    return () => observer.disconnect();
  }, []);

  return (
    <section id="approach" className={styles.section} ref={sectionRef}>
      <div className="container">
        <div className={styles.header}>
          <span className="section-label">Process</span>
          <h2 className={styles.title}>How It Works</h2>
        </div>
        <div className={styles.grid}>
          <div className={styles.progressCol}>
            <div className={styles.progressTrack}>
              <div className={styles.progressFill} style={{ height: `${(active / (STEPS.length - 1)) * 100}%` }} />
            </div>
          </div>
          <div className={styles.stepsCol}>
            {STEPS.map((step, i) => (
              <div key={step.num} data-step={i} className={`${styles.step} ${i <= active ? styles.active : ""}`}>
                <div className={styles.stepIndicator}>
                  <span className={styles.stepNum}>{step.num}</span>
                </div>
                <div className={styles.stepContent}>
                  <h3 className={styles.stepTitle}>{step.title}</h3>
                  <p className={styles.stepDesc}>{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
