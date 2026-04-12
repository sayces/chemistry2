import { useEffect, useState } from "react";
import styles from "./Column.module.scss";

interface ColumnProps {
  isActive?: boolean;
  activeColor: string;
  isPreviousActive?: boolean;
}

const Column = ({ isActive = false, activeColor, isPreviousActive = false }: ColumnProps) => {
  const [animationState, setAnimationState] = useState<"idle" | "active" | "reverting">("idle");

  useEffect(() => {
    if (isActive) {
      setAnimationState("active");
    } else if (isPreviousActive) {
      setAnimationState("reverting");
      
      const revertTimer = setTimeout(() => {
        setAnimationState("idle");
      }, 500);
      
      return () => clearTimeout(revertTimer);
    } else {
      setAnimationState("idle");
    }
  }, [isActive, isPreviousActive]);

  return (
    <div
      className={`${styles.column} ${activeColor} ${animationState === "active" ? styles.active : ""} ${animationState === "reverting" ? styles.reverting : ""}`}
    ></div>
  );
};

export default Column;
