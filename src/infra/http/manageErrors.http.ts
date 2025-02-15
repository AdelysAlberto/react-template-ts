import {IAxiosError} from "../../interfaces/http";
import {destroyStorage} from "../../store/localStorage";

export const manageCatchError = (err: IAxiosError) => {
  const {status, code, errorMessage} = err;
  const errorMessageResponse = errorMessage;

  if (status === 403) {
    //window.location.href = "/";
    destroyStorage();
    return "sessionExpired";
  }
  
  if (code === "500") {
    return "internalServerError";
  }

  return  errorMessageResponse;
};
