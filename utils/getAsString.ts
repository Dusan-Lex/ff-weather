export const getAsString = (s: string | string[]): string => {
  if (Array.isArray(s)) {
    return s[0];
  }
  return s;
};
