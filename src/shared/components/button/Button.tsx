import Image from "next/image";
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
  rippleEffect?: boolean; // добавляем проп для управления рипплом
}

const Button = ({
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
  ref,
  rippleEffect = true, // по умолчанию риппл включен
}: ButtonProps) => {
  const handleMouseDown = (e: React.MouseEvent<HTMLButtonElement>) => {

    if (!rippleEffect) return; // если риппл отключен, не создаем эффект
    const btn = e.currentTarget;
    const rect = btn.getBoundingClientRect();

    const ripple = document.createElement("span");
    ripple.className = styles.ripple;
    ripple.style.left = `${e.clientX - rect.left - 30}px`;
    ripple.style.top = `${e.clientY - rect.top - 30}px`;

    btn.appendChild(ripple);
    ripple.addEventListener("animationend", () => ripple.remove());

    onMouseDown?.(e); // пробрасываем дальше если нужно
  };

  return (
    <button
      ref={ref}
      className={`${styles.button} ${className ?? ""}`}
      onClick={onClick}
      onMouseDown={handleMouseDown} // ← наш обработчик, не проп напрямую
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      disabled={disabled}
      type={type}
      style={style}
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
