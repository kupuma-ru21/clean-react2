import React, { useCallback, useEffect, useState } from 'react';
import { AddAccount } from '@/domain/usecases';
import {
  LoginHeader,
  Footer,
  Input,
  FormStatus,
} from '@/presentation/components';
import { Validation } from '@/presentation/procotols/validation';
import Context from '@/presentation/context/form/form-context';
import Styles from './signup-styles.scss';

type Props = { validation: Validation; addAccount: AddAccount };

const SignUp: React.VFC<Props> = ({ validation, addAccount }: Props) => {
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
      };
    });
  }, [state.name, validation]);
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
  useEffect(() => {
    setState((oldState) => {
      return {
        ...oldState,
        passwordConfirmationError: validation.validate(
          'passwordConfirmation',
          state.passwordConfirmation
        ),
      };
    });
  }, [state.passwordConfirmation, validation]);
  const handleSubmit = useCallback(
    async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
      event.preventDefault();
      setState((oldState) => ({ ...oldState, isLoading: true }));
      await addAccount.add({
        name: state.name,
        email: state.email,
        password: state.password,
        passwordConfirmation: state.passwordConfirmation,
      });
    },
    [
      addAccount,
      state.email,
      state.name,
      state.password,
      state.passwordConfirmation,
    ]
  );

  return (
    <div className={Styles.signup}>
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

          <button
            className={Styles.submit}
            disabled={
              !!state.nameError ||
              !!state.emailError ||
              !!state.passwordError ||
              !!state.passwordConfirmationError
            }
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
