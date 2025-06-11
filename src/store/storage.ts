import Cookies from "js-cookie";

// Guardar en cookies
export const setStorage = (key: string, value: object | string, expiresDays = 7) => {
  if (typeof value === "string") {
    Cookies.set(key, value, { expires: expiresDays, secure: true, sameSite: "strict" });
  }
  Cookies.set(key, JSON.stringify(value), { expires: expiresDays, secure: true, sameSite: "strict" });
};

// Obtener de cookies
export const getStorage = (key: string) => {
  const value = Cookies.get(key);
  if (!value) {
    return null;
  }
  return JSON.parse(value);
};

// Eliminar de cookies
export const removeStorage = (key: string) => {
  Cookies.remove(key);
};
