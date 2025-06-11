import type { TInputType } from "../baseInput.types";

const DEFAULT_DECIMALS = 3; // Default value for decimals (as if it were .00)
const DECIMAL_OFFSET = 1; // Offset to include the decimal point

export const determineMaxLength = (type: TInputType, maxLengthProp?: number, maxDecimals?: number): number | undefined => {
  const decimals = maxDecimals !== undefined ? maxDecimals + DECIMAL_OFFSET : DEFAULT_DECIMALS;

  if (maxLengthProp === undefined) {
    return undefined;
  }

  return type === "amount" ? maxLengthProp + decimals : maxLengthProp;
};
