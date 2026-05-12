import Image from "next/image";
import { useRef, useCallback } from "react";
import styles from "./Button.module.scss";

interface ButtonProps {
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
  ref?: React.Ref<HTMLButtonElement>;
  rippleEffect?: boolean;
}

const Button = ({
  onClick,
  onMouseDown,
  onHover,
  onLeave,
  disabled = false,
  className,
  type,
  img,
  children,
  alt,
  style,
  ref,
  rippleEffect = true,
}: ButtonProps) => {
  const btnRef = useRef<HTMLButtonElement | null>(null);

  // Эффект тряски для задизейбленной кнопки
  const triggerShake = useCallback(() => {
    const btn = btnRef.current;
    if (!btn) return;

    // Убираем класс если уже есть (для повторного клика)
    btn.classList.remove(styles.shake);

    // Небольшой reflow чтобы анимация сработала повторно
    void btn.offsetWidth;

    btn.classList.add(styles.shake);
    btn.addEventListener(
      "animationend",
      () => btn.classList.remove(styles.shake),
      { once: true },
    );
  }, []);

  const handleMouseDown = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (disabled) {
      triggerShake();
      return;
    }

    if (rippleEffect) {
      const btn = e.currentTarget;
      const rect = btn.getBoundingClientRect();

      const ripple = document.createElement("span");
      ripple.className = styles.ripple;
      ripple.style.left = `${e.clientX - rect.left - 30}px`;
      ripple.style.top = `${e.clientY - rect.top - 30}px`;

      btn.appendChild(ripple);
      ripple.addEventListener("animationend", () => ripple.remove(), {
        once: true,
      });
    }

    onMouseDown?.(e);
  };

  // Объединяем внешний ref и внутренний
  const setRef = useCallback(
    (node: HTMLButtonElement | null) => {
      btnRef.current = node;
      if (typeof ref === "function") {
        ref(node);
      } else if (ref) {
        (ref as React.MutableRefObject<HTMLButtonElement | null>).current =
          node;
      }
    },
    [ref],
  );

  return (
    <button
      ref={setRef}
      className={`${styles.button} ${disabled ? styles["is-disabled"] : ""} ${className ?? ""}`}
      onClick={!disabled ? onClick : undefined}
      onMouseDown={handleMouseDown}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      type={type}
      style={style}
      // aria для доступности
      aria-disabled={disabled}
    >
      {img && (
        <Image
          src={img}
          alt={alt ?? ""}
          loading="eager"
          width={20}
          height={20}
        />
      )}
      {children}
    </button>
  );
};

Button.displayName = "Button";
export default Button;
