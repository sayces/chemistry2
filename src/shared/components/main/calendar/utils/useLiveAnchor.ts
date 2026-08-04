"use client";

import * as React from "react";
import { getElementCoordinates } from "./getElementCoordinates";
import type { Anchor } from "./useAnchor";

type GetElement = () => HTMLElement | null;

function toAnchor(element: HTMLElement): Anchor {
  const rect = getElementCoordinates(element);

  return {
    top: rect.top,
    left: rect.left,
    width: rect.width,
    height: rect.height,
  };
}

function isSameAnchor(a: Anchor | null, b: Anchor | null) {
  if (!a || !b) return a === b;

  return (
    a.top === b.top &&
    a.left === b.left &&
    a.width === b.width &&
    a.height === b.height
  );
}

export function useLiveAnchor(getElement: GetElement, enabled: boolean) {
  const [anchor, setAnchor] = React.useState<Anchor | null>(null);

  const rafRef = React.useRef<number | null>(null);
  const observedElementRef = React.useRef<HTMLElement | null>(null);
  const resizeObserverRef = React.useRef<ResizeObserver | null>(null);

  const disconnectObserver = React.useCallback(() => {
    resizeObserverRef.current?.disconnect();
    resizeObserverRef.current = null;
    observedElementRef.current = null;
  }, []);

  const scheduleMeasure = React.useCallback(
    (measureFn: () => void) => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }

      rafRef.current = requestAnimationFrame(() => {
        measureFn();
      });
    },
    []
  );

  const bindToCurrentElement = React.useCallback(() => {
    if (!enabled) {
      disconnectObserver();
      setAnchor(null);
      return null;
    }

    const currentElement = getElement();

    if (!currentElement || !currentElement.isConnected) {
      disconnectObserver();
      setAnchor(null);
      return null;
    }

    if (observedElementRef.current === currentElement) {
      return currentElement;
    }

    resizeObserverRef.current?.disconnect();

    observedElementRef.current = currentElement;
    resizeObserverRef.current = new ResizeObserver(() => {
      scheduleMeasure(() => {
        const el = bindToCurrentElement();
        if (!el) return;

        const nextAnchor = toAnchor(el);
        setAnchor((prev) => (isSameAnchor(prev, nextAnchor) ? prev : nextAnchor));
      });
    });

    resizeObserverRef.current.observe(currentElement);

    return currentElement;
  }, [enabled, getElement, disconnectObserver, scheduleMeasure]);

  const measure = React.useCallback(() => {
    if (!enabled) {
      setAnchor(null);
      return null;
    }

    const element = bindToCurrentElement();

    if (!element) {
      setAnchor(null);
      return null;
    }

    const nextAnchor = toAnchor(element);
    setAnchor((prev) => (isSameAnchor(prev, nextAnchor) ? prev : nextAnchor));

    return nextAnchor;
  }, [enabled, bindToCurrentElement]);

  const remeasure = React.useCallback(() => {
    scheduleMeasure(() => {
      measure();
    });
  }, [measure, scheduleMeasure]);

  React.useLayoutEffect(() => {
    if (!enabled) {
      disconnectObserver();
      setAnchor(null);
      return;
    }

    measure();

    const onResize = () => remeasure();
    const onScroll = () => remeasure();

    window.addEventListener("resize", onResize);
    window.addEventListener("scroll", onScroll, true);

    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }

      window.removeEventListener("resize", onResize);
      window.removeEventListener("scroll", onScroll, true);

      disconnectObserver();
    };
  }, [enabled, measure, remeasure, disconnectObserver]);

  return {
    anchor,
    remeasure,
  };
}