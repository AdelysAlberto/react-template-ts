import Axios from "axios";
import {privateApi} from "../../services/api/private.api.ts";
import {getStorage, setStorage} from "../../store/localStorage.ts";
import {configEnv} from "../configEnvs.ts";

const privateInstance = Axios.create();

privateInstance.interceptors.request.use(config => {
  const {token} = getStorage(configEnv.SESSION_STORAGE);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
    config.headers.set({
      "Accept-Language": getStorage("@lang")?.lang || "en-US",
      "Content-Type": "application/json",
    });
  }
  return config;
});

privateInstance.interceptors.response.use(
  (response) => response,
  async (err) => {
    const originalRequest = err.config;

    const userSessionStorage = getStorage(configEnv.SESSION_STORAGE);

    if (err.response.status === 401 && !originalRequest._retry && userSessionStorage?.refreshToken) {
      originalRequest._retry = true;
      try {
        const response = await Axios.post(privateApi.refreshToken, {
          token: userSessionStorage.token,
          refreshToken: userSessionStorage.refreshToken,
          userId: userSessionStorage.userId,
          appId: userSessionStorage.appId,
          lastAccess: userSessionStorage.lastAccess,
        });

        const {accessToken, refreshToken: newRefreshToken} = response.data;

        setStorage(configEnv.SESSION_STORAGE, {
          ...userSessionStorage,
          token: accessToken,
          refreshToken: newRefreshToken
        });

        // Update the header with the new token and try the original request again
        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        return Axios(originalRequest);
      } catch {
        return Promise.reject({
          status: err?.response?.status ?? 403,
          errorMessage: "sessionExpired",
        });
      }
    }

    if (err?.response?.status === 403) {
      return Promise.reject({
        status: err?.response?.status ?? 401,
        errorMessage: "sessionExpired",
      });
    }
    if (err?.response?.status === 401) {
      return Promise.reject({
        status: err?.response?.status ?? 401,
        errorMessage: "unauthorized",
      });
    }

    // if (err.response.status === 400 && err.response.data.code === "ARQ-0001") {
    //   return Promise.reject({
    //     status: err.response.status,
    //     errorMessage: "sessionExpired",
    //     code: err.response.data.code,
    //     validationErrorList: err.response.data.validationErrorList,
    //   });
    // }
    if (!err.response.data.message) {
      return Promise.reject({
        status: 500,
        errorMessage: "internalServerError",
      });
    }
    return Promise.reject({
      status: err.response.status,
      errorMessage: err.response.data.message,
      code: err.response.data.code,
    });
  }
);

export default privateInstance;
