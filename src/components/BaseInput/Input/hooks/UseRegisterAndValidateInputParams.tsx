import { type Signal, useSignal } from "@preact/signals-react";
import { useCallback, useEffect } from "react";
import { useFormContext } from "../../../Form/context/useFormContext";
import type { TInputType } from "../baseInput.types";
import { validateRangeInput } from "../utils.ts/inputRangeValidation";
import { isPatternValid } from "../utils.ts/validPattern";
import { validateMinMax } from "../utils.ts/validateMinMax";

type UseRegisterAndValidateInputParams = {
  id: string;
  required: boolean;
  inputBaseValue?: Signal<string | undefined>;
  inputType?: TInputType;
  pattern?: string;
  patternMessage?: string;
  minLength?: number;
  maxLength?: number;
  maxValue?: string | number;
  minValue?: string | number;
  customValidation?: (value: string) => { isValid: boolean; errorMessage?: string };
  validateField: (isValid: boolean, error: { message: string; directMessage?: boolean; params?: { [key: string]: string | number } }) => void;
  inverseRegexValidation?: boolean;
  valueFrom?: string;
  valueTo?: string;
};

const useRegisterAndValidateInput = ({
  id,
  required,
  inputBaseValue,
  pattern,
  patternMessage,
  minLength,
  maxLength,
  maxValue,
  minValue,
  customValidation,
  validateField,
  inverseRegexValidation,
  inputType,
  valueFrom,
  valueTo,
}: UseRegisterAndValidateInputParams) => {
  const { registerElement, unregisterElement } = useFormContext();
  const errorMessage = useSignal<{ message: string; directMessage?: boolean; params?: { [key: string]: string | number } }>({ message: "", params: {}, directMessage: false });
  const isValid = useSignal<boolean>(true);

  const returnFalseWithMessage = (messageKey: string) => {
    isValid.value = false;
    errorMessage.value = { message: messageKey };
    validateField(false, { message: messageKey });
    return false;
  };

  const validateInput = useCallback(() => {
    const inputValue = inputBaseValue?.value ?? "";
    isValid.value = true;
    errorMessage.value = { message: "", params: {} };

    const isRequiredAndEmpty = () => required && String(inputValue).trim() === "" && inputValue.length <= 1;

    if (inputValue === "" && !required) {
      validateField(true, errorMessage.value);
      return true;
    }

    if (isRequiredAndEmpty() && inputType !== "range") {
      return returnFalseWithMessage("fieldIsRequired");
    }

    if (inputType === "email" && !customValidation) {
      // validate if is valid Email with @
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

      if (isRequiredAndEmpty()) {
        return returnFalseWithMessage("fieldIsRequired");
      }

      if (!emailRegex.test(inputValue)) {
        return returnFalseWithMessage("invalidEmail");
      }
      validateField(true, { message: "" });
      return true;
    }

    //This code checks if the input type is "range" and there is no custom validation.
    //If so, it calls the validateRangeInput function to validate the range input and then calls the validateField
    //function with the validation result, passing isValid and errorMessage as arguments.
    if (inputType === "range" && !customValidation) {
      const result = validateRangeInput(valueFrom, valueTo, Number(minValue), Number(maxValue));
      return validateField(result.isValid, result.errorMessage);
    }

    if (!required && !customValidation && !minLength && !maxLength && !minValue && !maxValue) {
      return true;
    }

    if (pattern && !isPatternValid(inputValue, pattern, inverseRegexValidation)) {
      if (!patternMessage) {
        errorMessage.value = { message: "defaultPatternMessage" };
      } else {
        errorMessage.value = { message: patternMessage, directMessage: true };
      }
      isValid.value = false;
      return validateField(false, errorMessage.value);
    }

    if (customValidation) {
      const customValidationResult = customValidation(inputValue);

      if (!customValidationResult.isValid) {
        errorMessage.value = { message: customValidationResult.errorMessage ?? "", directMessage: true };
        isValid.value = false;
        validateField(false, errorMessage.value);
        return false;
      }

      const result = validateMinMax(inputValue, minLength, maxLength, minValue, maxValue);

      if (!result.isValid) {
        return validateField(result.isValid, result.message);
      }

      errorMessage.value = { message: "" };
      isValid.value = true;
      validateField(true, { message: "", params: {} });
      return true;
    }

    const result = validateMinMax(inputValue, minLength, maxLength, minValue, maxValue);

    if (!result.isValid) {
      return validateField(result.isValid, result.message);
    }

    validateField(isValid.value, errorMessage.value);
    return isValid.value;
  }, [inputBaseValue, isValid, errorMessage, validateField, required, pattern, minLength, maxLength, customValidation]);

  useEffect(() => {
    registerElement({
      id,
      validate: validateInput,
      getErrorMessage: () => errorMessage.value.message,
    });
  }, [registerElement, id, validateInput, errorMessage]);

  useEffect(() => {
    return () => {
      unregisterElement(id);
    };
  }, []);
  return { isValid: isValid.value, errorMessage: errorMessage.value };
};

export default useRegisterAndValidateInput;
