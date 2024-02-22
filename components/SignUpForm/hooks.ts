import { useAuthState } from "@/contexts/auth";
import { ISignUpFormValues } from "@/queries/type";
import { toastError } from "@/utils";
import { useCallback, useState } from "react";

interface IProps {
}

export const useSignUpFormHooks = () => {
  const { signUpWithEmail } = useAuthState();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [validPassword, setValidPassword] = useState<boolean>(false);

  const inititalValues: ISignUpFormValues = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    policy: false,
  };
  
  const onSubmitForm = async (values: ISignUpFormValues) => {
    try {
      if(!validPassword) {
        toastError('Password is invalid!');
        return;
      }
      signUpWithEmail(values);
    } catch (error) {
      //@ts-ignore
      toastError(error.message);
    }
  }

  const onToggleShowPassword = useCallback(() => {
    setShowPassword(!showPassword);
  }, [showPassword]);

  return {
    inititalValues,
    showPassword,
    onSubmitForm,
    setValidPassword,
    onToggleShowPassword,
  }
}