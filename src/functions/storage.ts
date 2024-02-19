
export const saveOnStorage = (key: string, value: string) => {
    try {
        window.localStorage.setItem(key, value);
        return true;
    } catch (e) {
        console.log("saving", key, "on storage failed:", e);
        return false;
    }
}

export const getFromStorage = (key: string) => {
    try {
        const item = window.localStorage.getItem(key);
        return item;
    } catch (e) {
        console.log("retrieving", key, "on storage failed:", e);
        return null;
    }
}