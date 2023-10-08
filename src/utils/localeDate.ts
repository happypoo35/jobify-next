export const isValidDate = (date: Date) => {
  return date instanceof Date && !isNaN(Number(date));
};

export const localeDate = (date: Date, options?: Intl.DateTimeFormatOptions) =>
  date.toLocaleString("en-EN", {
    year: "numeric",
    month: "short",
    day: "numeric",
    ...options,
  });
