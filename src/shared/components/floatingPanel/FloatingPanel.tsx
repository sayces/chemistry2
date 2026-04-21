"use client";

import { RefObject, useEffect, useRef } from "react";
import clsx from "clsx";
import styles from "./FloatingPanel.module.scss";
import UmbicialLine from "./umbicialLine/UmbicialLine";

type Side = "right" | "left" | "bottom" | "top";

interface FloatingPanelProps {
  umbilicalLine?: {
    start: { anchorX: number; anchorY: number };
  };
  side?: Side;
  anchorY?: number;
  children: React.ReactNode;
  onClose?: () => void;
  ignoreRef?: RefObject<HTMLElement | null>;
}

const FloatingPanel = ({
  umbilicalLine,
  side = "right",
  anchorY,
  children,
  onClose,
  ignoreRef,
}: FloatingPanelProps) => {
  const panelRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!onClose) return;

    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Node;

      if (panelRef.current?.contains(target)) return;
      if (ignoreRef?.current?.contains(target)) return;

      onClose();
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose, ignoreRef]);

  return (
    <>
      {umbilicalLine && (side === "left" || side === "right") && (
        <UmbicialLine start={umbilicalLine.start} side={side} />
      )}

      <section
        ref={panelRef}
        className={clsx(styles.floatingPanel, styles[`side_${side}`])}
        style={
          side === "left" || side === "right"
            ? { top: `${anchorY ?? 0}px` }
            : undefined
        }
      >
        {children}
      </section>
    </>
  );
};

export default FloatingPanel;