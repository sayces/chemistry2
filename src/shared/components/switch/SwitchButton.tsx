import { useState } from "react";
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

  const handleChange = () => {
    setLocalChecked((prev) => !prev);
    onClick?.();
  };

  return (
    <Button
      className={`${styles.switchWrapper} ${localChecked ? styles.active : ""}`}
      onClick={handleChange}
    >
      <span className={styles.dot} />
      <Typography as="label" size="14">
        {children}
      </Typography>
    </Button>
  );
};

export default SwitchButton;
