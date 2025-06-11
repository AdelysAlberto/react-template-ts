import Axios from "axios";

const publicInstance = Axios.create();

publicInstance.interceptors.response.use(
  response => response,
  err => {
    if (!err.response.data.message || err.code === "ERR_BAD_RESPONSE") {
      return Promise.reject({
        status: 500,
        errorMessage: "interalServerError",
      });
    }
    return Promise.reject({
      status: err.response.status,
      errorMessage: err.response.data.message,
      code: err.response.data.code,
    });
  }
);

export default publicInstance;
