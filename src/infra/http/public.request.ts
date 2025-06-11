import type { IAxiosError, IRequest } from "../../interfaces/http";
import { loadAbort } from "./loadAbort.utility";
import { manageCatchError } from "./manageErrors.http";
import publicInstance from "./public.instance";

const publicRequest: IRequest = {
  get: async ({ url, additionalHeaders, transformResponse, responseType }) => {
    const controller = loadAbort();
    const config = {
      headers: { ...additionalHeaders },
      signal: controller.signal,
      transformResponse,
      responseType: responseType as import("axios").ResponseType,
    };

    try {
      const response = await publicInstance.get(url, config);
      const { status, data } = response;

      return { data, status };
    } catch (err) {
      const message = manageCatchError(err as IAxiosError);
      throw message;
    }
  },
  post: async ({ url, body, additionalHeaders, transformResponse, responseType }) => {
    try {
      const config = {
        headers: { ...additionalHeaders },
        transformResponse,
        responseType: responseType as import("axios").ResponseType,
      };
      // send headers and request to URL
      const response = await publicInstance({
        method: "post",
        url,
        data: body,
        ...config,
      });
      const { data, status } = response;
      return { data, status };
    } catch (err) {
      // authentication_required
      const message = manageCatchError(err as IAxiosError);
      throw message;
    }
  },
  put: async ({ url, body, additionalHeaders }) => {
    try {
      const config = {
        headers: { ...additionalHeaders },
      };
      // send headers and request to URL
      const response = await publicInstance({
        method: "put",
        url,
        data: body,
        ...config,
      });
      const { data, status } = response;
      return { data, status };
    } catch (err) {
      // authentication_required
      const message = manageCatchError(err as IAxiosError);
      throw message;
    }
  },
  patch: async ({ url, body, additionalHeaders }) => {
    try {
      const config = {
        headers: { ...additionalHeaders },
      };
      // send headers and request to URL
      const response = await publicInstance({
        method: "patch",
        url,
        data: body,
        ...config,
      });
      const { data, status } = response;
      return { data, status };
    } catch (err) {
      // authentication_required
      const message = manageCatchError(err as IAxiosError);
      throw message;
    }
  },
  delete: async ({ url, body, additionalHeaders }) => {
    try {
      const config = {
        headers: { ...additionalHeaders },
      };
      // send headers and request to URL
      const response = await publicInstance({
        method: "delete",
        url,
        data: body,
        ...config,
      });
      const { data, status } = response;
      return { data, status };
    } catch (err) {
      // authentication_required
      const message = manageCatchError(err as IAxiosError);
      throw message;
    }
  },
};

export default publicRequest;
