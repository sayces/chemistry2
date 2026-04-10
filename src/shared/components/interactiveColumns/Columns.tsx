"use client";

import { usePathname } from "next/navigation";
import Column from "./Column";
import { useNavigationStore, navItems } from "@/shared/store/useNavigationStore";
import containerStyles from "./Columns.module.scss";
import styles from "./Column.module.scss";

const Columns = () => {
  const pathname = usePathname();
  const { hoveredItemId } = useNavigationStore();

  const getActiveColumnIndex = (): number => {
    const pageIndex = navItems.findIndex((item) => item.href === pathname);
    if (pageIndex !== -1) return pageIndex;

    if (hoveredItemId) {
      return navItems.findIndex((item) => item.id === hoveredItemId);
    }

    return -1;
  };

  const activeIndex = getActiveColumnIndex();

  const activeColorMap: Record<string, string> = {
    calendar: styles.calendarBg,
    map: styles.mapBg,
    gallery: styles.galleryBg,
    profile: styles.profileBg,
  };

  return (
    <div className={containerStyles.columnsContainer}>
      <div className={containerStyles.columnsInner}>
        {navItems.map((item, index) => (
          <Column
            key={`${item.id}-${pathname}`}
            activeColor={activeColorMap[item.id]}
            isActive={index === activeIndex}
          />
        ))}
      </div>
    </div>
  );
};

export default Columns;
