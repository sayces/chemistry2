import Navigation from "./navigation/Navigation";
import Logo from "./logo/Logo";
import styles from "./Header.module.scss";

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.titleContainer}>
        <Logo />
      </div>

      <Navigation />
    </header>
  );
};

export default Header;
