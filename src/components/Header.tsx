"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useTheme } from "./ThemeProvider";

const NAV_LINKS = [
  { href: "/#projects", label: "Work" },
  { href: "/#services", label: "Services" },
  { href: "/#about", label: "About" },
  { href: "/#process", label: "Process" },
  { href: "/#contact", label: "Contact" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { theme, toggle } = useTheme();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 50,
        background: theme === "dark" ? "rgba(10,10,15,0.85)" : "rgba(248,249,252,0.85)",
        backdropFilter: "blur(16px) saturate(180%)",
        borderBottom: scrolled ? "1px solid var(--line)" : "1px solid transparent",
        transition: "all 0.3s ease",
        boxShadow: scrolled ? "0 1px 20px rgba(0,0,0,0.08)" : "none",
      }}
    >
      <div style={{ maxWidth: 1120, margin: "0 auto", padding: "0 20px", display: "flex", alignItems: "center", justifyContent: "space-between", height: 68 }}>
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: 10, fontWeight: 800, fontSize: 18, letterSpacing: "-0.02em" }}>
          <div style={{ width: 32, height: 32, borderRadius: 8, background: "var(--gradient-1)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 14, fontWeight: 800 }}>L</div>
          <span>LOCALBIZZ</span>
        </Link>

        <nav style={{ display: "flex", gap: 6 }} className="nav-desktop">
          {NAV_LINKS.map((l) => (
            <Link key={l.href} href={l.href} style={{ fontSize: 13, fontWeight: 500, color: "var(--muted)", padding: "8px 14px", borderRadius: 8, transition: "all 0.2s" }}>
              {l.label}
            </Link>
          ))}
        </nav>

        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <button
            onClick={toggle}
            aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
            style={{
              width: 38, height: 38, borderRadius: 10, border: "1px solid var(--line-strong)",
              background: "var(--card-bg)", color: "var(--fg)", cursor: "pointer",
              display: "flex", alignItems: "center", justifyContent: "center",
              transition: "all 0.2s",
            }}
          >
            {theme === "light" ? "🌙" : "☀️"}
          </button>
          <Link
            href="/#contact"
            className="btn-glow"
            style={{
              display: "inline-flex", alignItems: "center", gap: 6,
              padding: "10px 20px", borderRadius: 10, fontSize: 13, fontWeight: 600,
              background: "var(--gradient-1)", color: "#fff",
              transition: "transform 0.2s",
              position: "relative", zIndex: 1,
            }}
          >
            Get in Touch
          </Link>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="burger-btn"
            aria-label="Toggle menu"
            style={{
              display: "none", width: 38, height: 38, border: "1px solid var(--line-strong)",
              background: "var(--card-bg)", color: "var(--fg)", cursor: "pointer",
              flexDirection: "column", justifyContent: "center", alignItems: "center", gap: 5,
              borderRadius: 10,
            }}
          >
            <span style={{ width: 18, height: 2, background: "var(--fg)", borderRadius: 1, transition: "transform 0.2s", transform: menuOpen ? "rotate(45deg) translate(5px, 5px)" : "none" }} />
            <span style={{ width: 18, height: 2, background: "var(--fg)", borderRadius: 1, transition: "opacity 0.2s", opacity: menuOpen ? 0 : 1 }} />
            <span style={{ width: 18, height: 2, background: "var(--fg)", borderRadius: 1, transition: "transform 0.2s", transform: menuOpen ? "rotate(-45deg) translate(5px, -5px)" : "none" }} />
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      <div style={{ maxHeight: menuOpen ? 400 : 0, overflow: "hidden", transition: "max-height 0.3s ease", borderTop: menuOpen ? "1px solid var(--line)" : "none" }}>
        <div style={{ padding: "8px 20px 20px" }}>
          {NAV_LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setMenuOpen(false)}
              style={{ display: "block", padding: "14px 0", fontSize: 15, fontWeight: 500, color: "var(--fg)", borderBottom: "1px solid var(--line)" }}
            >
              {l.label}
            </Link>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .nav-desktop { display: none !important; }
          .burger-btn { display: flex !important; }
        }
      `}</style>
    </header>
  );
}
