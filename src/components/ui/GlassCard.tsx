import React from "react";
import styles from "./GlassCard.module.css";

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "prominent" | "subtle" | "interactive";
}

export function GlassCard({
  children,
  className = "",
  variant = "default",
  ...props
}: GlassCardProps) {
  const variantClass = styles[variant] || styles.default;

  return (
    <div className={`${styles.card} ${variantClass} ${className}`} {...props}>
      <div className={styles.specularTop} />
      {children}
    </div>
  );
}
