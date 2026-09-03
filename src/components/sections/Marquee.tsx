"use client";

import React from "react";
import styles from "./Marquee.module.css";

const ITEMS = [
  "Varasiddi Function Hall",
  "HR Analytics Excel Dashboard",
  "HR Analytics SQL",
  "MyTradingBot",
  "Trading Indicator",
  "Business Websites",
  "Landing Pages",
  "Custom Digital Tools",
  "Forms & Automation",
  "Chatbots & Assistants",
  "Data & Analytics",
];

export function Marquee() {
  return (
    <div className={styles.wrap}>
      <div className={styles.track}>
        {ITEMS.map((item, i) => (
          <span key={i} className={styles.item}>
            {item}
            <span className={styles.sep} />
          </span>
        ))}
        {ITEMS.map((item, i) => (
          <span key={`dup-${i}`} className={styles.item} aria-hidden>
            {item}
            <span className={styles.sep} />
          </span>
        ))}
      </div>
    </div>
  );
}
