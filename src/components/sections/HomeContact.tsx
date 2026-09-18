"use client";

import React, { useState } from "react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

export function HomeContact() {
  const { ref, visible } = useScrollReveal(0.1);
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.subject.trim() || !formData.message.trim()) {
      setStatus("error");
      setErrorMessage("Please fill out all required fields.");
      return;
    }
    setIsSubmitting(true);
    setStatus("idle");
    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setStatus("success");
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        setStatus("error");
        setErrorMessage(data.message || "Something went wrong.");
      }
    } catch {
      setStatus("error");
      setErrorMessage("Network error.");
    }
    setIsSubmitting(false);
  };

  const inputStyle: React.CSSProperties = {
    width: "100%", padding: "14px 16px", borderRadius: 12, fontSize: 14,
    background: "var(--bg-deep)", border: "1px solid var(--line-strong)",
    color: "var(--fg)", outline: "none", transition: "border-color 0.2s, box-shadow 0.2s",
  };

  return (
    <section id="contact" style={{ padding: "120px 20px", position: "relative" }}>
      <div style={{ position: "absolute", inset: 0, background: "var(--gradient-mesh)", pointerEvents: "none" }} />

      <div ref={ref} className={`reveal ${visible ? "visible" : ""}`} style={{ maxWidth: 1120, margin: "0 auto", position: "relative" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 60 }}>
          {/* Info */}
          <div>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, color: "var(--accent)", fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", fontWeight: 600, marginBottom: 16 }}>
              <span style={{ width: 18, height: 1.5, background: "var(--gradient-1)", borderRadius: 1 }} />
              Contact
            </div>
            <h2 style={{ fontSize: "clamp(1.8rem, 4vw, 2.8rem)", fontWeight: 800, letterSpacing: "-0.03em", marginBottom: 12 }}>Get in Touch</h2>
            <p style={{ fontSize: 15, color: "var(--muted)", lineHeight: 1.7, marginBottom: 36 }}>
              Have a project in mind? Send me a message and let&apos;s talk about your business.
            </p>


          </div>

          {/* Form */}
          <div className="card-shine" style={{ background: "var(--card-bg)", border: "1px solid var(--card-border)", borderRadius: 18, padding: 32 }}>
            {status === "success" && (
              <div style={{ padding: "14px 18px", borderRadius: 12, background: "linear-gradient(135deg, rgba(34,197,94,0.1), rgba(16,185,129,0.1))", border: "1px solid rgba(34,197,94,0.2)", color: "#16a34a", fontSize: 14, marginBottom: 24, display: "flex", alignItems: "center", gap: 8 }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                Thanks! Your enquiry has been sent.
              </div>
            )}
            {status === "error" && (
              <div style={{ padding: "14px 18px", borderRadius: 12, background: "linear-gradient(135deg, rgba(239,68,68,0.1), rgba(220,38,38,0.1))", border: "1px solid rgba(239,68,68,0.2)", color: "#dc2626", fontSize: 14, marginBottom: 24 }}>
                {errorMessage}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
                <div>
                  <label style={{ display: "block", fontSize: 12, fontWeight: 600, marginBottom: 8, color: "var(--fg-soft)" }}>Name *</label>
                  <input type="text" name="name" required value={formData.name} onChange={handleChange} placeholder="Your name" style={inputStyle} onFocus={(e) => { e.target.style.borderColor = "var(--accent)"; e.target.style.boxShadow = "0 0 0 3px rgba(99,102,241,0.1)"; }} onBlur={(e) => { e.target.style.borderColor = "var(--line-strong)"; e.target.style.boxShadow = "none"; }} />
                </div>
                <div>
                  <label style={{ display: "block", fontSize: 12, fontWeight: 600, marginBottom: 8, color: "var(--fg-soft)" }}>Email *</label>
                  <input type="email" name="email" required value={formData.email} onChange={handleChange} placeholder="you@example.com" style={inputStyle} onFocus={(e) => { e.target.style.borderColor = "var(--accent)"; e.target.style.boxShadow = "0 0 0 3px rgba(99,102,241,0.1)"; }} onBlur={(e) => { e.target.style.borderColor = "var(--line-strong)"; e.target.style.boxShadow = "none"; }} />
                </div>
              </div>
              <div style={{ marginBottom: 16 }}>
                <label style={{ display: "block", fontSize: 12, fontWeight: 600, marginBottom: 8, color: "var(--fg-soft)" }}>Subject *</label>
                <input type="text" name="subject" required value={formData.subject} onChange={handleChange} placeholder="What should we build?" style={inputStyle} onFocus={(e) => { e.target.style.borderColor = "var(--accent)"; e.target.style.boxShadow = "0 0 0 3px rgba(99,102,241,0.1)"; }} onBlur={(e) => { e.target.style.borderColor = "var(--line-strong)"; e.target.style.boxShadow = "none"; }} />
              </div>
              <div style={{ marginBottom: 16 }}>
                <label style={{ display: "block", fontSize: 12, fontWeight: 600, marginBottom: 8, color: "var(--fg-soft)" }}>Message *</label>
                <textarea name="message" required rows={4} value={formData.message} onChange={handleChange} placeholder="Tell me about your project..." style={{ ...inputStyle, resize: "vertical" }} onFocus={(e) => { e.target.style.borderColor = "var(--accent)"; e.target.style.boxShadow = "0 0 0 3px rgba(99,102,241,0.1)"; }} onBlur={(e) => { e.target.style.borderColor = "var(--line-strong)"; e.target.style.boxShadow = "none"; }} />
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-glow"
                style={{
                  display: "inline-flex", alignItems: "center", gap: 8,
                  padding: "14px 28px", borderRadius: 12, fontSize: 14, fontWeight: 600,
                  background: "var(--gradient-1)", color: "#fff", border: "none", cursor: "pointer",
                  opacity: isSubmitting ? 0.6 : 1,
                  position: "relative", zIndex: 1,
                }}
              >
                {isSubmitting ? "Sending..." : "Send Enquiry →"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
