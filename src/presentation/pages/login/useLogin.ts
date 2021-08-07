import { useCallback, useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { Validation } from '@/presentation/procotols/validation';
import { ApiContext } from '@/presentation/context';
import { loginState } from '@/presentation/pages/login/components';
import { Authentication } from '@/domain/usecases';

type Props = { validation: Validation; authentication: Authentication };

type Return = {
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => Promise<void>;
};

export const useLogin = ({ validation, authentication }: Props): Return => {
  const [state, setState] = useRecoilState(loginState);

  useEffect(() => {
    setState((oldState) => {
      return {
        ...oldState,
        emailError: validation.validate('email', { email: state.email }),
      };
    });
  }, [setState, state.email, validation]);

  useEffect(() => {
    setState((oldState) => {
      return {
        ...oldState,
        passwordError: validation.validate('password', {
          password: state.password,
        }),
      };
    });
  }, [setState, state.password, validation]);

  useEffect(() => {
    setState((oldState) => {
      return {
        ...oldState,
        isFormInvalid: !!state.emailError || !!state.passwordError,
      };
    });
  }, [setState, state.emailError, state.passwordError]);

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
    [authentication, history, setCurrentAccount, setState, state]
  );

  return { handleSubmit };
};
