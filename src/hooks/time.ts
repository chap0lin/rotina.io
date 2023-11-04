import { useEffect, useState } from "react";

const useTime = () => {
    const [hour, setHour] = useState<number>();
    const [minute, setMinute] = useState<number>();

    const getTime = () => {
        const now = new Date();
        setHour(now.getHours());
        setMinute(now.getMinutes());
    }

    useEffect(() => {
        getTime();
        const updater = setInterval(getTime, 3000);
        return () => {
            clearInterval(updater);
        }
    }, []);

    return [hour, minute];
}

export { useTime };