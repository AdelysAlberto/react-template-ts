import BaseButton from "../../../components/BaseButton";
import BaseInput from "../../../components/BaseInput";

const LoginPage = () => {

  return (
    <div>
      <h1>Login</h1>
      <br />
      <BaseInput
        label="Email"
        id="email"
        type="email"
        size="large"
        placeholder="Enter your email"
        onChange={(e) => console.log(e.target.value)}
        className="mb-3"
      />

      <BaseInput
        label="Password"
        id="password"
        type="password"
        size="large"
        placeholder="Enter your password"
        onChange={(e) => console.log(e.target.value)}
        className="mb-3"
      />

      <div className="w-100">
        <BaseButton
          title="Login"
          id="submit-login"
          onClick={() => console.log("login")}
          variant="primary"
          className="w-100"
        />
      </div>

    </div>
  );
};

export default LoginPage;