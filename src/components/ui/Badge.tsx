import React from "react";
import styles from "./Badge.module.css";

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  children: React.ReactNode;
  variant?: "default" | "primary" | "cyan" | "emerald" | "amber";
  dot?: boolean;
  className?: string;
}

export function Badge({
  children,
  variant = "default",
  dot = false,
  className = "",
  ...props
}: BadgeProps) {
  const variantClass = styles[variant] || styles.default;

  return (
    <span className={`${styles.badge} ${variantClass} ${className}`} {...props}>
      {dot && <span className={styles.dot} />}
      {children}
    </span>
  );
}
