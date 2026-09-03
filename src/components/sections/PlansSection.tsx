"use client";

import React from "react";
import Link from "next/link";
import { PLANS } from "@/data/plans";
import styles from "./PlansSection.module.css";

export function PlansSection() {
  return (
    <section id="plans" className={styles.section}>
      <div className="container">
        <div className={styles.header}>
          <span className="section-label">Plans</span>
          <h2 className={styles.title}>Choose the right plan for your business</h2>
          <p className={styles.subtitle}>Simple options built around what your business actually needs.</p>
        </div>

        <div className={styles.grid}>
          {PLANS.map((plan) => (
            <div key={plan.id} className={`${styles.card} ${plan.popular ? styles.popular : ""}`}>
              {plan.popular && <span className={styles.badge}>Popular</span>}
              <div className={styles.cardTop}>
                <span className={styles.num}>{plan.num}</span>
                <h3 className={styles.planName}>{plan.name}</h3>
                <p className={styles.planTagline}>{plan.tagline}</p>
                <div className={styles.priceBlock}>
                  <span className={styles.price}>Custom Quote</span>
                  <span className={styles.priceNote}>Price depends on your requirements.</span>
                </div>
              </div>
              <div className={styles.divider} />
              <ul className={styles.features}>
                {plan.features.map((f, i) => (
                  <li key={i} className={i === 0 && plan.features[0].includes("Everything") ? styles.featureHighlight : ""}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                    {f}
                  </li>
                ))}
              </ul>
              <Link
                href={`/contact?plan=${plan.id}`}
                className={`${styles.cta} ${plan.popular ? styles.ctaPopular : ""}`}
              >
                {plan.cta}
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
