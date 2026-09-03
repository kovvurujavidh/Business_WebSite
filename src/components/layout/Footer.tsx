import React from "react";
import Link from "next/link";
import styles from "./Footer.module.css";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.ctaBlock}>
          <h2 className={styles.ctaTitle}>Have something that needs building?</h2>
          <Link href="#contact" className="btn-primary">
            Start a Project
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
          </Link>
        </div>

        <div className={styles.grid}>
          <div className={styles.brandCol}>
            <div className={styles.brand}>
              <span className={styles.mark} />
              <span className={styles.brandText}>LOCALBIZZ</span>
            </div>
            <p className={styles.tagline}>
              Digital solutions for local businesses. Websites and practical digital tools for businesses
              that want to be easier to find, understand, and contact.
            </p>
          </div>

          <div className={styles.linksCol}>
            <h4 className={styles.colTitle}>Navigation</h4>
            <ul className={styles.linkList}>
              <li><Link href="#projects">Projects</Link></li>
              <li><Link href="#services">Services</Link></li>
              <li><Link href="#approach">Approach</Link></li>
              <li><Link href="#about">Founder</Link></li>
              <li><Link href="#reviews">Reviews</Link></li>
              <li><Link href="#contact">Contact</Link></li>
            </ul>
          </div>

          <div className={styles.linksCol}>
            <h4 className={styles.colTitle}>Connect</h4>
            <ul className={styles.linkList}>
              <li>
                <a href="https://github.com/kovvurujavidh" target="_blank" rel="noopener noreferrer">
                  <span className={styles.linkIcon}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg>
                  </span>
                  GitHub
                </a>
              </li>
              <li>
                <a href="https://t.me/kovvurujavidh" target="_blank" rel="noopener noreferrer">
                  <span className={styles.linkIcon}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
                  </span>
                  Telegram
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className={styles.bottom}>
          <p className={styles.copy}>&copy; {year} LocalBizz. Founded by Javidh.</p>
          <div className={styles.status}>
            <span className={styles.statusDot} />
            <span>Open to projects</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
