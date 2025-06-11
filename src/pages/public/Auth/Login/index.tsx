import { useTranslation } from "react-i18next";
import { BaseButton, BaseInput, BaseLink, BaseMessage, Typography } from "../../../../components";

import { useFormValidator } from "../../../../hooks/useForm.hook";
import useErrorStore from "../../../../store/useErrorStore.store";
import styles from "./login.module.css";

const LoginPage = () => {
  const { t } = useTranslation();

  const { validateForm, isError } = useFormValidator();

  const error = useErrorStore(state => state.error);

  return (
    <>
      <div className="mb-10">
        <Typography type={"h1"}>{t("loginYourAccount")}</Typography>
      </div>

      {isError && Object.values(error).length > 0 && (
        <BaseMessage
          message={Object.values(error)[0]}
          type={"error"}
          icon={"icon-error"}
        />
      )}

      <div className={styles.grid}>
        <form
          onSubmit={validateForm}
          id="form"
          noValidate
        >
          <div className={styles.divider}>
            <BaseInput
              label="userName"
              id="email"
              type="email"
              required
              className="mb-2"
            />

            <BaseLink
              to="/forgot-password"
              label={"forgotUsername"}
              chevronRight
            />

            <BaseInput
              label="Password"
              id="password"
              type="password"
              required
              className="mt-4 mb-2"
              minLength={2}
              maxLength={12}
            />

            <BaseLink
              to="/forgot-password"
              label={"forgoPassword"}
              className="mb-4"
              chevronRight
            />

            <BaseButton
              title={t("login")}
              id="submit-login"
              type="submit"
              variant={"primary"}
              className="w-100"
              gaEvent={{
                category: "login",
                action: "submit",
              }}
            />
          </div>
        </form>

        <div>
          <Typography
            type={"h2"}
            className={styles.marginBottom}
          >
            {t("loginDontHaveAccount")}
          </Typography>

          <Typography className={styles.marginBottom}>{t("loginSetupAccount")}</Typography>

          <ul>
            <li>
              <Typography inLine>{t("textCheckAndManageYourAccount")}</Typography>
            </li>
          </ul>

          <Typography className={`${styles.marginTop} mb-24`}>It only takes a few minutes to sign up.</Typography>

          <BaseButton
            id="view-account"
            form={"form"}
            title="View account and pass options"
            variant="tertiary"
            type="submit"
          />
        </div>
      </div>
    </>
  );
};

export default LoginPage;
