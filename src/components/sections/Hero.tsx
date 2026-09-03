"use client";

import React, { useEffect, useRef, useCallback } from "react";
import Link from "next/link";
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
  const glowRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    const glow = glowRef.current;
    if (glow) {
      glow.style.left = `${e.clientX}px`;
      glow.style.top = `${e.clientY}px`;
    }
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const isTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0;
    if (isTouch) return;

    document.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => document.removeEventListener("mousemove", handleMouseMove);
  }, [handleMouseMove]);

  return (
    <section className={styles.hero}>
      <div ref={glowRef} className={styles.cursorGlow} />

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
          <div className={styles.identity}>
            <span className={styles.name}>LOCALBIZZ</span>
            <span className={styles.divider} />
            <span className={styles.role}>Digital solutions for local businesses.</span>
          </div>

          <div className={styles.grid}>
            <div className={styles.headlineCol}>
              <h1 className={styles.headline}>
                I build websites<br />
                that bring you<br />
                <span className={styles.accent}>customers.</span>
              </h1>
            </div>

            <div className={styles.detailsCol}>
              <p className={styles.subtitle}>
                Professional websites and digital solutions for hotels, restaurants, function halls,
                and local businesses — designed to convert, built to perform.
              </p>

              <div className={styles.ctas}>
                <Link href="#contact" className="btn-primary">
                  Start a Project
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
                </Link>
                <Link href="#projects" className="btn-secondary">View My Work</Link>
              </div>

              <div className={styles.proof}>
                <span className={styles.proofDot} />
                <span>Real projects. Real businesses. Real results.</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
