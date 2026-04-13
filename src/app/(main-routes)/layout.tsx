"use client";

import Header from "@/shared/components/header/Header";
import Columns from "@/shared/components/interactiveColumns/Columns";

const MainRoutesLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Header />
      <Columns />
      {children}
    </>
  );
};

export default MainRoutesLayout;
