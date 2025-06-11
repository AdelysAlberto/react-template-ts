import { useSignal } from "@preact/signals-react";
import type React from "react";
import { useEffect } from "react";

import { toFixed } from "../../../utils/toFixed.ts";
import { mapToClientAmount, mapToDBAmount } from "../../../utils/utils.ts";
import type { IBaseInput } from "../Input/baseInput.types.ts";
import BaseInput from "../Input/index.tsx";
import styles from "./styles/amountInput.module.css";

const DEFAULT_DECIMALS = 2;

interface IAmountInput extends IBaseInput {
  positionNumber: number;
  coin: string;
  maxDecimals?: number;
  readOnly?: boolean;
  maxLength?: number;
}

export const AmountInput: React.FC<IAmountInput> = props => {
  const { value, onChange, positionNumber, coin, maxDecimals = 2, readOnly, maxLength = 7, placeholder = "0.00", ...rest } = props;

  const valueConversion = mapToClientAmount(value);

  const newDecimalValue = useSignal<string>(toFixed(valueConversion, maxDecimals));

  useEffect(() => {
    if (value !== mapToDBAmount(newDecimalValue.value)) {
      newDecimalValue.value = toFixed(valueConversion, maxDecimals);
    }
  }, [value]);

  const onChangeHandler = (e: string) => {
    if (e === "") {
      newDecimalValue.value = ""; // Asegurarse de que el valor también se actualice
      return onChange?.("");
    }

    const regex = new RegExp(`^-?([0-9]+([.][0-9]{0,${maxDecimals}})?)?$`);
    if (!regex.test(e)) {
      return;
    }
    newDecimalValue.value = e;
    console.log(`[DEBUG][LIB AMOUNT][48] Before to convert to DB: ${e}`);
    const valueConverted = mapToDBAmount(e);
    console.log(`[DEBUG][LIB AMOUNT][51] valueConverted to DB: ${valueConverted}`);
    onChange?.(valueConverted);
  };

  const onBlurHandler = (e: string) => {
    if (e === "" || e === null || e === undefined) {
      return;
    }
    if (!e.includes(".") || e.endsWith(".") || e.split(".")[1]?.length <= 1) {
      newDecimalValue.value = Number(e).toFixed(DEFAULT_DECIMALS);
    }
  };

  return (
    <>
      {readOnly ? (
        <div className={styles.readOnlyContainer}>
          {positionNumber === 1 && <span>{coin}</span>}
          <p className={styles.readOnlyContainer__amount}>{`${toFixed(valueConversion, maxDecimals)}`}</p>
          {positionNumber === 2 && <span>{coin}</span>}
        </div>
      ) : (
        <BaseInput
          {...rest}
          maxLength={maxLength}
          type="text"
          value={value ? newDecimalValue.value : ""}
          onChange={onChangeHandler}
          placeholder={placeholder}
          onBlur={onBlurHandler}
          readOnly={readOnly}
          className={readOnly ? styles.readOnlyAmount : ""}
        />
      )}
    </>
  );
};

export default AmountInput;
