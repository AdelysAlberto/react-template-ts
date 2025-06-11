import image from "@/assets/images/phone-home.png"; // Adjust the path as necessary
import { BaseButton, BaseInput, BaseLink, BaseMessage } from "@/components";
import { useFormValidator } from "@/hooks/useForm.hook";
import useErrorStore from "@/store/useErrorStore.store";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import styles from "./home.module.css";

const Home = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const errorState = useErrorStore(state => state.error);
  const { t } = useTranslation();

  const handleSubmit = () => {
    console.log("Form submitted with:", { email, password, data });
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
    }, 1200);

    navigate("/home");
  };

  const { validateForm, data, isError } = useFormValidator(handleSubmit);

  return (
    <main className={`${styles.container}`}>
      <section className={`${styles.main__image} yellowtail-regular text-white text-6xl `}>
        <img
          src={image}
          alt={t("Login")}
          className={styles.logo}
        />
      </section>

      <section className={styles.main}>
        <h2 className={`${styles.main__title} yellowtail-regular text-white text-6xl mb-9`}>{t("Login")}</h2>

        {isError && (
          <BaseMessage
            message={errorState.message}
            type="error"
          />
        )}
        <form
          className={styles.Form}
          onSubmit={validateForm}
          autoComplete="on"
          noValidate
        >
          <BaseInput
            id="email"
            name="email"
            type="email"
            placeholder={t("email")}
            value={email}
            onChange={setEmail}
            required
            label={t("email")}
            className="mb-4"
          />
          <BaseInput
            id="password"
            name="password"
            type="password"
            placeholder={t("password")}
            label={t("password")}
            value={password}
            onChange={setPassword}
            required
          />
          <div className={styles.forgot__password}>
            <BaseLink
              to="/forgot-password"
              label={t("forgot_password")}
              className={styles.Forgot}
            />
          </div>
          <BaseButton
            id="login-button"
            type="submit"
            title={t("sign_in")}
            variant="primary"
            size="large"
            className={styles.SignInBtn}
            isLoading={loading}
          />
        </form>
        <div className={`${styles.notice__login} mt-4`}>
          <span className={styles.line} />
          <span>{t("sign_in_with")}</span>
          <span className={styles.line} />
        </div>
        <div className={styles.social__row}>
          <BaseButton
            id="login-facebook"
            variant="primary"
            icon="icon-google"
            iconWidth="24"
            iconHeight="24"
            title={t("google")}
            ariaLabel={t("sign_in_with_google")}
            className={styles.social__btn}
            size="large"
          />
          <BaseButton
            id="login-instagram"
            variant="primary"
            icon="icon-instagram"
            iconWidth="24"
            iconHeight="24"
            title={t("instagram")}
            ariaLabel={t("sign_in_with_instagram")}
            className={styles.social__btn}
            size="large"
          />
        </div>
        <div className={`${styles.signup__row} mt-8`}>
          <span>{t("not_have_an_account")}</span>
          <BaseLink
            to="/signup"
            label={t("sign_up")}
            className={styles.SignupLink}
          />
        </div>
      </section>
    </main>
  );
};

export default Home;
