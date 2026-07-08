"use client";

import { useCalendarStore } from "@/entities/store/calendarStore/useCalendarStore";
import SelectionPanel from "@/shared/components/main/selectionPanel/SelectionPanel";
import TimeMenu from "@/shared/components/main/timeMenu/TimeMenu";
import ServiceMenu from "@/shared/components/main/servicesMenu/ServiceMenu";
import { useCallback, useEffect, useLayoutEffect, useRef } from "react";
import styles from "./BookingFlow.module.scss";
import Button from "@/shared/components/ui-kit/button/Button";
import {
  selectIsMobile,
  usePlatformStore,
  selectIsTablet,
} from "@/entities/store/usePlatformStore";
import Modal from "@/shared/components/modal/Modal";
import { motion, AnimatePresence } from "framer-motion";
import UmbicialLine from "@/shared/components/floatingPanel/umbicialLine/UmbicialLine";
import { useAnchor } from "@/shared/components/main/calendar/utils/useAnchor";

const BookingFlow = () => {
  const selectedDate = useCalendarStore((state) => state.selectedDate);
  const selectedTime = useCalendarStore((state) => state.selectedTime);
  const clearAll = useCalendarStore((state) => state.clearAll);
  const selectedAnchor = useCalendarStore((state) => state.selectedAnchor);

  const isMobile = usePlatformStore(selectIsMobile);
  const isTablet = usePlatformStore(selectIsTablet);

  const wrapperRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  const {
    anchor: panelAnchor,
    setAnchorFromElement,
    resetAnchor,
  } = useAnchor();

  const updatePanelAnchor = useCallback(() => {
    if (!panelRef.current) return;
    setAnchorFromElement(panelRef.current);
  }, [setAnchorFromElement]);

  useLayoutEffect(() => {
    if (!selectedDate) {
      resetAnchor();
      return;
    }

    const element = panelRef.current;
    if (!element) return;

    let frameId = 0;

    const scheduleUpdate = () => {
      cancelAnimationFrame(frameId);
      frameId = requestAnimationFrame(() => {
        updatePanelAnchor();
      });
    };

    updatePanelAnchor();

    const resizeObserver = new ResizeObserver(() => {
      scheduleUpdate();
    });

    resizeObserver.observe(element);

    window.addEventListener("resize", scheduleUpdate);
    window.addEventListener("scroll", scheduleUpdate, true);

    return () => {
      cancelAnimationFrame(frameId);
      resizeObserver.disconnect();
      window.removeEventListener("resize", scheduleUpdate);
      window.removeEventListener("scroll", scheduleUpdate, true);
    };
  }, [selectedDate, updatePanelAnchor, resetAnchor]);

  const umbicialLineStart = selectedDate ? selectedAnchor : null;
  const umbicialLineEnd = selectedDate ? panelAnchor : null;

  useEffect(() => {
    if (isMobile || isTablet) return;

    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (wrapperRef.current && wrapperRef.current.contains(target)) return;
      if (target.closest("[data-calendar-container]")) return;

      clearAll();
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isMobile, isTablet, clearAll]);

  const renderFlowContent = () => (
    <motion.div
      layout
      className={styles.motionWrapper}
      onLayoutAnimationComplete={updatePanelAnchor}
    >
      <UmbicialLine start={umbicialLineStart} end={umbicialLineEnd} />

      <SelectionPanel ref={panelRef}>
        <motion.div layout style={{ width: "100%" }}>
          <TimeMenu />
        </motion.div>

        <AnimatePresence initial={false}>
          {selectedTime && (
            <motion.div
              key="service-menu"
              layout
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              onAnimationComplete={updatePanelAnchor}
              style={{
                overflow: "hidden",
                width: "100%",
              }}
            >
              <ServiceMenu />
            </motion.div>
          )}
        </AnimatePresence>
      </SelectionPanel>

      <motion.div layout>
        <Button className={styles.bookingButton} disabled>
          Подтвердить
        </Button>
      </motion.div>
    </motion.div>
  );

  return (
    <AnimatePresence>
      {selectedDate !== null &&
        (isMobile || isTablet ? (
          <Modal isOpen={true} onClose={clearAll}>
            {renderFlowContent()}
          </Modal>
        ) : (
          <motion.div
            ref={wrapperRef}
            className={styles.bookingFlow}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            onAnimationComplete={updatePanelAnchor}
          >
            {renderFlowContent()}
          </motion.div>
        ))}
    </AnimatePresence>
  );
};

export default BookingFlow;