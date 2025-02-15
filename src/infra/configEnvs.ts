const {VITE_API_URL} = import.meta.env;

const configEnv = {
  SESSION_STORAGE: "lotteryStorage",
  API_URL: VITE_API_URL || "http://localhost:3002",
};

export {
  configEnv
};
