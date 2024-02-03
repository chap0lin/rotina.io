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

export const parseTime = (time: string, separator?: string): timeType => {
  const ERROR = { hour: -1, minute: -1 };
  const splitTime = time.split(separator ?? ":");
  if (splitTime.length < 2) return ERROR;

  const hour = Number.parseInt(splitTime[0]);
  const minute = Number.parseInt(splitTime[1]);

  if (Number.isNaN(hour) || Number.isNaN(minute)) return ERROR;
  return { hour, minute };
};

export const isBefore = (
  time: timeType,
  target: timeType,
  beforeExclusive?: boolean
) => {
  if (time.hour > target.hour) return false;
  if (time.hour < target.hour) return true;
  if (beforeExclusive) return time.minute < target.minute;
  return time.minute <= target.minute;
};

export const isEqual = (time: timeType, target: timeType) => {
  if (time.hour !== target.hour) return false;
  return time.minute === target.minute;
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
