"use client";

import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { getPlanById } from "@/data/plans";
import styles from "./page.module.css";

const PLAN_LABELS: Record<string, string> = { basic: "Basic", medium: "Medium", high: "High" };

function ContactInner() {
  const searchParams = useSearchParams();
  const planParam = searchParams.get("plan");
  const plan = planParam ? getPlanById(planParam) : undefined;

  const [formData, setFormData] = useState({
    name: "",
    businessName: "",
    email: "",
    phone: "",
    plan: plan?.name || "",
    message: "",
  });

  useEffect(() => {
    if (plan) {
      setFormData((prev) => ({ ...prev, plan: plan.name }));
    }
  }, [plan]);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setStatus("error");
      setErrorMessage("Please fill out all required fields.");
      return;
    }
    setIsSubmitting(true);
    setStatus("idle");
    try {
      const payload: Record<string, string> = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        subject: `Plan Enquiry: ${formData.plan || "Not specified"}`,
        projectType: "Business Website",
        message: formData.businessName
          ? `Business: ${formData.businessName}\n\n${formData.message}`
          : formData.message,
      };
      if (formData.plan) payload.plan = formData.plan;
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setStatus("success");
        setFormData({ name: "", businessName: "", email: "", phone: "", plan: formData.plan, message: "" });
      } else {
        setStatus("error");
        setErrorMessage(data.message || "Something went wrong. Please try again.");
      }
    } catch {
      setStatus("error");
      setErrorMessage("Network error. Please try again.");
    }
    setIsSubmitting(false);
  };

  return (
    <div className={styles.pageWrapper}>
      <div className="container">
        <div className={styles.topNav}>
          <Link href="/#plans" className={styles.backLink}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>
            <span>Back to Plans</span>
          </Link>
        </div>

        <div className={styles.contentGrid}>
          <div className={styles.infoCol}>
            <span className="section-label">Enquiry</span>
            <h1 className={styles.title}>Let&apos;s build something for your business.</h1>

            {plan && (
              <div className={styles.planSummary}>
                <div className={styles.planBadge}>
                  <span className={styles.planBadgeDot} />
                  Selected Plan
                </div>
                <h2 className={styles.planName}>{plan.name}</h2>
                <p className={styles.planTagline}>{plan.tagline}</p>
                <ul className={styles.planFeatures}>
                  {plan.features.slice(0, 5).map((f, i) => (
                    <li key={i}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                      {f}
                    </li>
                  ))}
                </ul>
                <Link href="/#plans" className={styles.changePlan}>Change plan</Link>
              </div>
            )}

            <div className={styles.directLinks}>
              <a href="https://wa.me/917670860094?text=Hi%2C%20I%20need%20to%20connect%20with%20you." target="_blank" rel="noreferrer" className={styles.contactLink}>
                <span className={styles.contactIcon}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>
                </span>
                WhatsApp
              </a>
              <a href="https://github.com/kovvurujavidh" target="_blank" rel="noreferrer" className={styles.contactLink}>
                <span className={styles.contactIcon}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg>
                </span>
                GitHub
              </a>
            </div>
          </div>

          <div className={styles.formCard}>
            {status === "success" && (
              <div className={styles.successMsg}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                Thanks! Your enquiry has been sent. I&apos;ll get back to you shortly.
              </div>
            )}
            {status === "error" && <div className={styles.errorMsg}>{errorMessage}</div>}

            <form onSubmit={handleSubmit} className={styles.form}>
              <div className={styles.formRow}>
                <div className={styles.field}>
                  <label htmlFor="c-name">Name *</label>
                  <input type="text" id="c-name" name="name" required value={formData.name} onChange={handleChange} placeholder="Your name" />
                </div>
                <div className={styles.field}>
                  <label htmlFor="c-business">Business Name</label>
                  <input type="text" id="c-business" name="businessName" value={formData.businessName} onChange={handleChange} placeholder="Your business name" />
                </div>
              </div>
              <div className={styles.formRow}>
                <div className={styles.field}>
                  <label htmlFor="c-email">Email *</label>
                  <input type="email" id="c-email" name="email" required value={formData.email} onChange={handleChange} placeholder="you@example.com" />
                </div>
                <div className={styles.field}>
                  <label htmlFor="c-phone">Phone / WhatsApp</label>
                  <input type="tel" id="c-phone" name="phone" value={formData.phone} onChange={handleChange} placeholder="+91 000 000 0000" />
                </div>
              </div>
              <div className={styles.field}>
                <label htmlFor="c-plan">Selected Plan</label>
                <select id="c-plan" name="plan" value={formData.plan} onChange={handleChange}>
                  <option value="">None</option>
                  <option>Basic</option>
                  <option>Medium</option>
                  <option>High</option>
                </select>
              </div>
              <div className={styles.field}>
                <label htmlFor="c-message">Message *</label>
                <textarea id="c-message" name="message" required rows={4} value={formData.message} onChange={handleChange} placeholder="Tell me about your project..." />
              </div>
              <button type="submit" disabled={isSubmitting} className="btn-accent">
                {isSubmitting ? (
                  <>
                    <svg className={styles.spinner} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/></svg>
                    Sending...
                  </>
                ) : "Send Enquiry →"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ContactPage() {
  return (
    <Suspense fallback={<div className={styles.pageWrapper}><div className="container"><div className={styles.loading}>Loading...</div></div></div>}>
      <ContactInner />
    </Suspense>
  );
}
