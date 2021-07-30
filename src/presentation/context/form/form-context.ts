import { createContext } from 'react';

export type LoginState = {
  isLoading: boolean;
  isFormInvalid: boolean;
  email: string;
  password: string;
  emailError: string;
  passwordError: string;
  mainError: string;
};

type SetState = React.Dispatch<React.SetStateAction<LoginState>>;

export default createContext<{ state: LoginState; setState: SetState }>(null);
