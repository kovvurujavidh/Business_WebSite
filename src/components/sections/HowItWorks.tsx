"use client";

import React, { useEffect, useRef, useState } from "react";
import { Reveal } from "@/components/ui/Reveal";
import { TextReveal } from "@/components/ui/TextReveal";
import { CountUp } from "@/components/ui/CountUp";
import styles from "./HowItWorks.module.css";

const STEPS = [
  { num: "01", title: "Tell Me What You Need", desc: "Fill out the short enquiry form with your business details and what you're looking for." },
  { num: "02", title: "We Discuss", desc: "A quick conversation to align on your goals, requirements, and timeline." },
  { num: "03", title: "I Build", desc: "I design and develop your website or solution, keeping you updated along the way." },
  { num: "04", title: "We Refine", desc: "You review the work. We make adjustments. Then your project goes live." },
];

export function HowItWorks() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [progress, setProgress] = useState(0);
  const [activeStep, setActiveStep] = useState(-1);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const onScroll = () => {
      const rect = section.getBoundingClientRect();
      const sectionTop = rect.top;
      const sectionHeight = rect.height;
      const viewportHeight = window.innerHeight;

      // Start filling when section top reaches 80% of viewport
      const triggerPoint = viewportHeight * 0.8;
      const scrollInSection = triggerPoint - sectionTop;
      const totalScrollRange = sectionHeight + triggerPoint * 0.5;

      const raw = scrollInSection / totalScrollRange;
      const clamped = Math.max(0, Math.min(1, raw));

      setProgress(clamped);

      // Determine which step is active based on progress
      const stepIndex = Math.floor(clamped * STEPS.length);
      setActiveStep(Math.min(stepIndex, STEPS.length - 1));
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section id="approach" className={styles.section} ref={sectionRef}>
      <div className="container">
        <Reveal>
          <div className={styles.header}>
            <span className="section-label">Process</span>
            <TextReveal text="How It Works" tag="h2" className={styles.title} />
          </div>
        </Reveal>

        <div className={styles.statsRow}>
          <Reveal delay={0.1}>
            <div className={styles.stat}>
              <span className={styles.statValue}><CountUp end={4} suffix=" steps" /></span>
              <span className={styles.statLabel}>Simple process</span>
            </div>
          </Reveal>
          <Reveal delay={0.2}>
            <div className={styles.stat}>
              <span className={styles.statValue}><CountUp end={100} suffix="%" /></span>
              <span className={styles.statLabel}>Transparent workflow</span>
            </div>
          </Reveal>
          <Reveal delay={0.3}>
            <div className={styles.stat}>
              <span className={styles.statValue}><CountUp end={1} suffix=" partner" /></span>
              <span className={styles.statLabel}>One point of contact</span>
            </div>
          </Reveal>
        </div>

        <div className={styles.stepsContainer}>
          {/* Filling vertical line */}
          <div className={styles.lineTrack}>
            <div className={styles.lineFill} style={{ height: `${progress * 100}%` }} />
          </div>

          {/* Steps */}
          <div className={styles.steps}>
            {STEPS.map((step, i) => (
              <div
                key={step.num}
                className={`${styles.step} ${i <= activeStep ? styles.stepActive : ""} ${i < activeStep ? styles.stepDone : ""}`}
              >
                <div className={styles.stepDot}>
                  <div className={styles.stepDotInner}>
                    {i < activeStep ? (
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                    ) : (
                      <span className={styles.stepNum}>{step.num}</span>
                    )}
                  </div>
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