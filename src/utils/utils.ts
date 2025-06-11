import { envs } from "./envs";

/**
 * Converts a string amount to a DB amount. If the string amount contains a comma, it is replaced by a dot so
 * the eval function can work properly.
 * @param value
 */
const mapToDBAmount = (value?: string) => {
  if (!value) {
    return "";
  }

  let tempValue = value;
  if (value.includes(",")) {
    tempValue = value.replace(",", ".");
  }

  // Scale value up by a factor of 10 to the power of DECIMALS_PRECISION_EXPONENT for higher precision
  let newValue = Number.parseFloat(tempValue) * envs.MONEY.DECIMALS_PRECISION_BASE ** envs.MONEY.DECIMALS_PRECISION_EXPONENT;

  const validateIfHaveNine = new RegExp(/^9{2,}/);
  // check if the final number digits ends with 99** it should be rounded +1
  if (newValue !== 0 && validateIfHaveNine.test(newValue.toString().split(".")[1])) {
    // convert it to array and extract the first element of the array to verify if it is greater than 0 and if it is greater than 0 add 1
    const newValueSplit = Number(newValue.toString().split(".")[0]);
    if (newValueSplit > 0) {
      newValue = newValueSplit + 1;
    } else {
      newValue = newValueSplit - 1;
    }
  }

  // check if the dimension of array is more than 1
  if (newValue.toString().split(".").length > 1) {
    newValue = Number(newValue.toString().split(".")[0]);
  }

  return newValue.toString();
};

/**
 * Converts a DB amount to an amount that can be displayed in the client. The amount is divided by 10^5.
 */
function mapToClientAmount(value?: string) {
  if (value === undefined) {
    return 0;
  }

  let valueToNumber = Number(value);
  let digits = envs.MONEY.DECIMALS_PRECISION_EXPONENT;
  let negative = false;

  if (!digits) {
    digits = 5;
  }

  if (valueToNumber < 0) {
    negative = true;
    valueToNumber = Math.abs(valueToNumber);
  }

  const base = envs.MONEY.DECIMALS_PRECISION_BASE ** digits;

  // round to 3 decimals to handle cases that end in 5
  valueToNumber = Math.round((valueToNumber / base) * 1000) / 1000;

  // round to 2 decimals for the final result
  valueToNumber = Math.round(valueToNumber * 100) / 100;

  if (negative) {
    valueToNumber *= -1;
  }

  return valueToNumber;
}

// const mapToClientAmount = (value?: string) => {
//   return (

//     Number(value) /
//     Math.pow(DECIMALS_PRECISION.BASE, DECIMALS_PRECISION.EXPONENT)
//   );
// };

type TIndex = {
  [k: string]: string;
};
const validateMessage: TIndex = {
  valueMissing: "fieldIsRequired",
  tooShort: "fieldIsTooShort",
  tooLong: "fieldIsTooLong",
  patternMismatch: "fieldIsInvalid",
  typeMismatch: "fieldTypeMismatch",
  customError: "fieldCustomError",
  rangeOverflow: "fieldRangeOverflow",
  rangeUnderflow: "fieldRangeUnderflow",
  stepMismatch: "fieldStepMismatch",
  badInput: "fieldBadInput",
  valid: "fieldIsValid",
};

const validateErrorInput = (validity: TIndex) => {
  for (const errorType in validity) {
    if (validity[errorType]) {
      return validateMessage[errorType];
    }
  }
};

const sanitizeFilename = (filename: string, maxLength = 20) => {
  const parts = filename.split(".");
  const extension = parts.pop(); // Extrae la última parte como extensión
  let name = parts.join(".");

  name = name
    .normalize("NFD")
    // biome-ignore lint/suspicious/noMisleadingCharacterClass: <explanation>
    .replace(/[\u0300-\u036e]/g, "")
    .replace(/[^a-zA-Z0-9._-]/g, "_");

  if (name.length > maxLength) {
    name = name.substring(0, maxLength);
  }

  return `${name}.${extension}`;
};

export { mapToClientAmount, mapToDBAmount, sanitizeFilename, validateErrorInput };
