"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import styles from "./ReviewsSection.module.css";

interface Review {
  id: string;
  name: string;
  rating: number;
  title: string;
  content: string;
  projectRef: string | null;
  createdAt: string;
}

export function ReviewsSection() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({ name: "", rating: "5", title: "", content: "" });
  const [hoverRating, setHoverRating] = useState(0);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const abortRef = useRef<AbortController | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    abortRef.current = controller;

    async function load() {
      try {
        const res = await fetch("/api/reviews?limit=12", { signal: controller.signal });
        const data = await res.json();
        if (data.success) setReviews(data.data);
      } catch {
        if (!controller.signal.aborted) { /* ignore */ }
      }
      setLoading(false);
    }

    load();
    return () => controller.abort();
  }, []);

  const fetchReviews = useCallback(async () => {
    try {
      const res = await fetch("/api/reviews?limit=12");
      const data = await res.json();
      if (data.success) setReviews(data.data);
    } catch { /* ignore */ }
    setLoading(false);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus("idle");
    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, rating: parseInt(formData.rating, 10) }),
      });
      if (res.ok) {
        setStatus("success");
        setFormData({ name: "", rating: "5", title: "", content: "" });
        await fetchReviews();
      } else {
        const data = await res.json();
        setStatus("error");
        setErrorMessage(data.message || "Failed to submit.");
      }
    } catch {
      setStatus("error");
      setErrorMessage("Network error.");
    }
    setIsSubmitting(false);
  };

  const displayRating = hoverRating || parseInt(formData.rating, 10);

  return (
    <section id="reviews" className={styles.section}>
      <div className="container">
        <div className={styles.header}>
          <span className="section-label">Reviews</span>
          <h2 className={styles.title}>What Clients Say</h2>
          <p className={styles.subtitle}>Honest feedback from people I&apos;ve worked with.</p>
        </div>

        <div className={styles.grid}>
          {loading ? (
            <div className={styles.empty}>Loading reviews...</div>
          ) : reviews.length === 0 ? (
            <div className={styles.emptyState}>
              <div className={styles.emptyIcon}>
                <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
              </div>
              <p className={styles.emptyText}>Be the first to share your experience.</p>
            </div>
          ) : (
            reviews.map((review) => (
              <div key={review.id} className={styles.card}>
                <div className={styles.stars}>
                  {Array.from({ length: 5 }).map((_, i) => (
                    <span key={i} className={i < review.rating ? styles.starFilled : styles.starEmpty}>&#9733;</span>
                  ))}
                </div>
                <h4 className={styles.cardTitle}>{review.title}</h4>
                <p className={styles.cardContent}>&ldquo;{review.content}&rdquo;</p>
                <div className={styles.reviewer}>
                  <div className={styles.avatar}>{review.name.charAt(0).toUpperCase()}</div>
                  <div>
                    <strong className={styles.name}>{review.name}</strong>
                    <time className={styles.date}>{new Date(review.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</time>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        <div className={styles.formCard} id="write-review">
          <h3 className={styles.formTitle}>Write a Review</h3>
          <p className={styles.formSubtitle}>Share your experience working with me.</p>

          {status === "success" && (
            <div className={styles.successMsg}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
              Thanks! Your review is now visible.
            </div>
          )}
          {status === "error" && <div className={styles.errorMsg}>{errorMessage}</div>}

          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.formRow}>
              <div className={styles.field}>
                <label htmlFor="rw-name">Name</label>
                <input type="text" id="rw-name" name="name" required value={formData.name} onChange={handleChange} placeholder="Your name" />
              </div>
              <div className={styles.field}>
                <label htmlFor="rw-rating">Rating</label>
                <div className={styles.starPicker}>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      className={`${styles.starBtn} ${star <= displayRating ? styles.starBtnActive : ""}`}
                      onClick={() => setFormData((prev) => ({ ...prev, rating: String(star) }))}
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                      aria-label={`${star} star${star > 1 ? "s" : ""}`}
                    >
                      &#9733;
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <div className={styles.field}>
              <label htmlFor="rw-title">Review Title</label>
              <input type="text" id="rw-title" name="title" required value={formData.title} onChange={handleChange} placeholder="Great work!" />
            </div>
            <div className={styles.field}>
              <label htmlFor="rw-content">Your Review</label>
              <textarea id="rw-content" name="content" required rows={4} value={formData.content} onChange={handleChange} placeholder="Share your experience..." />
            </div>
            <button type="submit" disabled={isSubmitting} className="btn-accent">
              {isSubmitting ? "Submitting..." : "Submit Review"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
