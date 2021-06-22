import React, { useState, useEffect } from 'react';
import Styles from './login-styles.scss';
import {
  LoginHeader,
  Footer,
  Input,
  FormStatus,
} from '@/presentation/components';
import Context from '@/presentation/context/form/form-context';
import { Validation } from '@/presentation/procotols/validation';

type Props = { validation: Validation };

const Login: React.VFC<Props> = ({ validation }: Props) => {
  const [state, setState] = useState({
    isLoading: false,
    email: '',
    emailError: '必須項目です',
    passwordError: '必須項目です',
    mainError: '',
  });

  useEffect(() => {
    validation.validate({ email: state.email });
  }, [state.email]);

  return (
    <div className={Styles.login}>
      <LoginHeader />
      <Context.Provider value={{ state, setState }}>
        <form className={Styles.form}>
          <h2>Login</h2>

          <Input type="email" name="email" placeholder="Digite seu e-mail" />
          <Input
            type="password"
            name="password"
            placeholder="Digite sua senha"
          />

          <button
            data-testid="submit"
            disabled
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
