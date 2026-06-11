export type ElementCoordinates = {
  top: number;
  left: number;
  right: number;
  bottom: number;
  width: number;
  height: number;
  centerX: number;
  centerY: number;
  pageTop: number;
  pageLeft: number;
  pageRight: number;
  pageBottom: number;
};

export function getElementCoordinates(
  element: HTMLElement
): ElementCoordinates {
  const rect = element.getBoundingClientRect();

  return {
    top: rect.top,
    left: rect.left,
    right: rect.right,
    bottom: rect.bottom,
    width: rect.width,
    height: rect.height,
    centerX: rect.left + rect.width / 2,
    centerY: rect.top + rect.height / 2,
    pageTop: rect.top + window.scrollY,
    pageLeft: rect.left + window.scrollX,
    pageRight: rect.right + window.scrollX,
    pageBottom: rect.bottom + window.scrollY,
  };
}

export type RelativeCoordinates = {
  top: number;
  left: number;
  right: number;
  bottom: number;
  width: number;
  height: number;
};

export function getRelativeCoordinates(
  element: HTMLElement,
  container: HTMLElement
): RelativeCoordinates {
  const elementRect = element.getBoundingClientRect();
  const containerRect = container.getBoundingClientRect();

  return {
    top: elementRect.top - containerRect.top,
    left: elementRect.left - containerRect.left,
    right: elementRect.right - containerRect.left,
    bottom: elementRect.bottom - containerRect.top,
    width: elementRect.width,
    height: elementRect.height,
  };
}