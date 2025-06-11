import { useTranslation } from "react-i18next";
import { BaseButton, BaseInput, BaseLink, BaseMessage, Typography } from "../../../../components";
import { useFormValidator } from "../../../../hooks/useForm.hook";
import useErrorStore from "../../../../store/useErrorStore.store";

const ForgotUsername = () => {
  const { t } = useTranslation();
  const { validateForm, isError } = useFormValidator();

  const error = useErrorStore(state => state.error);

  return (
    <>
      <BaseLink
        to="/login"
        className="forgot-password-back-link"
        label="Back to log in"
        chevronLeft
      />

      <Typography type={"h1"}>{t("resetYourPassword")}</Typography>

      <Typography className="mb-4">{t("enterEmailToSendPassword")}</Typography>

      {isError && Object.values(error).length > 0 && (
        <BaseMessage
          message={Object.values(error)[0]}
          type={"error"}
          icon={"icon-error"}
        />
      )}

      <form
        onSubmit={validateForm}
        className="forgot-password-form"
        noValidate
      >
        <BaseInput
          id="email"
          name="email"
          label="Email"
          type="email"
          required
          placeholder={t("enterYourEmail")}
        />
        <BaseButton
          type="submit"
          className="mt-4"
          id="submit"
          variant="secondary"
          title={t("resetPassword")}
        />
      </form>
    </>
  );
};

export default ForgotUsername;
