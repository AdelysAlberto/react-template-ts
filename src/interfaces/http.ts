import {AxiosResponseTransformer} from "axios";

export type TBody = BodyInit | Record<string, unknown>;

export interface IAxiosError {
  data: {message: string; error?: string};
  statusText?: string;
  status: number;
  errorMessage?: string;
  code?: string;
}

export type TResponseRequest<T> = {
  data?: T;
  status: number;
  statusText?: string;
};

export interface IResponseRequest<T>  {
  data?: T;
  status: number;
  statusText?: string;
};

interface IDefaultParams {
  url: string;
  body?: TBody;
  additionalHeaders?: object;
  transformResponse?: AxiosResponseTransformer | AxiosResponseTransformer[],
  responseType?: ResponseType
}

export interface IPrivateRequest {
  get: <T>({url, additionalHeaders}: IDefaultParams) => Promise<IResponseRequest<T>>;
  post: <T>({url, body, additionalHeaders}: IDefaultParams) => Promise<TResponseRequest<T>>;
  put: <T>({url, body, additionalHeaders}: IDefaultParams) => Promise<TResponseRequest<T>>;
  patch: <T>({url, body, additionalHeaders}: IDefaultParams) => Promise<TResponseRequest<T>>;
  delete: <T>({url, body, additionalHeaders}: IDefaultParams) => Promise<TResponseRequest<T>>;
}