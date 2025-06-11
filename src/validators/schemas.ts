import { z } from "zod";

const schemaRequired = z.string().nonempty("thisFieldIsRequired");
const schemaEmail = z.string().email("emailFormatInvalid");
const schemaEmailRequired = z.string().email("emailFormatInvalid").nonempty("thisFieldIsRequired");
const schemaNumber = z.string().refine(val => !Number.isNaN(Number(val)) && val.trim() !== "", {
  message: "Debe ser un número válido.",
});

const schemaMin = (min: number) =>
  z.string().min(min, {
    message: `El campo debe tener al menos ${min} caracteres.`,
  });
const schemaMax = (max: number) =>
  z.string().max(max, {
    message: `El campo debe tener menos de ${max} caracteres.`,
  });

const schemaMinMax = (min: number, max: number) => z.string().min(min).max(max);
const schemaMinMaxLength = (min: number, max: number) => z.string().min(min).max(max);
const schemaMinMaxLengthRequired = (min: number, max: number) => z.string().min(min).max(max).nonempty("thisFieldIsRequired");

export { schemaEmail, schemaEmailRequired, schemaMax, schemaMin, schemaMinMax, schemaMinMaxLength, schemaMinMaxLengthRequired, schemaNumber, schemaRequired };
