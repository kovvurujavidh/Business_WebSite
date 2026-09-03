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
                <a href="https://wa.me/917670860094?text=Hi%2C%20I%20need%20to%20connect%20with%20you." target="_blank" rel="noopener noreferrer">
                  <span className={styles.linkIcon}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>
                  </span>
                  WhatsApp
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
