"use client";

import Navigation from "./navigation/Navigation";
import Logo from "./logo/Logo";
import styles from "./Header.module.scss";

const Header = () => {
  return (
    <header className={styles.header}>
      <Logo className={styles.logo}/>
      <Navigation />
    </header>
  );
};

export default Header;
