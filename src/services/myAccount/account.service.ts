import privateRequest from "../../infra/http/private.request";
import publicRequest from "../../infra/http/public.request";
import type { TResponseRequest } from "../../interfaces/http";
import { publicApi } from "../api/public.api";

type TLogin = {
  userLogin: string;
  password: string;
};

interface ResponseLogin {
  accessToken: string;
  appId: string;
  lastAccess: string;
  refreshToken: string;
  userId: string;
  token?: string;
  currentsessionid?: string;
  username?: string;
}

export const loginService = async ({ userLogin, password }: TLogin): Promise<TResponseRequest<ResponseLogin>> =>
  publicRequest.post({ url: publicApi.authentication, body: { userLogin, password } });

export const logoutService = async (payload: ResponseLogin) => {
  const body = {
    accessToken: payload.token,
    appId: payload.appId,
    lastAccess: payload.lastAccess,
    refreshToken: payload.refreshToken,
    userId: payload.userId,
  };

  privateRequest.delete({ url: publicApi.authentication, body });
};
