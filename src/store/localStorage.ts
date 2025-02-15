export const getStorage = (nameStorage: string) => {
  const data = localStorage.getItem(nameStorage);
  if (!data) {
    return null;
  }

  return JSON.parse(data);
};

export const setStorage = (nameStorage: string, payload: object | string) => {
  if (typeof payload === "string") {
    return localStorage.setItem(nameStorage, payload);
  }
  return localStorage.setItem(nameStorage, JSON.stringify(payload));
};

export const removeStorage = (nameStorage: string) => localStorage.removeItem(nameStorage);

export const destroyStorage = () => {
  const themeStorage = getStorage("theme");
  localStorage.clear();
  sessionStorage.clear();
  if (themeStorage) {
    setStorage("theme", themeStorage);
  }
};