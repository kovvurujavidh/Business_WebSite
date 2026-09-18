"use client";

import React from "react";
import { useScrollReveal, useStaggerReveal } from "@/hooks/useScrollReveal";

const SERVICES = [
  { num: "01", title: "Business Websites", desc: "Clean, professional websites designed around what your customers actually need to find.", gradient: "var(--gradient-1)" },
  { num: "02", title: "Landing Pages", desc: "Focused pages built to explain your offer clearly and turn visitors into leads.", gradient: "var(--gradient-2)" },
  { num: "03", title: "Custom Digital Tools", desc: "Practical tools and dashboards built around your specific business workflow.", gradient: "var(--gradient-3)" },
  { num: "04", title: "Forms & Automation", desc: "Connect enquiry forms, notifications, spreadsheets, and everyday business data.", gradient: "var(--gradient-4)" },
  { num: "05", title: "Chatbots & Assistants", desc: "Useful conversational experiences that handle common questions and qualify leads.", gradient: "var(--gradient-5)" },
];

export function HomeServices() {
  const { ref: headerRef, visible: headerVisible } = useScrollReveal(0.2);
  const { ref: listRef, visible: listVisible } = useStaggerReveal(5);

  return (
    <section id="services" style={{ padding: "120px 20px", position: "relative" }}>
      <div style={{ position: "absolute", inset: 0, background: "var(--gradient-mesh)", pointerEvents: "none" }} />

      <div style={{ maxWidth: 1120, margin: "0 auto", position: "relative" }}>
        <div ref={headerRef} className={`reveal ${headerVisible ? "visible" : ""}`} style={{ marginBottom: 56 }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, color: "var(--accent)", fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", fontWeight: 600, marginBottom: 16 }}>
            <span style={{ width: 18, height: 1.5, background: "var(--gradient-1)", borderRadius: 1 }} />
            Services
          </div>
          <h2 style={{ fontSize: "clamp(1.8rem, 4vw, 2.8rem)", fontWeight: 800, letterSpacing: "-0.03em", marginBottom: 8 }}>What I Build</h2>
          <p style={{ fontSize: 15, color: "var(--muted)", maxWidth: 480 }}>Practical digital solutions that help local businesses look professional and operate smoothly.</p>
        </div>

        <div ref={listRef} className={`stagger-children ${listVisible ? "visible" : ""}`} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {SERVICES.map((s) => (
            <div
              key={s.num}
              className="hover-lift card-shine"
              style={{
                display: "grid", gridTemplateColumns: "60px 1fr 24px", gap: 16, alignItems: "center",
                padding: "26px 24px", background: "var(--card-bg)", border: "1px solid var(--card-border)",
                borderRadius: 14, transition: "transform 0.3s, box-shadow 0.3s, border-color 0.3s",
                cursor: "default",
              }}
            >
              <div style={{ width: 40, height: 40, borderRadius: 10, background: s.gradient, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 700, color: "#fff" }}>
                {s.num}
              </div>
              <div>
                <h3 style={{ fontSize: 17, fontWeight: 700, marginBottom: 4 }}>{s.title}</h3>
                <p style={{ fontSize: 13, color: "var(--muted)", lineHeight: 1.6 }}>{s.desc}</p>
              </div>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--muted)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ transition: "transform 0.2s" }}><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
