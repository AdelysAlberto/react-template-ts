import type {AxiosResponseTransformer, ResponseType} from "axios";

export type TResponseRequest<T> = {
  data?: T;
  status: number;
  statusText?: string;
};

export type TPaginatedResponse<T> = {
  content: T[];
  empty: boolean;
  first: boolean;
  last: boolean;
  number: number;
  numberOfElements: number;
  pageable: {
    offset: number;
    pageNumber: number;
    pageSize: number;
    paged: boolean;
    sort: {
      empty: boolean;
      sorted: boolean;
      unsorted: boolean;
    };
    unpaged: boolean;
  };
  size: number;
  sort: {
    empty: boolean;
    sorted: boolean;
    unsorted: boolean;
  };
  totalElements: number;
  totalPages: number;
};

export type TUser = {
  email: string;
  token: string;
};

export type THeader = {
  authorization?: string;
};

export interface IAxiosError {
  data: { message: string; error?: string };
  statusText?: string;
  status: number;
  errorMessage?: string;
  code?: string;
  validationErrorList?: string[];
}

export type TBody = BodyInit | Record<string, unknown>;

interface IDefaultParams {
  url: string;
  body?: TBody;
  additionalHeaders?: object;
  transformResponse?: AxiosResponseTransformer | AxiosResponseTransformer[];
  responseType?: ResponseType;
}

export interface IRequest {
  get: <T>({ url, additionalHeaders }: IDefaultParams) => Promise<TResponseRequest<T>>;
  post: <T>({ url, body, additionalHeaders }: IDefaultParams & { body: TBody }) => Promise<TResponseRequest<T>>;
  patch: <T>({ url, body, additionalHeaders }: IDefaultParams & { body: TBody }) => Promise<TResponseRequest<T>>;
  put: <T>({ url, body, additionalHeaders }: IDefaultParams & { body: TBody }) => Promise<TResponseRequest<T>>;
  delete: <T>({ url, body, additionalHeaders }: IDefaultParams & { body: TBody }) => Promise<TResponseRequest<T>>;
}
