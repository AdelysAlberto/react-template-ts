import { envs } from "../../utils/envs";

const publicApi = {
  authentication: `${envs.API.BASE_URL}/${envs.API.VERSION_V1}/authentication`,
  refreshToken: `${envs.API.BASE_URL}/${envs.API.VERSION_V1}/authentication/refresh-token`,
};

export { publicApi };
