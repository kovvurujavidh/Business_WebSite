"use client";

import React from "react";
import { useScrollReveal, useStaggerReveal } from "@/hooks/useScrollReveal";

const STEPS = [
  { num: "01", title: "Tell Me What You Need", desc: "Fill out the short enquiry form with your business details and what you're looking for.", gradient: "var(--gradient-1)" },
  { num: "02", title: "We Discuss", desc: "A quick conversation to align on your goals, requirements, and timeline.", gradient: "var(--gradient-2)" },
  { num: "03", title: "I Build", desc: "I design and develop your website or solution, keeping you updated along the way.", gradient: "var(--gradient-3)" },
  { num: "04", title: "We Refine", desc: "You review the work. We make adjustments. Then your project goes live.", gradient: "var(--gradient-4)" },
];

export function HomeProcess() {
  const { ref: headerRef, visible: headerVisible } = useScrollReveal(0.2);
  const { ref: statsRef, visible: statsVisible } = useStaggerReveal(3);
  const { ref: stepsRef, visible: stepsVisible } = useStaggerReveal(4);

  return (
    <section id="process" style={{ padding: "120px 20px", background: "var(--bg-deep)", position: "relative", overflow: "hidden" }}>
      <div className="orb" style={{ width: 350, height: 350, background: "radial-gradient(circle, rgba(236,72,153,0.08) 0%, transparent 70%)", bottom: "10%", left: "-5%", pointerEvents: "none" }} />

      <div style={{ maxWidth: 1120, margin: "0 auto", position: "relative" }}>
        <div ref={headerRef} className={`reveal ${headerVisible ? "visible" : ""}`} style={{ marginBottom: 56 }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, color: "var(--accent)", fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", fontWeight: 600, marginBottom: 16 }}>
            <span style={{ width: 18, height: 1.5, background: "var(--gradient-1)", borderRadius: 1 }} />
            Process
          </div>
          <h2 style={{ fontSize: "clamp(1.8rem, 4vw, 2.8rem)", fontWeight: 800, letterSpacing: "-0.03em" }}>How It Works</h2>
        </div>

        {/* Stats */}
        <div ref={statsRef} className={`stagger-children ${statsVisible ? "visible" : ""}`} style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 16, marginBottom: 56 }}>
          {[
            { value: "4 steps", label: "Simple process", gradient: "var(--gradient-1)" },
            { value: "100%", label: "Transparent workflow", gradient: "var(--gradient-2)" },
            { value: "1 partner", label: "One point of contact", gradient: "var(--gradient-3)" },
          ].map((stat) => (
            <div key={stat.label} className="hover-lift glow-hover" style={{ textAlign: "center", padding: 28, background: "var(--card-bg)", borderRadius: 14, border: "1px solid var(--card-border)", transition: "transform 0.3s, box-shadow 0.3s" }}>
              <div style={{ fontSize: 28, fontWeight: 800, background: stat.gradient, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", marginBottom: 6 }}>{stat.value}</div>
              <div style={{ fontSize: 13, color: "var(--muted)" }}>{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Steps */}
        <div ref={stepsRef} className={`stagger-children ${stepsVisible ? "visible" : ""}`} style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 20 }}>
          {STEPS.map((step, i) => (
            <div key={step.num} className="hover-lift card-shine" style={{ padding: 28, background: "var(--card-bg)", borderRadius: 16, border: "1px solid var(--card-border)", position: "relative", overflow: "hidden" }}>
              <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: step.gradient }} />
              <div style={{ width: 44, height: 44, borderRadius: 12, background: step.gradient, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, fontWeight: 700, marginBottom: 18 }}>
                {step.num}
              </div>
              <h3 style={{ fontSize: 17, fontWeight: 700, marginBottom: 8 }}>{step.title}</h3>
              <p style={{ fontSize: 13, color: "var(--muted)", lineHeight: 1.7 }}>{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
