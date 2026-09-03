import Link from "next/link";
import styles from "./not-found.module.css";

export default function NotFound() {
  return (
    <div className={styles.page}>
      <div className="container">
        <div className={styles.content}>
          <span className={styles.code}>404</span>
          <h1 className={styles.title}>Page not found.</h1>
          <p className={styles.desc}>The page you&apos;re looking for doesn&apos;t exist or has been moved.</p>
          <Link href="/" className="btn-primary">
            Back to Home
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
          </Link>
        </div>
      </div>
    </div>
  );
}
