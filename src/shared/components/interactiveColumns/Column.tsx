import { useEffect, useState } from "react";
import styles from "./Column.module.scss";

interface ColumnProps {
  isActive?: boolean;
  activeColor: string;
}

const Column = ({ isActive = false, activeColor }: ColumnProps) => {
  const [shouldAnimate, setShouldAnimate] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShouldAnimate(isActive);
    }, isActive ? 0 : 50);

    return () => clearTimeout(timer);
  }, [isActive]);

  return (
    <div
      className={`${styles.column} ${activeColor} ${shouldAnimate ? styles.active : ""}`}
    ></div>
  );
};

export default Column;
