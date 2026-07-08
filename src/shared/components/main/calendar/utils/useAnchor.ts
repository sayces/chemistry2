"use client";

import * as React from "react";
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

type ObservedTarget = {
  element: HTMLElement;
  options: SetAnchorOptions;
} | null;

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

function measureAnchor(
  element: HTMLElement,
  options: SetAnchorOptions = { type: "absolute" }
): Anchor {
  if (options.type === "relative") {
    return toAnchor(getRelativeCoordinates(element, options.container));
  }

  return toAnchor(getElementCoordinates(element));
}

export function useAnchor() {
  const [anchor, setAnchor] = React.useState<Anchor | null>(null);
  const [observedTarget, setObservedTarget] =
    React.useState<ObservedTarget>(null);

  const setAnchorFromElement = React.useCallback(
    (element: HTMLElement, options: SetAnchorOptions = { type: "absolute" }) => {
      const nextAnchor = measureAnchor(element, options);
      setAnchor(nextAnchor);
      return nextAnchor;
    },
    []
  );

  const setAnchorFromEvent = React.useCallback(
    (
      event: React.MouseEvent<Element>,
      options: SetAnchorOptions = { type: "absolute" }
    ) => {
      return setAnchorFromElement(event.currentTarget as HTMLElement, options);
    },
    [setAnchorFromElement]
  );

  const observeElement = React.useCallback(
    (element: HTMLElement, options: SetAnchorOptions = { type: "absolute" }) => {
      setObservedTarget({ element, options });
      return setAnchorFromElement(element, options);
    },
    [setAnchorFromElement]
  );

  const observeFromEvent = React.useCallback(
    (
      event: React.MouseEvent<Element>,
      options: SetAnchorOptions = { type: "absolute" }
    ) => {
      return observeElement(event.currentTarget as HTMLElement, options);
    },
    [observeElement]
  );

  const stopObserving = React.useCallback(() => {
    setObservedTarget(null);
  }, []);

  const resetAnchor = React.useCallback(() => {
    setObservedTarget(null);
    setAnchor(null);
  }, []);

  const remeasure = React.useCallback(() => {
    if (!observedTarget?.element) return null;

    if (!document.contains(observedTarget.element)) {
      setAnchor(null);
      return null;
    }

    const nextAnchor = measureAnchor(
      observedTarget.element,
      observedTarget.options
    );
    setAnchor(nextAnchor);
    return nextAnchor;
  }, [observedTarget]);

  React.useLayoutEffect(() => {
    if (!observedTarget?.element) return;

    const { element, options } = observedTarget;

    let rafId = 0;

    const measureNow = () => {
      if (!document.contains(element)) {
        setAnchor(null);
        return;
      }

      const nextAnchor = measureAnchor(element, options);
      setAnchor(nextAnchor);
    };

    const scheduleMeasure = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(measureNow);
    };

    scheduleMeasure();

    const resizeObserver = new ResizeObserver(() => {
      scheduleMeasure();
    });

    resizeObserver.observe(element);

    if (options.type === "relative") {
      resizeObserver.observe(options.container);
    }

    window.addEventListener("resize", scheduleMeasure);
    window.addEventListener("scroll", scheduleMeasure, true);

    return () => {
      cancelAnimationFrame(rafId);
      resizeObserver.disconnect();
      window.removeEventListener("resize", scheduleMeasure);
      window.removeEventListener("scroll", scheduleMeasure, true);
    };
  }, [observedTarget]);

  return {
    anchor,
    setAnchor,

    // разовое измерение
    setAnchorFromElement,
    setAnchorFromEvent,

    // live-режим
    observeElement,
    observeFromEvent,
    stopObserving,
    remeasure,

    resetAnchor,
  };
}