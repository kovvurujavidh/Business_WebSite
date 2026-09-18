"use client";

import React from "react";
import Link from "next/link";

export function HomeHero() {
  return (
    <section
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        position: "relative",
        overflow: "hidden",
        paddingTop: 80,
        background: "var(--gradient-hero)",
      }}
    >
      {/* Animated gradient orbs */}
      <div className="orb" style={{ width: 600, height: 600, background: "radial-gradient(circle, rgba(99,102,241,0.25) 0%, transparent 70%)", top: "-15%", left: "-10%", animation: "float 8s ease-in-out infinite" }} />
      <div className="orb" style={{ width: 500, height: 500, background: "radial-gradient(circle, rgba(236,72,153,0.2) 0%, transparent 70%)", bottom: "5%", right: "-8%", animation: "float 10s ease-in-out infinite 2s" }} />
      <div className="orb" style={{ width: 350, height: 350, background: "radial-gradient(circle, rgba(6,182,212,0.15) 0%, transparent 70%)", top: "40%", left: "50%", animation: "float 12s ease-in-out infinite 4s" }} />

      {/* Grid pattern overlay */}
      <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(rgba(255,255,255,0.03) 1px, transparent 1px)", backgroundSize: "40px 40px", pointerEvents: "none" }} />

      <div style={{ maxWidth: 1120, margin: "0 auto", padding: "0 20px", width: "100%", position: "relative", zIndex: 1 }}>
        {/* Identity badge */}
        <div style={{ animation: "fadeInDown 0.6s ease-out", marginBottom: 32 }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 10, padding: "8px 18px", borderRadius: 999, background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.1)", backdropFilter: "blur(8px)" }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#22c55e", boxShadow: "0 0 8px #22c55e" }} />
            <span style={{ fontSize: 12, fontWeight: 600, letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(255,255,255,0.7)" }}>LOCALBIZZ</span>
            <span style={{ width: 1, height: 14, background: "rgba(255,255,255,0.2)" }} />
            <span style={{ fontSize: 12, color: "rgba(255,255,255,0.5)" }}>Digital solutions for local businesses.</span>
          </div>
        </div>

        {/* Headline */}
        <h1 style={{ fontSize: "clamp(2.8rem, 7vw, 5rem)", fontWeight: 800, lineHeight: 1.05, letterSpacing: "-0.03em", marginBottom: 24, color: "#fff", animation: "fadeInUp 0.7s ease-out 0.1s both" }}>
          I build websites
          <br />
          that bring you{" "}
          <span style={{ background: "var(--gradient-1)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
            customers.
          </span>
        </h1>

        {/* Subtitle */}
        <p style={{ fontSize: "clamp(1rem, 2vw, 1.2rem)", color: "rgba(255,255,255,0.6)", maxWidth: 540, lineHeight: 1.7, marginBottom: 36, animation: "fadeInUp 0.7s ease-out 0.2s both" }}>
          Professional websites and digital solutions for hotels, restaurants, function halls, and local businesses — designed to convert, built to perform.
        </p>

        {/* CTAs */}
        <div style={{ display: "flex", gap: 14, flexWrap: "wrap", marginBottom: 48, animation: "fadeInUp 0.7s ease-out 0.3s both" }}>
          <Link
            href="/#contact"
            className="btn-glow"
            style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              padding: "15px 30px", borderRadius: 12, fontSize: 14, fontWeight: 600,
              background: "var(--gradient-1)", color: "#fff",
              position: "relative", zIndex: 1,
            }}
          >
            Start a Project
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
          </Link>
          <Link
            href="/#projects"
            className="btn-secondary"
            style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              padding: "15px 30px", borderRadius: 12, fontSize: 14, fontWeight: 600,
              background: "rgba(255,255,255,0.06)", color: "#fff",
              border: "1px solid rgba(255,255,255,0.15)",
              backdropFilter: "blur(4px)",
            }}
          >
            View My Work
          </Link>
        </div>

        {/* Proof */}
        <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: "rgba(255,255,255,0.5)", animation: "fadeInUp 0.7s ease-out 0.4s both" }}>
          <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#22c55e", boxShadow: "0 0 8px #22c55e" }} />
          Real projects. Real businesses. Real results.
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 120, background: "linear-gradient(to top, var(--bg), transparent)", pointerEvents: "none" }} />
    </section>
  );
}
