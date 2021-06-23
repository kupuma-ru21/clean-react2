import React, { useState, useEffect, useCallback } from 'react';
import { Authentication } from '@/domain/usecases';
import {
  LoginHeader,
  Footer,
  Input,
  FormStatus,
} from '@/presentation/components';
import Context from '@/presentation/context/form/form-context';
import { Validation } from '@/presentation/procotols/validation';
import Styles from './login-styles.scss';

type Props = { validation: Validation; authentication: Authentication };

const Login: React.VFC<Props> = ({ validation, authentication }: Props) => {
  const [state, setState] = useState({
    isLoading: false,
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
        emailError: validation.validate('email', state.email),
      };
    });
  }, [state.email, validation]);

  useEffect(() => {
    setState((oldState) => {
      return {
        ...oldState,
        passwordError: validation.validate('password', state.password),
      };
    });
  }, [state.password, validation]);

  const handleSubmit = useCallback(
    async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
      event.preventDefault();
      const { isLoading } = state;
      if (isLoading) return;
      setState((oldState) => ({ ...oldState, isLoading: true }));
      const { email, password } = state;
      await authentication.auth({ email, password });
    },
    [authentication, state]
  );

  return (
    <div className={Styles.login}>
      <LoginHeader />
      <Context.Provider value={{ state, setState }}>
        <form className={Styles.form} onSubmit={handleSubmit}>
          <h2>Login</h2>

          <Input type="email" name="email" placeholder="Digite seu e-mail" />
          <Input
            type="password"
            name="password"
            placeholder="Digite sua senha"
          />

          <button
            data-testid="submit"
            disabled={!!state.emailError || !!state.passwordError}
            className={Styles.submit}
            type="submit"
          >
            Entar
          </button>
          <span className={Styles.link}>criar conta</span>
          <FormStatus />
        </form>
      </Context.Provider>
      <Footer />
    </div>
  );
};

export default Login;
