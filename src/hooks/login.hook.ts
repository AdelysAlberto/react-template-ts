import { useMutation } from "@tanstack/react-query";
import { loginService } from "../services/myAccount/account.service";
import { useAuthStore } from "../store/useAuth.store";

const useLogin = () => {
  const login = useAuthStore(state => state.login);

  const { mutate, isPending, error, isError, isSuccess } = useMutation({
    mutationKey: ["login"],
    mutationFn: loginService,
    onSuccess: ({ data }) => {
      if (data) {
        login(data);
      }
    },
  });

  return {
    login: mutate,
    isPending,
    isError,
    error,
    isSuccess,
  };
};

export default useLogin;
