"use client";

import React, { useState, useEffect, useCallback } from "react";

interface Review {
  id: string;
  name: string;
  rating: number;
  title: string;
  content: string;
  projectRef: string | null;
  approved: boolean;
  featured: boolean;
  createdAt: string;
}

interface Enquiry {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  subject: string;
  message: string;
  projectType: string | null;
  budget: string | null;
  status: string;
  createdAt: string;
}

export default function AdminPage() {
  const [password, setPassword] = useState("");
  const [authenticated, setAuthenticated] = useState(false);
  const [tab, setTab] = useState<"reviews" | "enquiries">("reviews");
  const [reviews, setReviews] = useState<Review[]>([]);
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const login = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      if (res.ok) {
        setAuthenticated(true);
        loadData();
      } else {
        setError("Invalid password.");
      }
    } catch {
      setError("Connection error.");
    }
    setLoading(false);
  };

  const loadData = useCallback(async () => {
    setLoading(true);
    try {
      const [revRes, enqRes] = await Promise.all([
        fetch("/api/reviews?all=true"),
        fetch("/api/enquiry/list"),
      ]);
      if (revRes.ok) {
        const revData = await revRes.json();
        setReviews(revData.data || []);
      }
      if (enqRes.ok) {
        const enqData = await enqRes.json();
        setEnquiries(enqData.data || []);
      }
    } catch {
      setError("Failed to load data.");
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    if (authenticated) loadData();
  }, [authenticated, loadData]);

  const deleteReview = async (id: string) => {
    if (!confirm("Delete this review?")) return;
    try {
      const res = await fetch(`/api/reviews?id=${id}`, { method: "DELETE" });
      if (res.ok) setReviews((prev) => prev.filter((r) => r.id !== id));
    } catch {
      setError("Failed to delete review.");
    }
  };

  const deleteEnquiry = async (id: string) => {
    if (!confirm("Delete this enquiry?")) return;
    try {
      const res = await fetch(`/api/enquiry?id=${id}`, { method: "DELETE" });
      if (res.ok) setEnquiries((prev) => prev.filter((e) => e.id !== id));
    } catch {
      setError("Failed to delete enquiry.");
    }
  };

  if (!authenticated) {
    return (
      <div style={{ minHeight: "80vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "24px" }}>
        <div style={{ maxWidth: "360px", width: "100%" }}>
          <h1 style={{ fontSize: "24px", fontWeight: 600, marginBottom: "8px" }}>Admin</h1>
          <p style={{ color: "#6b6a63", fontSize: "14px", marginBottom: "24px" }}>Enter owner password to access.</p>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && login()}
            placeholder="Password"
            style={{ width: "100%", padding: "12px 16px", border: "1px solid rgba(23,23,20,.14)", borderRadius: "8px", fontSize: "14px", marginBottom: "12px", outline: "none", background: "#faf8f4" }}
          />
          {error && <p style={{ color: "#ef4444", fontSize: "13px", marginBottom: "12px" }}>{error}</p>}
          <button
            onClick={login}
            disabled={loading}
            style={{ width: "100%", padding: "12px", background: "#171714", color: "#f4f1eb", border: "none", borderRadius: "999px", fontSize: "13px", fontWeight: 500, cursor: "pointer" }}
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ padding: "40px 24px", maxWidth: "1100px", margin: "0 auto" }}>
      <h1 style={{ fontSize: "28px", fontWeight: 600, marginBottom: "8px" }}>Admin Dashboard</h1>
      <p style={{ color: "#6b6a63", fontSize: "14px", marginBottom: "32px" }}>
        {reviews.length} reviews · {enquiries.length} enquiries
      </p>

      {/* Tabs */}
      <div style={{ display: "flex", gap: "4px", marginBottom: "32px", borderBottom: "1px solid rgba(23,23,20,.14)", paddingBottom: "0" }}>
        {(["reviews", "enquiries"] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            style={{
              padding: "10px 20px", background: "none", border: "none", borderBottom: tab === t ? "2px solid #171714" : "2px solid transparent",
              fontSize: "14px", fontWeight: tab === t ? 600 : 400, color: tab === t ? "#171714" : "#6b6a63", cursor: "pointer", textTransform: "capitalize",
            }}
          >
            {t}
          </button>
        ))}
      </div>

      {error && <p style={{ color: "#ef4444", fontSize: "13px", marginBottom: "16px" }}>{error}</p>}

      {tab === "reviews" && (
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          {reviews.length === 0 && <p style={{ color: "#6b6a63" }}>No reviews yet.</p>}
          {reviews.map((r) => (
            <div key={r.id} style={{ padding: "20px", border: "1px solid rgba(23,23,20,.14)", borderRadius: "12px", background: "#faf8f4" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "8px" }}>
                <div>
                  <strong style={{ fontSize: "14px" }}>{r.name}</strong>
                  <span style={{ marginLeft: "8px", fontSize: "12px", color: "#6b6a63" }}>{"★".repeat(r.rating)}</span>
                  {!r.approved && <span style={{ marginLeft: "8px", fontSize: "11px", color: "#b8860b", background: "rgba(184,134,11,.08)", padding: "2px 8px", borderRadius: "999px" }}>pending</span>}
                </div>
                <button onClick={() => deleteReview(r.id)} style={{ padding: "4px 12px", background: "rgba(239,68,68,.06)", border: "1px solid rgba(239,68,68,.15)", borderRadius: "6px", color: "#ef4444", fontSize: "12px", cursor: "pointer" }}>
                  Delete
                </button>
              </div>
              <p style={{ fontSize: "14px", fontWeight: 500, marginBottom: "4px" }}>{r.title}</p>
              <p style={{ fontSize: "13px", color: "#6b6a63", marginBottom: "8px" }}>{r.content}</p>
              <p style={{ fontSize: "11px", color: "#9a9890" }}>{new Date(r.createdAt).toLocaleDateString()}</p>
            </div>
          ))}
        </div>
      )}

      {tab === "enquiries" && (
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          {enquiries.length === 0 && <p style={{ color: "#6b6a63" }}>No enquiries yet.</p>}
          {enquiries.map((e) => (
            <div key={e.id} style={{ padding: "20px", border: "1px solid rgba(23,23,20,.14)", borderRadius: "12px", background: "#faf8f4" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "8px" }}>
                <div>
                  <strong style={{ fontSize: "14px" }}>{e.name}</strong>
                  <span style={{ marginLeft: "8px", fontSize: "12px", color: "#6b6a63" }}>{e.email}</span>
                  {e.phone && <span style={{ marginLeft: "8px", fontSize: "12px", color: "#6b6a63" }}>{e.phone}</span>}
                </div>
                <button onClick={() => deleteEnquiry(e.id)} style={{ padding: "4px 12px", background: "rgba(239,68,68,.06)", border: "1px solid rgba(239,68,68,.15)", borderRadius: "6px", color: "#ef4444", fontSize: "12px", cursor: "pointer" }}>
                  Delete
                </button>
              </div>
              <p style={{ fontSize: "14px", fontWeight: 500, marginBottom: "4px" }}>{e.subject}</p>
              <p style={{ fontSize: "13px", color: "#6b6a63", marginBottom: "8px" }}>{e.message}</p>
              <div style={{ display: "flex", gap: "12px", fontSize: "11px", color: "#9a9890" }}>
                <span>{e.projectType || "—"}</span>
                <span>{e.budget || "—"}</span>
                <span>{new Date(e.createdAt).toLocaleDateString()}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
