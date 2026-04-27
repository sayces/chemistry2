'use client';

import { forwardRef } from "react";
import Image from "next/image";
import styles from "./Button.module.scss";

interface ButtonProps {
  text?: string;
  onClick?: () => void;
  onMouseDown?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  onHover?: () => void;
  onLeave?: () => void;
  disabled?: boolean;
  className?: string;
  type?: "button" | "submit" | "reset";
  img?: string;
  children?: React.ReactNode;
  alt?: string;
  style?: React.CSSProperties;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(({
  text,
  onClick,
  onMouseDown,
  onHover,
  onLeave,
  disabled,
  className,
  type,
  img,
  children,
  alt,
  style,
}, ref) => {
  return (
    <button
      ref={ref}
      className={`${styles.button} ${className ?? ""}`}
      onClick={onClick}
      onMouseDown={onMouseDown}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      disabled={disabled}
      type={type}
      style={style}
    >
      {img && <Image src={img} alt={alt ?? ""} loading="eager" width={20} height={20} />}
      {text && <p className={styles.label}>{text}</p>}
      {children}
    </button>
  );
});

Button.displayName = "Button";
export default Button;