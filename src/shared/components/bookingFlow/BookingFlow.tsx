"use client";

import { useCalendarStore } from "@/entities/store/calendarStore/useCalendarStore";
import SelectionPanel from "../main/selectionPanel/SelectionPanel";
import TimeMenu from "@/shared/components/main/timeMenu/TimeMenu";
import ServiceMenu from "../main/servicesMenu/ServiceMenu";
import { useEffect, useRef } from "react";
import styles from "./BookingFlow.module.scss";
import Button from "../UI/button/Button";
import {
  selectIsMobile,
  usePlatformStore,
  selectIsTablet,
} from "@/entities/store/usePlatformStore";
import Modal from "../../../widgets/modal/Modal";
import { motion, AnimatePresence } from "framer-motion";

const BookingFlow = () => {
  const { selectedDate, selectedTime, clearAll } = useCalendarStore();
  const isMobile = usePlatformStore(selectIsMobile);
  const isTablet = usePlatformStore(selectIsTablet);
  const wrapperRef = useRef<HTMLDivElement>(null);

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
      style={{ display: "flex", flexDirection: "column", width: "100%" }}
    >
      <SelectionPanel>
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
      {selectedDate !== null && (
        isMobile || isTablet ? (
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
          >
            {renderFlowContent()}
          </motion.div>
        )
      )}
    </AnimatePresence>
  );
};

export default BookingFlow;