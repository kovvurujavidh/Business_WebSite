"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useTheme } from "./ThemeProvider";
import styles from "./Header.module.css";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { theme, toggle } = useTheme();
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
      const total = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(total > 0 ? (window.scrollY / total) * 100 : 0);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const close = () => setMenuOpen(false);

  return (
    <>
      <div className="scroll-progress" style={{ width: `${scrollProgress}%` }} />
      <header className={`${styles.header} ${scrolled ? styles.scrolled : ""}`}>
        <div className={styles.inner}>
          <Link href="/" className={styles.brand} onClick={close}>
            <span className={styles.mark} />
            <span className={styles.brandText}>LOCALBIZZ</span>
          </Link>

          <nav className={styles.nav}>
            <Link href="#projects" className={styles.navLink}>Work</Link>
            <Link href="#services" className={styles.navLink}>Services</Link>
            <Link href="#approach" className={styles.navLink}>Approach</Link>
            <Link href="#about" className={styles.navLink}>Founder</Link>
            <Link href="#plans" className={styles.navLink}>Plans</Link>
            <Link href="#reviews" className={styles.navLink}>Reviews</Link>
          </nav>

          <div className={styles.actions}>
            <button onClick={toggle} className={styles.themeBtn} aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}>
              {theme === "light" ? (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
              ) : (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>
              )}
            </button>
            <Link href="#contact" className={styles.cta}>
              Get in Touch
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
            </Link>
            <button className={`${styles.burger} ${menuOpen ? styles.burgerOpen : ""}`} onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
              <span /><span />
            </button>
          </div>
        </div>

        <div className={`${styles.drawer} ${menuOpen ? styles.drawerOpen : ""}`}>
          <nav className={styles.drawerNav}>
            <Link href="#projects" className={styles.drawerLink} onClick={close}>Work</Link>
            <Link href="#services" className={styles.drawerLink} onClick={close}>Services</Link>
            <Link href="#approach" className={styles.drawerLink} onClick={close}>Approach</Link>
            <Link href="#about" className={styles.drawerLink} onClick={close}>Founder</Link>
            <Link href="#plans" className={styles.drawerLink} onClick={close}>Plans</Link>
            <Link href="#reviews" className={styles.drawerLink} onClick={close}>Reviews</Link>
            <Link href="#contact" className={styles.drawerLink} onClick={close}>Contact</Link>
          </nav>
          <div className={styles.drawerFooter}>
            <button onClick={() => { toggle(); close(); }} className={styles.drawerThemeBtn}>
              {theme === "light" ? "Switch to Dark Mode" : "Switch to Light Mode"}
            </button>
            <Link href="#contact" className={styles.drawerCta} onClick={close}>Get in Touch</Link>
          </div>
        </div>
      </header>
    </>
  );
}
