"use client";

import React, { Suspense } from "react";
import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";
import { TextReveal } from "@/components/ui/TextReveal";
import { Magnetic } from "@/components/ui/Magnetic";
import { Parallax } from "@/components/ui/Parallax";
import { Hero3D } from "@/components/three/Hero3D";
import styles from "./Hero.module.css";

const STRIP_ITEMS = [
  "Varasiddi Function Hall",
  "Business Websites",
  "HR Analytics Excel Dashboard",
  "Landing Pages",
  "HR Analytics SQL",
  "Custom Digital Tools",
  "MyTradingBot",
  "Forms & Automation",
  "Trading Indicator",
  "Chatbots & Assistants",
  "Data & Analytics",
];

export function Hero() {
  return (
    <section className={styles.hero}>
      <Suspense fallback={null}>
        <Hero3D />
      </Suspense>

      <div className={styles.showcase}>
        <div className={styles.track}>
          {[...STRIP_ITEMS, ...STRIP_ITEMS].map((item, i) => (
            <span key={i} className={styles.stripItem}>
              {item}
              <span className={styles.stripDot} />
            </span>
          ))}
        </div>
      </div>

      <div className="container">
        <div className={styles.content}>
          <Reveal delay={0.1}>
            <div className={styles.identity}>
              <span className={styles.name}>LOCALBIZZ</span>
              <span className={styles.divider} />
              <span className={styles.role}>Digital solutions for local businesses.</span>
            </div>
          </Reveal>

          <div className={styles.grid}>
            <div className={styles.headlineCol}>
              <Reveal delay={0.2}>
                <TextReveal
                  text="I build websites"
                  tag="h1"
                  className={styles.headlineLine}
                />
                <TextReveal
                  text="that bring you"
                  tag="h1"
                  className={styles.headlineLine}
                  delay={200}
                />
                <h1 className={styles.headline}>
                  <span className={styles.accent}>
                    <TextReveal text="customers." tag="span" delay={400} />
                  </span>
                </h1>
              </Reveal>
            </div>

            <div className={styles.detailsCol}>
              <Parallax speed={0.08}>
                <Reveal delay={0.4}>
                  <p className={styles.subtitle}>
                    Professional websites and digital solutions for hotels, restaurants, function halls,
                    and local businesses — designed to convert, built to perform.
                  </p>
                </Reveal>

                <Reveal delay={0.5}>
                  <div className={styles.ctas}>
                    <Magnetic strength={0.2}>
                      <Link href="#contact" className="btn-primary">
                        Start a Project
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
                      </Link>
                    </Magnetic>
                    <Magnetic strength={0.2}>
                      <Link href="#projects" className="btn-secondary">View My Work</Link>
                    </Magnetic>
                  </div>
                </Reveal>

                <Reveal delay={0.6}>
                  <div className={styles.proof}>
                    <span className={styles.proofDot} />
                    <span>Real projects. Real businesses. Real results.</span>
                  </div>
                </Reveal>
              </Parallax>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}