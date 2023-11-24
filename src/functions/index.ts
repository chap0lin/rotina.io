/* eslint-disable no-useless-escape */

export const isEmailValid = (email: string) => {
  const regex = /\S+@\S+\.\S+/;
  return regex.test(email);
};

export const isPasswordValid = (password: string, minSize?: number) => {
  if (minSize && password.length < minSize) return false;
  const regex = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]|[\u00C0-\u017F]/;
  return regex.test(password);
};
