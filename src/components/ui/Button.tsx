import React from "react";
import styles from "./Button.module.css";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: "primary" | "glass" | "subtle" | "glow";
  size?: "sm" | "md" | "lg";
  className?: string;
  icon?: React.ReactNode;
}

export function Button({
  children,
  variant = "glass",
  size = "md",
  className = "",
  icon,
  ...props
}: ButtonProps) {
  const variantClass = styles[variant] || styles.glass;
  const sizeClass = styles[size] || styles.md;

  return (
    <button
      className={`${styles.button} ${variantClass} ${sizeClass} ${className}`}
      {...props}
    >
      {icon && <span className={styles.icon}>{icon}</span>}
      <span>{children}</span>
    </button>
  );
}
