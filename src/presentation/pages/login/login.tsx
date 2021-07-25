import React, { useState, useEffect, useCallback, useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Authentication } from '@/domain/usecases';
import {
  LoginHeader,
  Footer,
  Input,
  FormStatus,
  SubmitButton,
} from '@/presentation/components';
import { FormContext, ApiContext } from '@/presentation/context';
import { Validation } from '@/presentation/procotols/validation';
import Styles from './login-styles.scss';

type Props = { validation: Validation; authentication: Authentication };

const Login: React.VFC<Props> = ({ validation, authentication }: Props) => {
  const { setCurrentAccount } = useContext(ApiContext);
  const history = useHistory();
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

  return (
    <div className={Styles.loginWrap}>
      <LoginHeader />
      <FormContext.Provider value={{ state, setState }}>
        <form
          className={Styles.form}
          onSubmit={handleSubmit}
          data-testid="form"
        >
          <h2>Login</h2>

          <Input type="email" name="email" placeholder="Digite seu e-mail" />
          <Input
            type="password"
            name="password"
            placeholder="Digite sua senha"
          />
          <SubmitButton text="ログイン" />
          <Link data-testid="signup-link" to="/signup" className={Styles.link}>
            criar conta
          </Link>
          <FormStatus />
        </form>
      </FormContext.Provider>
      <Footer />
    </div>
  );
};

export default Login;
