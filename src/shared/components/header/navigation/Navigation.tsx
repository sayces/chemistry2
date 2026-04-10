"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Button from "../../button/Button";
import { calendarIcon } from "@/shared/assets/icons/calendar";
import { mapIcon } from "@/shared/assets/icons/map";
import { galleryIcon } from "@/shared/assets/icons/gallery";
import { profileIcon } from "@/shared/assets/icons/profile";
import {
  useNavigationStore,
  navItems,
  NavItemId,
} from "@/shared/store/useNavigationStore";
import styles from "./Navigation.module.scss";

const iconMap = {
  calendar: calendarIcon,
  map: mapIcon,
  gallery: galleryIcon,
  profile: profileIcon,
};

const colorFilterMap: Record<NavItemId, string> = {
  calendar: "drop-shadow(0 0 2px #e06161)",
  map: "drop-shadow(0 0 2px #e1ffd8)",
  gallery: "drop-shadow(0 0 2px #a4678c)",
  profile: "drop-shadow(0 0 2px #b5b5b5)",
};

const defaultFilter = "drop-shadow(0 0 2px #ffffff50)";

const Navigation = () => {
  const pathname = usePathname();
  const { hoveredItemId, setHoveredItemId } = useNavigationStore();

  return (
    <nav className={styles.nav}>
      {navItems.map((item) => {
        const isHovered = hoveredItemId === item.id;
        const isActive = pathname === item.href;
        const activeOrHovered = isHovered || isActive;

        return (
          <li key={item.id} className={styles.navItem}>
            <Link href={item.href}>
              <Button
                img={iconMap[item.id]}
                alt={item.id}
                className={styles.navButton}
                style={{
                  filter: activeOrHovered
                    ? colorFilterMap[item.id]
                    : defaultFilter,
                }}
                onHover={() => setHoveredItemId(item.id)}
                onLeave={() => setHoveredItemId(null)}
              />
            </Link>
          </li>
        );
      })}
    </nav>
  );
};

export default Navigation;
