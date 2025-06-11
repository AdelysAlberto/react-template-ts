import type { FC, ReactNode } from "react";
import { useFormValidator } from "../../hooks/useForm.hook";

interface IBaseForm {
  id: string;
  children?: ReactNode;
  noValidate?: boolean;
}

const BaseForm: FC<IBaseForm> = ({ id, children, noValidate = true }) => {
  const { validateForm } = useFormValidator();
  return (
    <form
      onSubmit={validateForm}
      noValidate={noValidate}
      id={id}
    >
      {children}
    </form>
  );
};

export default BaseForm;
