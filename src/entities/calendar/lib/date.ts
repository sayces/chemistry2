export const isSameDay = (a?: Date, b?: Date): boolean => {
  if (!a || !b) return false;
  return a.toDateString() === b.toDateString();
};