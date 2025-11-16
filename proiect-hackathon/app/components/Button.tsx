import React from "react";
import styles from "./.Button.module.css";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "ghost" | "destructive";
  size?: "default" | "sm" | "lg" | "icon";
  children: React.ReactNode;
}

export function Button({ variant = "default", size = "default", className = "", children, ...props }: ButtonProps) {
  const variantClass = styles[variant] || "";
  const sizeClass = styles[size] || "";

  return (
    <button className={`${styles.button} ${variantClass} ${sizeClass} ${className}`} {...props}>
      {children}
    </button>
  );
}
