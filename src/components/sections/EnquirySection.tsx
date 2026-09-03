"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import styles from "./EnquirySection.module.css";

const PLAN_LABELS: Record<string, string> = { basic: "Basic", medium: "Medium", high: "High" };

export function EnquirySection() {
  return (
    <React.Suspense fallback={<section id="contact" className={styles.section}><div className="container"><div className={styles.grid}><div className={styles.info} /><div className={styles.formCard} /></div></div></section>}>
      <EnquiryInner />
    </React.Suspense>
  );
}

function EnquiryInner() {
  const searchParams = useSearchParams();
  const planParam = searchParams.get("plan");

  const [formData, setFormData] = useState({
    name: "", email: "", phone: "", subject: "", projectType: "Business Website", budget: "", plan: "", message: "",
  });

  useEffect(() => {
    if (planParam && PLAN_LABELS[planParam]) {
      setFormData((prev) => ({ ...prev, plan: PLAN_LABELS[planParam] }));
    }
  }, [planParam]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (name === "budget") {
      const numeric = value.replace(/[^0-9]/g, "");
      setFormData((prev) => ({ ...prev, budget: numeric }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const formatINR = (value: string) => {
    if (!value) return "";
    const num = parseInt(value, 10);
    if (isNaN(num)) return "";
    return num.toLocaleString("en-IN");
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
      const { plan: selectedPlan, ...rest } = formData;
      const payload: Record<string, string> = { ...rest };
      if (payload.budget) {
        payload.budget = `₹${formatINR(payload.budget)}`;
      }
      if (selectedPlan) payload.plan = selectedPlan;
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setStatus("success");
        setFormData({ name: "", email: "", phone: "", subject: "", projectType: "Business Website", budget: "", plan: "", message: "" });
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
    <section id="contact" className={styles.section}>
      <div className="container">
        <div className={styles.grid}>
          <div className={styles.info}>
            <span className="section-label" style={{ color: "var(--accent-light)" }}>Contact</span>
            <h2 className={styles.title}>Get in Touch</h2>
            <p className={styles.desc}>Have a project in mind? Send me a message and let&apos;s talk about your business.</p>

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
            {status === "success" && <div className={styles.successMsg}>Thanks! Your enquiry has been sent. I&apos;ll get back to you shortly.</div>}
            {status === "error" && <div className={styles.errorMsg}>{errorMessage}</div>}

            <form onSubmit={handleSubmit} className={styles.form}>
              <div className={styles.formRow}>
                <div className={styles.field}>
                  <label htmlFor="e-name">Name *</label>
                  <input type="text" id="e-name" name="name" required value={formData.name} onChange={handleChange} placeholder="Your name" />
                </div>
                <div className={styles.field}>
                  <label htmlFor="e-email">Email *</label>
                  <input type="email" id="e-email" name="email" required value={formData.email} onChange={handleChange} placeholder="you@example.com" />
                </div>
              </div>
              <div className={styles.formRow}>
                <div className={styles.field}>
                  <label htmlFor="e-phone">Phone</label>
                  <input type="tel" id="e-phone" name="phone" value={formData.phone} onChange={handleChange} placeholder="+91 000 000 0000" />
                </div>
                <div className={styles.field}>
                  <label htmlFor="e-subject">Subject *</label>
                  <input type="text" id="e-subject" name="subject" required value={formData.subject} onChange={handleChange} placeholder="What should we build?" />
                </div>
              </div>
              <div className={styles.formRow}>
                <div className={styles.field}>
                  <label htmlFor="e-type">Project Type</label>
                  <select id="e-type" name="projectType" value={formData.projectType} onChange={handleChange}>
                    <option>Business Website</option>
                    <option>Landing Page</option>
                    <option>Custom Web Application</option>
                    <option>Other</option>
                  </select>
                </div>
                <div className={styles.field}>
                  <label htmlFor="e-plan">Selected Plan</label>
                  <select id="e-plan" name="plan" value={formData.plan} onChange={handleChange}>
                    <option value="">None</option>
                    <option>Basic</option>
                    <option>Medium</option>
                    <option>High</option>
                  </select>
                </div>
              </div>
              <div className={styles.field}>
                <label htmlFor="e-budget">Project Budget</label>
                <div className={styles.inrInput}>
                  <span className={styles.inrSymbol}>₹</span>
                  <input
                    type="text"
                    id="e-budget"
                    name="budget"
                    inputMode="numeric"
                    value={formatINR(formData.budget)}
                    onChange={handleChange}
                    placeholder="Enter approximate budget"
                  />
                </div>
                <span className={styles.fieldHint}>An approximate range helps me understand the project scope.</span>
              </div>
              <div className={styles.field}>
                <label htmlFor="e-message">Message *</label>
                <textarea id="e-message" name="message" required rows={4} value={formData.message} onChange={handleChange} placeholder="Tell me about your project..." />
              </div>
              <button type="submit" disabled={isSubmitting} className="btn-accent">
                {isSubmitting ? (
                  <>
                    <svg className={styles.spinner} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/></svg>
                    Sending...
                  </>
                ) : "Send Enquiry"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
