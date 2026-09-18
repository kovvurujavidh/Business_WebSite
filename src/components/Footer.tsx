"use client";

import React from "react";
import Link from "next/link";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer style={{ background: "var(--bg-deep)", borderTop: "1px solid var(--line)", padding: "80px 20px 32px", position: "relative", overflow: "hidden" }}>
      <div className="orb" style={{ width: 300, height: 300, background: "radial-gradient(circle, rgba(99,102,241,0.06) 0%, transparent 70%)", top: "-20%", right: "10%", pointerEvents: "none" }} />

      <div style={{ maxWidth: 1120, margin: "0 auto", position: "relative" }}>
        {/* CTA */}
        <div style={{ textAlign: "center", marginBottom: 64 }}>
          <h2 style={{ fontSize: "clamp(1.6rem, 4vw, 2.4rem)", fontWeight: 800, marginBottom: 20, letterSpacing: "-0.03em" }}>
            Have something that needs building?
          </h2>
          <Link
            href="/#contact"
            className="btn-glow"
            style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              padding: "15px 32px", borderRadius: 12, fontSize: 14, fontWeight: 600,
              background: "var(--gradient-1)", color: "#fff",
              transition: "transform 0.2s",
              position: "relative", zIndex: 1,
            }}
          >
            Start a Project →
          </Link>
        </div>

        {/* Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 48, marginBottom: 48 }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
              <div style={{ width: 36, height: 36, borderRadius: 8, background: "var(--gradient-1)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 14, fontWeight: 800 }}>L</div>
              <span style={{ fontWeight: 800, fontSize: 16 }}>LOCALBIZZ</span>
            </div>
            <p style={{ fontSize: 13, color: "var(--muted)", lineHeight: 1.7 }}>
              Digital solutions for local businesses. Websites and practical digital tools for businesses that want to be easier to find, understand, and contact.
            </p>
          </div>

          <div>
            <h4 style={{ fontSize: 12, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--muted)", marginBottom: 18 }}>Navigation</h4>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 12 }}>
              {[
                { href: "/#projects", label: "Projects" },
                { href: "/#services", label: "Services" },
                { href: "/#about", label: "About" },
                { href: "/#process", label: "Process" },
                { href: "/#contact", label: "Contact" },
              ].map((l) => (
                <li key={l.href}>
                  <Link href={l.href} style={{ fontSize: 14, color: "var(--fg-soft)", transition: "color 0.2s" }}>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Bottom */}
        <div style={{ borderTop: "1px solid var(--line)", paddingTop: 24, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
          <p style={{ fontSize: 13, color: "var(--muted)" }}>&copy; {year} LocalBizz. Founded by Javidh.</p>
          <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: "var(--muted)" }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#22c55e", boxShadow: "0 0 8px #22c55e" }} />
            Open to projects
          </div>
        </div>
      </div>
    </footer>
  );
}
