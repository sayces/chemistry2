export const TIME_SLOTS = ["10:00", "12:00", "14:00", "16:00", "18:00"] as const;

export type TimeSlot = (typeof TIME_SLOTS)[number];

export const makeDateTime = (date: Date, time: TimeSlot): Date => {
  const [hours, minutes] = time.split(":").map(Number);
  const result = new Date(date);
  result.setHours(hours, minutes, 0, 0);
  return result;
};