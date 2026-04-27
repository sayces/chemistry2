import { useState, useRef } from "react";
import styles from "./SwitchButton.module.scss";
import Button from "../button/Button";
import Typography from "../typography/Typography";

interface SwitchProps {
  isActive: boolean;
  children: React.ReactNode;
  onClick?: () => void;
}

const SwitchButton = ({ isActive = false, onClick, children }: SwitchProps) => {
  const [localChecked, setLocalChecked] = useState(isActive);
  const btnRef = useRef<HTMLButtonElement>(null);

  const handleChange = () => {
    setLocalChecked((prev) => !prev);
    onClick?.();
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLButtonElement>) => {
    const btn = btnRef.current;
    if (!btn) return;

    const rect = btn.getBoundingClientRect();
    const ripple = document.createElement("span");
    ripple.className = styles.ripple;
    ripple.style.left = `${e.clientX - rect.left - 30}px`;
    ripple.style.top = `${e.clientY - rect.top - 30}px`;

    btn.appendChild(ripple);
    ripple.addEventListener("animationend", () => ripple.remove());
  };

  return (
    <Button
      ref={btnRef}
      className={`${styles.switchWrapper} ${localChecked ? styles.active : ""}`}
      onClick={handleChange}
      onMouseDown={handleMouseDown}
    >
      <span className={styles.dot} />
      <Typography as="label" size="14">
        {children}
      </Typography>
    </Button>
  );
};

export default SwitchButton;
