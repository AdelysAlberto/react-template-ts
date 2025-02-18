import BaseButton from "../../../components/BaseButton";

const LoginPage = () => {

  return (
    <div>
      <h1>Login</h1>
      <BaseButton
        title="Login"
        id="submit-login"
        onClick={() => console.log("login")}
        variant="primary"
      />
      <BaseButton
        title="secondary"
        id="submit-login"
        onClick={() => console.log("login")}
        variant="secondary"
      />
      <BaseButton
        title="danger"
        id="submit-login"
        onClick={() => console.log("login")}
        variant="danger"
      />
      <BaseButton
        title="disabled"
        id="submit-login"
        onClick={() => console.log("login")}
        variant="disabled"
      />
    </div>
  );
};

export default LoginPage;