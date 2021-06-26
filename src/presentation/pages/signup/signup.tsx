import React from 'react';
import { Link } from 'react-router-dom';
import {
  LoginHeader,
  Footer,
  Input,
  FormStatus,
} from '@/presentation/components';
import Context from '@/presentation/context/form/form-context';
import Styles from './signup-styles.scss';

const SignUp: React.VFC = () => {
  return (
    <div className={Styles.signup}>
      <LoginHeader />
      <Context.Provider value={{ state: {} }}>
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
            name="passwordConfimation"
            placeholder="パスワードを再度、入力してください"
          />

          <button className={Styles.submit} type="submit">
            Entar
          </button>
          <Link to="/login" className={Styles.link}>
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
