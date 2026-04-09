import Link from "next/link";
import Button from "../../button/Button";
import { calendarIcon } from "@/shared/assets/icons/calendar";
import { mapIcon } from "@/shared/assets/icons/map";
import { galleryIcon } from "@/shared/assets/icons/gallery";
import { profileIcon } from "@/shared/assets/icons/profile";
import styles from "./Navigation.module.scss";

const Navigation = () => {
  const navItems = [
    { icon: calendarIcon, alt: "calendar", href: "/calendar" },
    { icon: mapIcon, alt: "map", href: "/map" },
    { icon: galleryIcon, alt: "gallery", href: "/gallery" },
    { icon: profileIcon, alt: "profile", href: "/profile" },
  ];

  return (
    <nav className={styles.nav}>
      <ul className={styles.ul}>
        {navItems.map((item) => (
          <li key={item.alt}>
            <Link href={item.href}>
              <Button
                img={item.icon}
                alt={item.alt}
                className={styles.navButton}
              />
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navigation;
