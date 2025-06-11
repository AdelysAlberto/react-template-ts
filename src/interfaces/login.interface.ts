export interface TDecodeToken {
  rwProcess: string[];
  roles: string[];
  iss: string;
  groups: string[];
  uid: string;
  currentsessionid: string;
  roProcess: string[];
  permits: string[];
  codCustomer: number;
  appid: string;
  exp: number;
  iat: number;
  jti: string;
  codUser: number;
  expWarning: string;
}

export interface IToken {
  lastAccess: string;
  accessToken: string;
  refreshToken: string;
  userId: string;
  appId: string;
  appUserId: string;
  expWarning: string;
}

export interface ResponseLogin {
  accessToken: string;
  appId: string;
  lastAccess: string;
  refreshToken: string;
  userId: string;
  token?: string;
  currentsessionid?: string;
  username?: string;
}
