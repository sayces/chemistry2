import styles from "./columnsColors.module.scss";

const classNames = {
  column:
    "w-[30px] h-screen transition-all duration-200 relative cursor-pointer",
  defaultBg: styles.defaultBg,
};

interface ColumnProps {
  isActive?: boolean;
  defaultColor: string;
  onClick: () => void;
}

const Column = ({ isActive = false, defaultColor, onClick }: ColumnProps) => {
  return (
    <div
      onClick={onClick}
      className={`${classNames.column} ${isActive ? defaultColor : styles.defaultBg}`}
    ></div>
  );
};

export default Column;
