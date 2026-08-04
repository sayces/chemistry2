"use client";

import { createPortal } from "react-dom";
import clsx from "clsx";
import styles from "./UmbicialLine.module.scss";
import type { Anchor } from "../../main/calendar/utils/useAnchor";

interface UmbicialProps {
  side?: "left" | "right";
  start: Anchor | null;
  end: Anchor | null;
  inset?: number;
}

const UmbicialLine = ({
  start,
  end,
  side = "right",
  inset = 0,
}: UmbicialProps) => {
  if (!start || !end) return null;
  if (typeof document === "undefined") return null;

  const top = start.top;

  const startX =
    side === "right"
      ? start.left
      : start.left + start.width;

  const rawEndX =
    side === "right"
      ? end.left
      : end.left + end.width;

  const endX =
    side === "right"
      ? rawEndX - inset
      : rawEndX + inset;

  const left = Math.min(startX, endX);
  const width = Math.abs(endX - startX);

  if (width <= 0) return null;

  return createPortal(
    <div
      className={clsx(styles.umbilicalLine, styles[`side_${side}`])}
      style={{
        top: `${top}px`,
        left: `${left}px`,
        width: `${width}px`,
      }}
      aria-hidden="true"
    />,
    document.body
  );
};

export default UmbicialLine;