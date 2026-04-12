"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import Column from "./Column";
import { useNavigationStore, navItems } from "@/shared/store/useNavigationStore";
import containerStyles from "./Columns.module.scss";
import styles from "./Column.module.scss";

const Columns = () => {
  const pathname = usePathname();
  const { hoveredItemId, previousActiveItemId, setCurrentActiveItemId } = useNavigationStore();

  const getActiveColumnIndex = (): number => {
    const pageIndex = navItems.findIndex((item) => item.href === pathname);
    if (pageIndex !== -1) return pageIndex;

    if (hoveredItemId) {
      return navItems.findIndex((item) => item.id === hoveredItemId);
    }

    return -1;
  };

  const currentActiveIndex = getActiveColumnIndex();

  useEffect(() => {
    // Track current active item to enable revert animation
    if (currentActiveIndex !== -1) {
      const currentItem = navItems[currentActiveIndex];
      setCurrentActiveItemId(currentItem.id);
    }
  }, [pathname, currentActiveIndex]);

  const activeColorMap: Record<string, string> = {
    calendar: styles.calendarBg,
    map: styles.mapBg,
    gallery: styles.galleryBg,
    profile: styles.profileBg,
  };

  return (
    <div className={containerStyles.columnsContainer}>
      <div className={containerStyles.columnsInner}>
        {navItems.map((item, index) => {
          const isActive = index === currentActiveIndex;
          const isPrevious = item.id === previousActiveItemId && !isActive;
          
          return (
            <Column
              key={item.id}
              activeColor={activeColorMap[item.id]}
              isActive={isActive}
              isPreviousActive={isPrevious}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Columns;
