interface Review {
  id: string;
  name: string;
  email: string | null;
  rating: number;
  title: string;
  content: string;
  projectRef: string | null;
  featured: boolean;
  approved: boolean;
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
  timeline: string | null;
  plan: string | null;
  telegramNotified: boolean;
  createdAt: string;
}

let reviews: Review[] = [];
let enquiries: Enquiry[] = [];

function genId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
}

export const store = {
  reviews: {
    create(data: Omit<Review, "id" | "createdAt">) {
      const review: Review = { ...data, id: genId(), createdAt: new Date().toISOString() };
      reviews.unshift(review);
      return review;
    },
    findMany(opts?: { approved?: boolean; featured?: boolean; limit?: number }) {
      let result = [...reviews];
      if (opts?.approved !== undefined) result = result.filter((r) => r.approved === opts.approved);
      if (opts?.featured !== undefined) result = result.filter((r) => r.featured === opts.featured);
      result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      return result.slice(0, opts?.limit ?? 50);
    },
    delete(id: string) {
      reviews = reviews.filter((r) => r.id !== id);
    },
  },
  enquiries: {
    create(data: Omit<Enquiry, "id" | "createdAt" | "telegramNotified">) {
      const enquiry: Enquiry = { ...data, id: genId(), telegramNotified: false, createdAt: new Date().toISOString() };
      enquiries.unshift(enquiry);
      return enquiry;
    },
    findMany(opts?: { limit?: number }) {
      return [...enquiries]
        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        .slice(0, opts?.limit ?? 50);
    },
    update(id: string, data: Partial<Enquiry>) {
      const idx = enquiries.findIndex((e) => e.id === id);
      if (idx !== -1) enquiries[idx] = { ...enquiries[idx], ...data };
    },
    delete(id: string) {
      enquiries = enquiries.filter((e) => e.id !== id);
    },
  },
};