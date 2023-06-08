export const serializeDate = (givenDate: string | undefined) => {
  const date = new Date(givenDate as string);
  const dateString = new Date(date.getTime() - date.getTimezoneOffset() * 60000)
    .toISOString()
    .split('T')[0];
  return dateString;
};
