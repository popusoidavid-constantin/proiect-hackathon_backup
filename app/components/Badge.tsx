import React from "react";
import styles from "./.Badge.module.css";

interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "secondary" | "destructive" | "outline";
  children: React.ReactNode;
}

export function Badge({ variant = "default", className = "", children, ...props }: BadgeProps) {
  const variantClass = styles[variant] || "";

  return (
    <div className={`${styles.badge} ${variantClass} ${className}`} {...props}>
      {children}
    </div>
  );
}
