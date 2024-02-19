import { useEffect, useState } from "react";
import { timeUpdatePeriod } from "src/constants";

const useTime = () => {
  const [hour, setHour] = useState<number>();
  const [minute, setMinute] = useState<number>();
  const [seconds, setSeconds] = useState<number>();

  const getTime = () => {
    const now = new Date();
    setHour(now.getHours());
    setMinute(now.getMinutes());
    setSeconds(now.getSeconds());
  };

  useEffect(() => {
    getTime();
    const updater = setInterval(getTime, timeUpdatePeriod);
    return () => {
      clearInterval(updater);
    };
  }, []);

  return {hour, minute, seconds};
};

export { useTime };
