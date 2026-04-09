import type { Metadata } from "next";
import Header from "@/shared/components/header/Header";
import Columns from "@/shared/components/interactiveColumns/Columns";
import HomePage from "./page";

export const metadata: Metadata = {
  title: "Chemistry",
  description: "Home page",
};

const HomeLayout = () => {
  return (
    <>
      <Header />
      <Columns />
      <HomePage />
    </>
  );
};

export default HomeLayout;
