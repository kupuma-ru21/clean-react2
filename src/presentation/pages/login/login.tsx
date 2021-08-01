import React from 'react';
import { Link } from 'react-router-dom';
import { Authentication } from '@/domain/usecases';
import {
  LoginHeader,
  Footer,
  Input,
  FormStatus,
  SubmitButton,
} from '@/presentation/components';
import { FormContext } from '@/presentation/context';
import { Validation } from '@/presentation/procotols/validation';
import Styles from './login-styles.scss';
import { useLogin } from './useLogin';

type Props = { validation: Validation; authentication: Authentication };

const Login: React.VFC<Props> = (props: Props) => {
  const { state, setState, handleSubmit } = useLogin(props);

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
