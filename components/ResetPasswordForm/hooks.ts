import { ROUTERS } from "@/constants";
import { useAuthState } from "@/contexts/auth";
import { useRouter } from "next/router";
import { useCallback, useState } from "react";

interface IProps {
}

interface IResetPasswordValues {
    password: string;
    confirmPassword: string;
}

export const useResetPasswordHooks = () => {
  const { resetPassword } = useAuthState();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const route = useRouter();

  const inititalValues: IResetPasswordValues = {
    password: "",
    confirmPassword: "",
  };
  
  const onSubmitForm = async (values: IResetPasswordValues) => {
    if(route.query?.oobCode) {
      resetPassword(route.query?.oobCode as string, values.password);
    }
  }

  const onToggleShowPassword = useCallback(() => {
    setShowPassword(!showPassword);
  }, [showPassword]);

  const onGotoSignUp = useCallback(() => {
    route.push(ROUTERS.login);
  }, []);

  return {
    inititalValues,
    showPassword,
    onSubmitForm,
    onToggleShowPassword,
    onGotoSignUp
  }
}