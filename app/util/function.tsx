export const convertTimeToSeconds = (time: string) => {
  const timeWithArray = time.split(":");
  const seconds =
    +timeWithArray[0] * 60 * 60 + +timeWithArray[1] * 60 + +timeWithArray[2];
  return seconds;
};

export const secondsToHms = (second: number) => {
  second = Number(second);
  var h = Math.floor(second / 3600);
  var m = Math.floor((second % 3600) / 60);
  var s = Math.floor((second % 3600) % 60);

  var mDisplay = (m < 10 ? `0${m}` : m) + ":";
  var sDisplay = s < 10 ? `0${s}` : s;

  return mDisplay + sDisplay;
};
