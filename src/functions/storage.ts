import { getDirt } from "./index";

const storage = window.localStorage;

const mask = (what: string) => {
    const dirt = getDirt();
    const index = Math.floor(dirt.length * Math.random());
    return `${dirt.substring(0, index)}${what}${dirt.substring(index, dirt.length - 1)}`;
}
  
const getMasked = (what: string) => {
    for(let i = 0; i < storage.length; i++){
        const key = storage.key(i);
        if(key.includes(what)) return key; 
    }
}

export const saveOnStorage = (key: string, value: string) => {
    try {
        if(getFromStorage(key)) removeFromStorage(key);
        storage.setItem(mask(key), value);
        return true;
    } catch (e) {
        console.log("saving", key, "on storage failed:", e);
        return false;
    }
}

export const getFromStorage = (key: string) => {
    try {
        const item = storage.getItem(getMasked(key));
        return item;
    } catch (e) {
        console.log("retrieving", key, "on storage failed:", e);
        return null;
    }
}

export const removeFromStorage = (key: string) => {
    try {
        storage.removeItem(getMasked(key));
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


export const emptyStorage = () => {
    for(let i = 0; i < storage.length; i++){
        removeFromStorage(storage.key(i));
    }
}