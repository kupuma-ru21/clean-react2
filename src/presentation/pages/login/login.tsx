import React from 'react';
import { Link } from 'react-router-dom';
import { Authentication } from '@/domain/usecases';
import { LoginHeader, Footer } from '@/presentation/components';
import { Validation } from '@/presentation/procotols/validation';
import {
  Input,
  SubmitButton,
  FormStatus,
} from '@/presentation/pages/login/components';
import Styles from './login-styles.scss';
import { useLogin } from './useLogin';

type Props = { validation: Validation; authentication: Authentication };

const Login: React.VFC<Props> = (props: Props) => {
  const { handleSubmit } = useLogin(props);

  return (
    <div className={Styles.loginWrap}>
      <LoginHeader />
      <form className={Styles.form} onSubmit={handleSubmit} data-testid="form">
        <h2>Login</h2>

        <Input type="email" name="email" placeholder="Digite seu e-mail" />
        <Input type="password" name="password" placeholder="Digite sua senha" />
        <SubmitButton text="ログイン" />
        <Link data-testid="signup-link" to="/signup" className={Styles.link}>
          criar conta
        </Link>
        <FormStatus />
      </form>
      <Footer />
    </div>
  );
};

export default Login;
