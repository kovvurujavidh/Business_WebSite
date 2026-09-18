import Link from "next/link";

export default function NotFound() {
  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}>
      <div style={{ textAlign: "center" }}>
        <h1 style={{ fontSize: 72, fontWeight: 800, color: "var(--accent)", marginBottom: 8 }}>404</h1>
        <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 12 }}>Page Not Found</h2>
        <p style={{ color: "var(--muted)", marginBottom: 24 }}>The page you&apos;re looking for doesn&apos;t exist.</p>
        <Link href="/" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "12px 24px", borderRadius: 10, fontSize: 14, fontWeight: 600, background: "var(--accent)", color: "#fff" }}>
          ← Back to Home
        </Link>
      </div>
    </div>
  );
}
