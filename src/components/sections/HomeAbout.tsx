"use client";

import React from "react";
import { useScrollReveal, useStaggerReveal } from "@/hooks/useScrollReveal";

const FOCUS_ITEMS = [
  { icon: "◇", label: "Websites", gradient: "var(--gradient-1)" },
  { icon: "△", label: "Digital Experiences", gradient: "var(--gradient-2)" },
  { icon: "⚙", label: "Automation", gradient: "var(--gradient-3)" },
  { icon: "⟨/⟩", label: "Practical Tools", gradient: "var(--gradient-4)" },
];

const TECH = ["Next.js", "React", "TypeScript", "CSS", "Node.js", "Python"];

export function HomeAbout() {
  const { ref: sectionRef, visible } = useScrollReveal(0.1);
  const { ref: gridRef, visible: gridVisible } = useStaggerReveal(4);

  return (
    <section id="about" style={{ padding: "120px 20px", position: "relative" }}>
      {/* Background mesh */}
      <div style={{ position: "absolute", inset: 0, background: "var(--gradient-mesh)", pointerEvents: "none" }} />

      <div style={{ maxWidth: 1120, margin: "0 auto", position: "relative" }}>
        <div ref={sectionRef} className={`reveal ${visible ? "visible" : ""}`} style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 60, alignItems: "start" }}>
          {/* Left */}
          <div>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, color: "var(--accent)", fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", fontWeight: 600, marginBottom: 16 }}>
              <span style={{ width: 18, height: 1.5, background: "var(--gradient-1)", borderRadius: 1 }} />
              Founder
            </div>
            <h2 style={{ fontSize: "clamp(2.2rem, 5vw, 3.2rem)", fontWeight: 800, letterSpacing: "-0.03em", marginBottom: 8 }}>Javidh</h2>
            <p style={{ fontSize: 15, color: "var(--muted)", marginBottom: 32 }}>Founder &amp; Independent Digital Builder</p>

            {/* Brand card */}
            <div className="card-shine glow-hover" style={{ background: "var(--card-bg)", border: "1px solid var(--card-border)", borderRadius: 16, padding: 24, transition: "transform 0.3s, box-shadow 0.3s" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 18 }}>
                <div style={{ width: 40, height: 40, borderRadius: 10, background: "var(--gradient-1)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, color: "#fff", fontWeight: 700 }}>L</div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 15 }}>LOCALBIZZ</div>
                  <div style={{ fontSize: 12, color: "var(--muted)" }}>Digital solutions for local businesses.</div>
                </div>
              </div>
              <div style={{ height: 1, background: "var(--line)", marginBottom: 18 }} />
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, marginBottom: 10 }}>
                <span style={{ color: "var(--muted)" }}>Brand</span>
                <span style={{ fontWeight: 600 }}>LOCALBIZZ</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13 }}>
                <span style={{ color: "var(--muted)" }}>Founded by</span>
                <span style={{ fontWeight: 600, color: "var(--accent)" }}>Javidh</span>
              </div>
            </div>
          </div>

          {/* Right */}
          <div>
            <p style={{ fontSize: 15, color: "var(--fg-soft)", lineHeight: 1.8, marginBottom: 16 }}>
              I build practical websites and digital solutions for real businesses — hotels, function halls, restaurants, shops, and service businesses that need a professional online presence.
            </p>
            <p style={{ fontSize: 15, color: "var(--fg-soft)", lineHeight: 1.8, marginBottom: 36 }}>
              My work focuses on clean design, fast performance, and clear information architecture. Every project is built to help businesses look professional and be easier to find, understand, and contact.
            </p>

            {/* Focus grid */}
            <div ref={gridRef} className={`stagger-children ${gridVisible ? "visible" : ""}`} style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 12, marginBottom: 32 }}>
              {FOCUS_ITEMS.map((item) => (
                <div key={item.label} className="hover-lift" style={{ display: "flex", alignItems: "center", gap: 12, padding: "14px 18px", background: "var(--card-bg)", borderRadius: 12, border: "1px solid var(--card-border)", cursor: "default" }}>
                  <div style={{ width: 36, height: 36, borderRadius: 8, background: item.gradient, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, color: "#fff", flexShrink: 0 }}>
                    {item.icon}
                  </div>
                  <span style={{ fontSize: 13, fontWeight: 600 }}>{item.label}</span>
                </div>
              ))}
            </div>

            {/* Tech tags */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {TECH.map((t, i) => (
                <span key={t} style={{ padding: "7px 16px", borderRadius: 8, fontSize: 12, fontWeight: 600, background: "var(--card-bg)", border: "1px solid var(--card-border)", color: "var(--fg-soft)", transition: "all 0.2s", cursor: "default" }}>
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
