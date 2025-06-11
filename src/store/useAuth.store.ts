import { decodeToken } from "react-jwt";
import { type StoreApi, type UseBoundStore, create } from "zustand";
import type { TDecodeToken } from "../interfaces/login.interface";
import { envs } from "../utils/envs";
import { decodeMyToken, validateSession } from "../utils/token";
import { getStorage, removeStorage, setStorage } from "./storage";

// Tipos para el login y permisos
interface ILogin {
  accessToken: string;
  appId: string;
  lastAccess: string;
  refreshToken: string;
  userId: string;
}

interface IPermissions {
  readWrite: string[];
  readOnly: string[];
}

export type AuthStatus = "checking" | "authenticated" | "unauthenticated" | "N/A";

interface IAuth {
  authStatus: AuthStatus;
  token?: string;
  user?: string;
  permissions: IPermissions;
  loadPermissions: () => void;
  login: (data: ILogin) => void;
  validateSession: () => void;
  logout: () => void;
}

// Custom hook con Zustand y buenas prácticas
export const useAuthStore: UseBoundStore<StoreApi<IAuth>> = create((set, _) => ({
  authStatus: "checking",
  token: undefined,
  user: undefined,
  permissions: {
    readWrite: [],
    readOnly: [],
  },

  // Método para cargar permisos a partir del token decodificado
  loadPermissions: () => {
    const decodedToken = decodeMyToken();
    if (!decodedToken) return;

    // Se utiliza el operador de encadenamiento opcional y se asigna un arreglo vacío en caso de que la propiedad no exista
    const readWrite = decodedToken.rwProcess?.map((process: string) => process.split(",")[1]) || [];
    const readOnly = decodedToken.roProcess?.map((process: string) => process.split(",")[1]) || [];

    set({
      permissions: { readWrite, readOnly },
    });
  },

  // Método para iniciar sesión, decodifica el token y guarda la sesión en el storage
  login: (data: ILogin) => {
    const { accessToken, refreshToken, userId, lastAccess, appId } = data;
    if (!accessToken) return;

    set({
      authStatus: "authenticated",
      token: accessToken,
    });

    // Se decodifica el token y se prepara el objeto de sesión
    const decoded = decodeToken(accessToken) as TDecodeToken;
    const session = {
      username: decoded.iss,
      token: accessToken,
      currentsessionid: decoded.currentsessionid,
      refreshToken,
      userId,
      appId,
      lastAccess,
      expWarning: decoded.expWarning,
    };

    setStorage(envs.SESSION_STORAGE, session);
  },

  // Método para validar la sesión, verifica si el token existe y aún no ha expirado
  validateSession: () => {
    const session = getStorage(envs.SESSION_STORAGE);
    if (!session) {
      set({
        authStatus: "unauthenticated",
        token: undefined,
        user: undefined,
      });
      return;
    }

    // Se llama a una función externa para validar si el token ha expirado.
    // Nota: Es recomendable renombrar esta función externa para evitar ambigüedad con este método.
    const isTokenExpired = validateSession();

    if (isTokenExpired) {
      set({
        authStatus: "unauthenticated",
        token: undefined,
        user: undefined,
      });
      removeStorage(envs.SESSION_STORAGE);
      return;
    }

    set({
      authStatus: "authenticated",
      token: session.token,
    });
  },

  // Método para cerrar sesión, limpia el storage y actualiza el estado
  logout: () => {
    console.log("[LOGOUT]");
    removeStorage(envs.SESSION_STORAGE);
    const checkExtra = getStorage(envs.SESSION_STORAGE);
    console.log({ checkExtra });
    set({
      authStatus: "unauthenticated",
      token: undefined,
      user: undefined,
    });
  },
}));
