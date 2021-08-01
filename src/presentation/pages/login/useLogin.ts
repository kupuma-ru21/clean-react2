import { useCallback, useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Validation } from '@/presentation/procotols/validation';
import { ApiContext } from '@/presentation/context';
import { Authentication } from '@/domain/usecases';

type Props = { validation: Validation; authentication: Authentication };

type State = {
  isLoading: boolean;
  isFormInvalid: boolean;
  email: string;
  password: string;
  emailError: string;
  passwordError: string;
  mainError: string;
};
type SetState = React.Dispatch<React.SetStateAction<State>>;

type Return = {
  state: State;
  setState: SetState;
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => Promise<void>;
};

export const useLogin = ({ validation, authentication }: Props): Return => {
  const [state, setState] = useState({
    isLoading: false,
    isFormInvalid: true,
    email: '',
    password: '',
    emailError: '',
    passwordError: '必須項目です',
    mainError: '',
  });

  useEffect(() => {
    setState((oldState) => {
      return {
        ...oldState,
        emailError: validation.validate('email', { email: state.email }),
      };
    });
  }, [state.email, validation]);

  useEffect(() => {
    setState((oldState) => {
      return {
        ...oldState,
        passwordError: validation.validate('password', {
          password: state.password,
        }),
      };
    });
  }, [state.password, validation]);

  useEffect(() => {
    setState((oldState) => {
      return {
        ...oldState,
        isFormInvalid: !!state.emailError || !!state.passwordError,
      };
    });
  }, [state.emailError, state.passwordError]);

  const { setCurrentAccount } = useContext(ApiContext);
  const history = useHistory();
  const handleSubmit = useCallback(
    async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
      event.preventDefault();
      try {
        const { isLoading, isFormInvalid } = state;
        if (isLoading || isFormInvalid) return;

        setState((oldState) => ({ ...oldState, isLoading: true }));
        const { email, password } = state;
        const account = await authentication.auth({ email, password });
        setCurrentAccount(account);
        history.replace('/');
      } catch (error) {
        setState((oldState) => ({
          ...oldState,
          isLoading: false,
          mainError: error.message,
        }));
      }
    },
    [authentication, history, setCurrentAccount, state]
  );

  return { state, setState, handleSubmit };
};
