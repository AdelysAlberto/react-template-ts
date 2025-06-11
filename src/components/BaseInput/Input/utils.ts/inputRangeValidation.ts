type ValidationResult = {
  isValid: boolean;
  errorMessage: { message: string; params?: Record<string, string | number> | undefined };
};

type TIsValidValue = (value: string | number | undefined) => boolean;
const isValidValue: TIsValidValue = value => {
  return value !== undefined && value !== null && value !== "";
};

function isWithinRange(value: number, min: number, max: number): boolean {
  return value >= min && value <= max;
}

function createValidationResult(isValid: boolean, errorMessage: { message: string; directMessage?: boolean; params?: { [key: string]: string | number } }): ValidationResult {
  return { isValid, errorMessage };
}

type ValidateRangeInputFunction = (valueFrom?: string | number, valueTo?: string | number, minValue?: number, maxValue?: number) => ValidationResult;

export const validateRangeInput: ValidateRangeInputFunction = (valueFrom, valueTo, minValue, maxValue) => {
  const messageFieldIsRequired = { message: "fieldIsRequired" };
  const messageFieldMustBeMinAndMax = {
    message: "fieldMustBeMinAndMax",
    params: { min: minValue ?? "", max: maxValue ?? "" },
  };

  if (!isValidValue(String(valueFrom).trim()) || !isValidValue(String(valueTo).trim())) {
    return createValidationResult(false, { message: messageFieldIsRequired.message });
  }

  const numValueFrom = Number(valueFrom);
  const numValueTo = Number(valueTo);

  if (numValueTo < numValueFrom) {
    return createValidationResult(false, { message: "fromMustBeLessOrEqualThanTo" }); // message: "fromMustBeLessOrEqualThanTo"
  }

  if (
    (minValue !== undefined && maxValue !== undefined && !isWithinRange(numValueFrom, minValue, maxValue)) ||
    (minValue !== undefined && maxValue !== undefined && !isWithinRange(numValueTo, minValue, maxValue))
  ) {
    return createValidationResult(false, messageFieldMustBeMinAndMax);
  }

  return createValidationResult(true, { message: "" });
};
