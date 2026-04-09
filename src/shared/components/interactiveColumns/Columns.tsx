"use client";

import Column from "./Column";
import styles from "./columnsColors.module.scss";

const gradientClasses = [
  styles["calendarBg"],
  styles["mapBg"],
  styles["galleryBg"],
  styles["profileBg"],
];

const Columns = () => {
  return (
    <div className="flex justify-center items-center gap-[20px] h-screen absolute">
      {gradientClasses.map((color, index) => (
        <Column
          key={index}
          defaultColor={color}
          isActive={false}
          onClick={() => {}}
        />
      ))}
    </div>
  );
};

export default Columns;
