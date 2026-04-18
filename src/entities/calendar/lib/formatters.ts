export const formatMonthCaptionRu = (date: Date): string => {
  const monthName = date.toLocaleDateString("ru", { month: "long" });
  return (
    `${monthName.charAt(0).toUpperCase()}${monthName.slice(1)} ` +
    `${date.getFullYear()}`
  );
};