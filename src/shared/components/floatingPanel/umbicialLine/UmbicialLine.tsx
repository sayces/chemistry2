import clsx from "clsx";
import styles from "./UmbicialLine.module.scss";

interface UmbicialProps {
  side: "left" | "right";
  start: { anchorX: number; anchorY: number };
}

const PANEL_GAP = 56; // должен совпадать с отступом панели

const UmbicialLine = ({ start, side }: UmbicialProps) => {
  const { anchorX, anchorY } = start;

  const lineStyles =
    side === "left"
      ? {
          top: `${anchorY}px`,
          left: `-${PANEL_GAP}px`,
          width: `${anchorX + PANEL_GAP}px`,
        }
      : {
          top: `${anchorY}px`,
          left: `${anchorX}px`,
          width: `calc(100% - ${anchorX}px + ${PANEL_GAP}px)`,
        };

  return (
    <div
      className={clsx(styles.umbilicalLine, styles[`side_${side}`])}
      style={lineStyles}
    />
  );
};

export default UmbicialLine;