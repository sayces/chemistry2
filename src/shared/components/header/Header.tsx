"use client";

import Navigation from "./navigation/Navigation";
import Logo from "./logo/Logo";
import styles from "./Header.module.scss";
import { usePathname } from "next/navigation";
import HomeButton from "./homeButton/HomeButton";
import { usePlatformStore } from "@/entities/store/usePlatformStore";

const Header = () => {
  const { isMobile } = usePlatformStore();

  const pathname = usePathname();
  const isHomePage = pathname === "/";

  const showLogo = isHomePage || !isMobile;

  return (
    <header className={styles.header}>
      {/* 1-я колонка — всегда существует */}
      <div>{showLogo ? <Logo className={styles.logo} /> : <HomeButton />}</div>

      {/* 2-я колонка — всегда по центру */}
      <Navigation />

      {/* 3-я колонка — пустой placeholder */}
      <div />
    </header>
  );
};

export default Header;
