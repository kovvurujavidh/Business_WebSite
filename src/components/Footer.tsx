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
              <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <linearGradient id="footer-logo-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#6366f1" />
                    <stop offset="100%" stopColor="#ec4899" />
                  </linearGradient>
                </defs>
                <rect width="36" height="36" rx="10" fill="url(#footer-logo-grad)" />
                <path d="M10 12V24M10 12H16C18.2 12 20 13.8 20 16V16C20 18.2 18.2 20 16 20H10M16 20H18C20.2 20 22 21.8 22 24V24" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M24 12V24M24 12H26C27.1 12 28 12.9 28 14V14C28 15.1 27.1 16 26 16H24" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.5" />
              </svg>
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
            <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#22c55e", boxShadow: "0 0 12px rgba(34,197,94,0.5)", animation: "pulse-glow-green 2s ease-in-out infinite" }} />
            Open to projects
          </div>
        </div>
      </div>
    </footer>
  );
}
