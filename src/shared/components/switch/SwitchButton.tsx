import { useState } from "react";
import styles from "./SwitchButton.module.scss";
import Button from "../button/Button";

interface SwitchProps {
  isActive: boolean;
  children: React.ReactNode;
  onClick?: () => void;
}

const SwitchButton = ({
  isActive = false,
  onClick,
  children,
}: SwitchProps) => {
  const [localChecked, setLocalChecked] = useState(isActive);

  const handleChange = () => {
    setLocalChecked((localChecked) => !localChecked);
    onClick?.();
  };

  return (
    <Button
      className={`${styles.switchWrapper} ${localChecked ? styles.active : ""}`}
      onClick={handleChange}
    >
      {children}
    </Button>
  );
};

export default SwitchButton;
