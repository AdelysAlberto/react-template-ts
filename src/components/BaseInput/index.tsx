import React from "react";
import type { IBaseInput } from "./Input/baseInput.types";
import Input from "./Input/index";

type InputObject = {
  [key in NonNullable<IBaseInput["type"]>]: React.ReactElement;
};

const InputContainer = (props: IBaseInput) => {
  const inputs: InputObject = {
    text: (
      <Input
        type="text"
        {...props}
      />
    ),
    number: (
      <Input
        type="number"
        {...props}
      />
    ),
    password: (
      <Input
        type="password"
        {...props}
      />
    ),
    textArea: (
      <Input
        type="textArea"
        {...props}
      />
    ),
    textAreaPassword: (
      <Input
        type="textAreaPassword"
        {...props}
      />
    ),
    date: (
      <Input
        type="date"
        {...props}
      />
    ),
    email: (
      <Input
        type="email"
        placeholder="example@domain.com"
        {...props}
      />
    ),
    range: <></>,
  };

  return inputs[props?.type ?? "text"];
};

const BaseInput = React.memo(InputContainer);

export default BaseInput;
