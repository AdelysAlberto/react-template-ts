const adapterHttpResponse = (code: string) => {
  const codeHttp: { [key: string]: string } = {
    "0309": "userPasswordInvalid",
    "10042": "invalid.account.type",
    "21084": "payment.flag-isTrue",
  };

  const codeResponse = codeHttp[code] || null;
  return codeResponse;
};

export { adapterHttpResponse };
