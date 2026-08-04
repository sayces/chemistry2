import { useCallback, useState } from "react";
import {
  getElementCoordinates,
  getRelativeCoordinates,
} from "./getElementCoordinates";

export type Anchor = {
  top: number;
  left: number;
  width: number;
  height: number;
};

export type CoordinatesType = "absolute" | "relative";

type SetAnchorOptions =
  | {
      type?: "absolute";
    }
  | {
      type: "relative";
      container: HTMLElement;
    };

function toAnchor(coords: {
  top: number;
  left: number;
  width: number;
  height: number;
}): Anchor {
  return {
    top: coords.top,
    left: coords.left,
    width: coords.width,
    height: coords.height,
  };
}

export function useAnchor() {
  const [anchor, setAnchor] = useState<Anchor | null>(null);

  const setAnchorFromElement = useCallback(
    (
      element: HTMLElement,
      options: SetAnchorOptions = { type: "absolute" },
    ) => {
      if (options.type === "relative") {
        const coords = getRelativeCoordinates(element, options.container);
        setAnchor(toAnchor(coords));
        return;
      }

      const coords = getElementCoordinates(element);
      setAnchor(toAnchor(coords));
    },
    [],
  );

  const setAnchorFromEvent = useCallback(
    (
      event: React.MouseEvent<HTMLElement>,
      options: SetAnchorOptions = { type: "absolute" },
    ) => {
      setAnchorFromElement(event.currentTarget, options);
    },
    [setAnchorFromElement],
  );

  const resetAnchor = useCallback(() => {
    setAnchor(null);
  }, []);

  return {
    anchor,
    setAnchor,
    setAnchorFromElement,
    setAnchorFromEvent,
    resetAnchor,
  };
}
