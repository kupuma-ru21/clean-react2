import React from 'react';
import { Link } from 'react-router-dom';
import {
  LoginHeader,
  Footer,
  Input,
  FormStatus,
  SubmitButton,
} from '@/presentation/components';
import Context from '@/presentation/context/form/form-context';
import { useSignup } from './useSignup';
import type { Props } from './useSignup';
import Styles from './signup-styles.scss';

const SignUp: React.VFC<Props> = ({
  validation,
  addAccount,
  saveAccessToken,
}: Props) => {
  const { state, setState, handleSubmit } = useSignup({
    validation,
    addAccount,
    saveAccessToken,
  });

  return (
    <div className={Styles.signupWrap}>
      <LoginHeader />
      <Context.Provider value={{ state, setState }}>
        <form
          className={Styles.form}
          onSubmit={handleSubmit}
          data-testid="form"
        >
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
          <SubmitButton text="登録" />
          <Link
            className={Styles.link}
            data-testid="login-link"
            replace
            to="/login"
          >
            ログインに戻る
          </Link>
          <FormStatus />
        </form>
      </Context.Provider>
      <Footer />
    </div>
  );
};

export default SignUp;
