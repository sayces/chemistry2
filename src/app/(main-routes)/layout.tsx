"use client";

import Header from "@/shared/components/header/Header";
import Columns from "@/shared/components/interactiveColumns/Columns";
import styles from "./MainRoutesLayout.module.scss";

const MainRoutesLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className={styles.layoutWrapper}>
      <Header />
      <Columns />
      {children}
    </div>
  );
};

export default MainRoutesLayout;
