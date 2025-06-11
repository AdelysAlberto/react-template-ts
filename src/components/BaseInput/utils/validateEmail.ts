const validateEmail = (email: string, pattern?: string): boolean => {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const thisRegex = pattern ?? emailRegex;

  const regex = new RegExp(thisRegex, "u");

  return regex.test(email);
};

export default validateEmail;
