import React, { useEffect, useState } from 'react';
import {
  LoginHeader,
  Footer,
  Input,
  FormStatus,
} from '@/presentation/components';
import { Validation } from '@/presentation/procotols/validation';
import Context from '@/presentation/context/form/form-context';
import Styles from './signup-styles.scss';

type Props = { validation: Validation };

const SignUp: React.VFC<Props> = ({ validation }: Props) => {
  const [state, setState] = useState({
    isLoading: false,
    name: '',
    email: '',
    password: '',
    passwordConfirmation: '',
    nameError: '',
    emailError: '',
    passwordError: '',
    passwordConfirmationError: '',
    mainError: '',
  });

  useEffect(() => {
    setState((oldState) => {
      return {
        ...oldState,
        nameError: validation.validate('name', state.name),
        emailError: validation.validate('email', state.email),
        passwordError: validation.validate('password', state.password),
        passwordConfirmationError: validation.validate(
          'passwordConfirmation',
          state.passwordConfirmation
        ),
      };
    });
  }, [
    state.email,
    state.name,
    state.password,
    state.passwordConfirmation,
    validation,
  ]);

  return (
    <div className={Styles.signup}>
      <LoginHeader />
      <Context.Provider value={{ state, setState }}>
        <form className={Styles.form}>
          <h2>アカウントを作成する</h2>

          <Input type="text" name="name" placeholder="名前を入力してください" />
          <Input
            type="email"
            name="email"
            placeholder="メールアドレスを入力してください"
          />
          <Input
            type="password"
            name="password"
            placeholder="パスワードを入力してください"
          />
          <Input
            type="password"
            name="passwordConfirmation"
            placeholder="パスワードを再度、入力してください"
          />

          <button
            className={Styles.submit}
            disabled
            type="submit"
            data-testid="submit"
          >
            Entar
          </button>
          <span className={Styles.link}>ログインに戻る</span>
          <FormStatus />
        </form>
      </Context.Provider>
      <Footer />
    </div>
  );
};

export default SignUp;
