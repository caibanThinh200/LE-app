export const convertTimeToSeconds = (time: string) => {
  const timeWithArray = time.split(":");
  const seconds =
    +timeWithArray[0] * 60 * 60 + +timeWithArray[1] * 60 + +timeWithArray[2];
  return seconds;
};
