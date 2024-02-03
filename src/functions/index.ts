/* eslint-disable no-useless-escape */

import { activityType, dayType } from "src/types";

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
  act1: activityType,
  act2: activityType
): boolean => {
  if (act1 === act2) return true;
  if (!act1 || !act2) return false;
  return (
    act1.what === act2.what &&
    act1.where === act2.where &&
    act1.who === act2.who &&
    act1.color === act2.color &&
    act1.startsAt.hour === act2.startsAt.hour &&
    act1.startsAt.minute === act2.startsAt.minute &&
    act1.endsAt.hour === act2.endsAt.hour &&
    act1.endsAt.minute === act2.endsAt.minute &&
    act1.notes === act2.notes
  );
};
