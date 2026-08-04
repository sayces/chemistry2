"use client";

import { useCallback, useEffect, useMemo, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

import { useCalendarStore } from "@/entities/store/calendarStore/useCalendarStore";
import {
  selectIsMobile,
  selectIsTablet,
  usePlatformStore,
} from "@/entities/store/usePlatformStore";

import SelectionPanel from "@/shared/components/main/selectionPanel/SelectionPanel";
import TimeMenu from "@/shared/components/main/timeMenu/TimeMenu";
import ServiceMenu from "@/shared/components/main/servicesMenu/ServiceMenu";
import Modal from "@/shared/components/modal/Modal";
import Button from "@/shared/components/ui-kit/button/Button";
import UmbicialLine from "@/shared/components/floatingPanel/umbicialLine/UmbicialLine";
import { useLiveAnchor } from "@/shared/components/main/calendar/utils/useLiveAnchor";

import styles from "./BookingFlow.module.scss";

const BookingFlow = () => {
  const selectedDate = useCalendarStore((state) => state.selectedDate);
  const selectedTime = useCalendarStore((state) => state.selectedTime);
  const clearAll = useCalendarStore((state) => state.clearAll);

  const isMobile = usePlatformStore(selectIsMobile);
  const isTablet = usePlatformStore(selectIsTablet);
  const isDesktop = !isMobile && !isTablet;

  const wrapperRef = useRef<HTMLDivElement>(null);
  const panelSlotRef = useRef<HTMLDivElement>(null);

  const selectedDayKey = useMemo(() => {
    return selectedDate ? selectedDate.toISOString().slice(0, 10) : null;
  }, [selectedDate]);

  const getSelectedDayElement = useCallback(() => {
    if (!selectedDayKey) return null;

    return document.querySelector(
      `[data-calendar-day="${selectedDayKey}"]`,
    ) as HTMLElement | null;
  }, [selectedDayKey]);

  const getPanelSlotElement = useCallback(() => {
    return panelSlotRef.current;
  }, []);

  const { anchor: startAnchor, remeasure: remeasureStart } = useLiveAnchor(
    getSelectedDayElement,
    Boolean(selectedDate) && isDesktop,
  );

  const { anchor: endAnchor, remeasure: remeasureEnd } = useLiveAnchor(
    getPanelSlotElement,
    Boolean(selectedDate) && isDesktop,
  );

  const remeasureLine = useCallback(() => {
    remeasureStart();
    remeasureEnd();
  }, [remeasureStart, remeasureEnd]);

  useEffect(() => {
    if (!isDesktop) return;

    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;

      if (wrapperRef.current && wrapperRef.current.contains(target)) return;
      if (target.closest("[data-calendar-container]")) return;

      clearAll();
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isDesktop, clearAll]);

  const renderDesktopFlowContent = () => (
    <motion.div
      layout
      className={styles.motionWrapper}
      onLayoutAnimationComplete={remeasureLine}
    >
      <UmbicialLine
        start={startAnchor}
        end={endAnchor}
        side="right"
        inset={0}
      />

      <div
        ref={panelSlotRef}
        style={{
          position: "relative",
          width: "100%",
        }}
      >
        <motion.div
          initial={{
            opacity: 0,
            clipPath: "inset(0 100% 0 0 round 24px)",
          }}
          animate={{
            opacity: 1,
            clipPath: "inset(0 0% 0 0 round 24px)",
          }}
          exit={{
            opacity: 0,
            clipPath: "inset(0 100% 0 0 round 24px)",
          }}
          transition={{
            duration: 0.22,
            delay: 0.06,
          }}
          onAnimationComplete={remeasureLine}
        >
          <SelectionPanel>
            <TimeMenu />

            <AnimatePresence initial={false}>
              {selectedTime && (
                <motion.div
                  key="service-menu"
                  layout
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  onAnimationComplete={remeasureLine}
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
        </motion.div>
      </div>

      <motion.div layout>
        <Button className={styles.bookingButton} disabled>
          Подтвердить
        </Button>
      </motion.div>
    </motion.div>
  );

  const renderMobileFlowContent = () => (
    <motion.div layout className={styles.motionWrapper}>
      <SelectionPanel>
        <TimeMenu />

        <AnimatePresence initial={false}>
          {selectedTime && (
            <motion.div
              key="service-menu-mobile"
              layout
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
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
        (isDesktop ? (
          <motion.div
            ref={wrapperRef}
            className={styles.bookingFlow}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
          >
            {renderDesktopFlowContent()}
          </motion.div>
        ) : (
          <Modal isOpen={true} onClose={clearAll}>
            {renderMobileFlowContent()}
          </Modal>
        ))}
    </AnimatePresence>
  );
};

export default BookingFlow;
