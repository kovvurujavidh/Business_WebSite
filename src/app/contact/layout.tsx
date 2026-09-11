import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact — LocalBizz",
  description: "Get in touch with LocalBizz. Send an enquiry about your website project, discuss plans, or connect via WhatsApp.",
  openGraph: {
    title: "Contact — LocalBizz",
    description: "Get in touch with LocalBizz. Send an enquiry about your website project.",
    url: "https://localbizz.dpdns.org/contact",
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}