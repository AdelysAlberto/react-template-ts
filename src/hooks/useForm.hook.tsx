import { type FormEvent, useState } from "react";
import { useTranslation } from "react-i18next";
import useErrorStore from "../store/useErrorStore.store";
import { validateEmail, validateMinMaxLength, validateNumber, validateRequired } from "../validators/validator";

type ValidatorFn = {
  required: (value: HTMLInputElement) => string | null;
  email: (value: HTMLInputElement) => string | null;
  number: (value: HTMLInputElement) => string | null;
  validateMinMaxLength: (value: HTMLInputElement) => string | null;
};

const validators: ValidatorFn = {
  required: value => validateRequired(value),
  email: value => validateEmail(value),
  number: value => validateNumber(value),
  validateMinMaxLength: value => validateMinMaxLength(value),
  // puedes agregar más validadores como: minLength, maxLength, regex, etc.
};

type Errors = Record<string, string>;

export const useFormValidator = (cb: () => void) => {
  const { t } = useTranslation();
  const [isError, setIsError] = useState(false);
  const setError = useErrorStore(state => state.setError);
  const clearError = useErrorStore(state => state.clearError);
  const [data, setData] = useState<Record<string, string>[]>([]);

  const validateForm = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;

    const elements = Array.from(form.elements) as HTMLInputElement[];
    const newErrors: Errors = {};
    const arrayData: Record<string, string>[] = [];

    elements.forEach(element => {
      const { id, max, min, maxLength, minLength, required, type } = element;

      if (type === "submit") return;
      //console.log(id, value, type);
      const name = element.name || id;
      const rawRules = element.dataset.validate;
      if (!name) return;

      const rules = rawRules ? rawRules.split(",").map(r => r.trim()) : [];

      (maxLength || minLength) && rules.push("validateMinMaxLength");
      type === "email" && rules.push("email");
      min && rules.push("min");
      max && rules.push("max");
      required && rules.push("required");

      for (const rule of rules) {
        const validator = validators[rule as keyof ValidatorFn];
        let error: string | null = "";
        if (validator) {
          error = validator(element);
          if (error) {
            element.style.border = "1px solid red";
            newErrors[name] = t(error);
            break;
          }
        }

        if (Object.keys(newErrors).length === 0) {
          element.style.border = "";
          clearError();
        }
      }
      if (Object.keys(newErrors).length > 0) return;

      arrayData.push({ [name]: element.value });
    });
    setData(arrayData);

    setError({ ...newErrors });

    setIsError(Object.keys(newErrors).length > 0);

    if (Object.keys(newErrors).length === 0) {
      console.log("No errors found for:", name);
      cb();
    }

    return Object.keys(newErrors).length === 0; // true si no hay errores
  };

  return { validateForm, isError, data };
};
