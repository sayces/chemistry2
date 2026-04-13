'use client';

import Image from "next/image";
import styles from "./Button.module.scss";

interface ButtonProps {
  text?: string;
  onClick?: () => void;
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

const Button = ({
  text,
  onClick,
  onHover,
  onLeave,
  disabled,
  className,
  type,
  img,
  children,
  alt,
  style,
}: ButtonProps) => {

  const onClickHandler = () => {
    onClick?.()
  }

  const onMouseEnterHandler = () => {
    onHover?.()
  }

  const onMouseLeaveHandler = () => {
    onLeave?.()
  }

  return (
    <button
      className={`${styles.button} ${className}`}
      onClick={onClickHandler}
      onMouseEnter={onMouseEnterHandler}
      onMouseLeave={onMouseLeaveHandler}
      disabled={disabled}
      type={type}
      style={style}
    >
      {img && <Image src={img} alt={alt || ""} width={20} height={20} />}
      {text && <p className={styles.label}>{text}</p>}
      {children}
    </button>
  );
};

export default Button;
