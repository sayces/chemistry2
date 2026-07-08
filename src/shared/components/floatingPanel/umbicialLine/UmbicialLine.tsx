import clsx from "clsx";
import styles from "./UmbicialLine.module.scss";
import { Anchor } from "../../main/calendar/utils/useAnchor";

interface UmbicialProps {
  side?: "left" | "right";
  start: Anchor | null;
  end: Anchor | null;
}

const UmbicialLine = ({ start, side = "right", end }: UmbicialProps) => {
  if (!start || !end) return null;

  const startY = start.top;
  const startX =
    side === "right"
      ? start.left
      : start.left + start.width;

  const endX = side === "right" ? end.left : end.left + end.width;

  const left = Math.min(startX, endX);
  const width = Math.abs(endX - startX);

  return (
    <div
      className={clsx(styles.umbilicalLine, styles[`side_${side}`])}
      style={{
        top: `${startY}px`,
        left: `${left}px`,
        width: `${width}px`,
      }}
    />
  );
};

export default UmbicialLine;
