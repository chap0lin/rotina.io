import { timeType } from "src/types";

export const formatTwoDigits = (num: number) => {
  return num < 10 ? `0${num}` : `${num}`;
};

export const stringifyTime = (time: timeType, separator?: string) => {
  return (
    formatTwoDigits(time.hour) +
    (separator ?? ":") +
    formatTwoDigits(time.minute)
  );
};

export const isBefore = (time: timeType, target: timeType) => {
  if (time.hour > target.hour) return false;
  if (time.hour < target.hour) return true;
  return time.minute <= target.minute;
};

export const isAfter = (
  time: timeType,
  target: timeType,
  afterExclusive?: boolean
) => {
  if (time.hour < target.hour) return false;
  if (time.hour > target.hour) return true;

  if (afterExclusive) return time.minute > target.minute;
  return time.minute >= target.minute;
};
