import { decodeToken, isExpired } from "react-jwt";
import type { TDecodeToken } from "../interfaces/login.interface";
import { getStorage } from "../store/storage";
import { envs } from "./envs";

export const isTokenExpired = (token: TDecodeToken) => {
  if (!token) {
    return false;
  }
  return Date.now() >= token.exp * 1000;
};

export const validateSession = () => {
  const session = getStorage(envs.SESSION_STORAGE);

  if (!session) {
    return false;
  }

  return isExpired(session.token);
};

export const decodeMyToken = () => {
  const session = getStorage(envs.SESSION_STORAGE);
  if (!session) {
    return;
  }
  return decodeToken(session?.token) as TDecodeToken;
};
