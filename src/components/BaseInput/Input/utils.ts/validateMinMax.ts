export const validateMinMax = (inputValue: string, minLength?: string | number, maxLength?: string | number, minValue?: string | number, maxValue?: string | number) => {
  const minLen = Number(minLength);
  const maxLen = Number(maxLength);
  const minVal = Number(minValue);
  const maxVal = Number(maxValue);

  if (!Number.isNaN(minVal) || !Number.isNaN(maxVal)) {
    if (Number(inputValue) > maxVal) {
      const messageError = { message: "maxValue", params: { max: maxVal } };
      return {
        isValid: false,
        message: messageError,
      };
    }
    if (Number(inputValue) < minVal) {
      const messageError = { message: "minValue", params: { min: minVal } };
      return {
        isValid: false,
        message: messageError,
      };
    }
  }

  if (!Number.isNaN(minLen) || !Number.isNaN(maxLen)) {
    if (!Number.isNaN(minLen) && inputValue.length < minLen) {
      const messageError = { message: "fieldMinLength", params: { min: minLength ?? "" } };
      return {
        isValid: false,
        message: messageError,
      };
    }
    if (inputValue.length > maxLen) {
      const messageError = { message: "fieldMaxLength", params: { max: maxLength ?? "" } };
      return {
        isValid: false,
        message: messageError,
      };
    }
    if (!Number.isNaN(minLen) && !Number.isNaN(maxLen) && (inputValue.length < minLen || inputValue.length > maxLen) && minLength !== undefined && maxLength !== undefined) {
      const messageError = { message: "fieldLengthRange", params: { min: minLength, max: maxLength } };
      return {
        isValid: false,
        message: messageError,
      };
    }
  }
  return {
    isValid: true,
    message: { message: "", params: {} },
  };
};
