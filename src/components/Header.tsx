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
        background: scrolled
          ? (theme === "dark" ? "rgba(10,10,15,0.7)" : "rgba(248,249,252,0.7)")
          : (theme === "dark" ? "rgba(10,10,15,0.4)" : "rgba(248,249,252,0.4)"),
        backdropFilter: scrolled ? "blur(20px) saturate(180%)" : "blur(8px) saturate(120%)",
        borderBottom: scrolled ? "1px solid var(--line)" : "1px solid transparent",
        transition: "background 0.4s ease, backdrop-filter 0.4s ease, border-color 0.4s ease, box-shadow 0.4s ease",
        boxShadow: scrolled ? "0 4px 30px rgba(0,0,0,0.1)" : "none",
      }}
    >
      <div style={{ maxWidth: 1120, margin: "0 auto", padding: "0 20px", display: "flex", alignItems: "center", justifyContent: "space-between", height: 68 }}>
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: 10, fontWeight: 800, fontSize: 18, letterSpacing: "-0.02em" }}>
          <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="logo-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#6366f1" />
                <stop offset="100%" stopColor="#ec4899" />
              </linearGradient>
            </defs>
            <rect width="36" height="36" rx="10" fill="url(#logo-grad)" />
            <path d="M10 12V24M10 12H16C18.2 12 20 13.8 20 16V16C20 18.2 18.2 20 16 20H10M16 20H18C20.2 20 22 21.8 22 24V24" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M24 12V24M24 12H26C27.1 12 28 12.9 28 14V14C28 15.1 27.1 16 26 16H24" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.5" />
          </svg>
          <span>LOCALBIZZ</span>
        </Link>

        <nav style={{ display: "flex", gap: 6 }} className="nav-desktop">
          {NAV_LINKS.map((l) => (
            <Link key={l.href} href={l.href} style={{ fontSize: 13, fontWeight: 500, color: "var(--muted)", padding: "8px 14px", borderRadius: 8, transition: "all 0.25s cubic-bezier(0.16, 1, 0.3, 1)" }}>
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
