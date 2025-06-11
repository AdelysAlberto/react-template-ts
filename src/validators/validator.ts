import { z } from "zod";
import { schemaEmailRequired, schemaMax, schemaMin, schemaNumber, schemaRequired } from "./schemas";

const validateRequired = (element: HTMLInputElement) => {
  const { value } = element;

  const result = schemaRequired.safeParse(value);

  if (!result.success) {
    return result.error.errors[0].message; // Devuelves "thisFieldIsRequired"
  }

  return null;
};

const validateEmail = (element: HTMLInputElement) => {
  const { value } = element;

  const result = schemaEmailRequired.safeParse(value.trim());

  if (!result.success) {
    return result.error.errors[0].message; // "emailFormatInvalid"
  }

  return null; // Validación OK
};

const validateNumber = (element: HTMLInputElement) => {
  const { value } = element;

  const result = schemaNumber.safeParse(value.trim());

  if (!result.success) {
    return result.error.errors[0].message; // "Debe ser un número válido."
  }
  return null; // Validación OK
};

const validateMinMaxLength = (element: HTMLInputElement) => {
  const { value, minLength, maxLength } = element;
  //const nameElement = id || name || "campo";

  let schema = z.string();

  if (minLength > 0) {
    schema = schemaMin(minLength);
  }

  if (maxLength > 0) {
    schema = schemaMax(maxLength);
  }

  const result = schema.safeParse(value);

  if (!result.success) {
    return result.error.errors[0].message;
  }

  return null;
};

export { validateEmail, validateMinMaxLength, validateNumber, validateRequired };
