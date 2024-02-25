
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

export const removeFromStorage = (key: string) => {
    try {
        window.localStorage.removeItem(key);
        return true;
    } catch (e) {
        console.log("removing", key, "from storage failed:", e);
        return false;
    }
}

export const getAndRemoveFromStorage = (key: string) => {
    const item = getFromStorage(key);
    if(item) removeFromStorage(key);
    return item;
}