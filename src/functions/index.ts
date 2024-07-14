/* eslint-disable no-useless-escape */
import { activitySelectionType, activityType, listType } from "src/types";

export const isEmailValid = (email: string) => {
  const regex = /\S+@\S+\.\S+/;
  return regex.test(email);
};

export const isPasswordValid = (password: string, minSize?: number) => {
  if (minSize && password.length < minSize) return false;
  const regex = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]|[\u00C0-\u017F]/;
  return regex.test(password);
};

export const areActivitiesEqual = (
  activity1: activityType,
  activity2: activityType
): boolean => {
  if (activity1 === activity2) return true;
  if (!activity1 || !activity2) return false;
  return (
    activity1.what === activity2.what &&
    activity1.where === activity2.where &&
    activity1.who === activity2.who &&
    activity1.color === activity2.color &&
    activity1.startsAt.hour === activity2.startsAt.hour &&
    activity1.startsAt.minute === activity2.startsAt.minute &&
    activity1.endsAt.hour === activity2.endsAt.hour &&
    activity1.endsAt.minute === activity2.endsAt.minute &&
    activity1.notes === activity2.notes
  );
};

export const isSelectionValid = (selection: activitySelectionType) => {
  if (!selection || !selection.activity || typeof selection.day !== "number") return false;
  if (selection.day < 0) return false;
  return true;
};

export const getDirt = (size?: number) => {
  return Math.random().toString(36).substring(2, size?(size + 2):(18)).toLowerCase();
}