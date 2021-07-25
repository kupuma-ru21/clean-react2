import React, { useCallback, useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { AddAccount } from '@/domain/usecases';
import { Validation } from '@/presentation/procotols/validation';
import { ApiContext } from '@/presentation/context';

export type Props = { validation: Validation; addAccount: AddAccount };

type State = {
  isLoading: boolean;
  isFormInvalid: boolean;
  name: string;
  email: string;
  password: string;
  passwordConfirmation: string;
  nameError: string;
  emailError: string;
  passwordError: string;
  passwordConfirmationError: string;
  mainError: string;
};

type SetState = React.Dispatch<React.SetStateAction<State>>;
type HandleSubmit = (event: React.FormEvent<HTMLFormElement>) => Promise<void>;
type Return = { state: State; setState: SetState; handleSubmit: HandleSubmit };

export const useSignup = ({ validation, addAccount }: Props): Return => {
  const [state, setState] = useState<State>({
    isLoading: false,
    isFormInvalid: true,
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

  const validate = useCallback(
    (field: string): void => {
      const { name, email, password, passwordConfirmation } = state;
      const formdata = { name, email, password, passwordConfirmation };
      setState((oldState) => ({
        ...oldState,
        [`${field}Error`]: validation.validate(field, formdata),
      }));
    },
    [state, validation]
  );
  useEffect(() => {
    validate('name');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.name]);
  useEffect(() => {
    validate('email');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.email]);
  useEffect(() => {
    validate('password');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.password]);
  useEffect(() => {
    validate('passwordConfirmation');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.passwordConfirmation]);
  useEffect(() => {
    setState((oldState) => {
      return {
        ...oldState,
        isFormInvalid:
          !!state.nameError ||
          !!state.emailError ||
          !!state.passwordError ||
          !!state.passwordConfirmationError,
      };
    });
  }, [
    state.emailError,
    state.nameError,
    state.passwordConfirmationError,
    state.passwordError,
  ]);

  const history = useHistory();
  const { setCurrentAccount } = useContext(ApiContext);
  const handleSubmit: HandleSubmit = useCallback(
    async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
      event.preventDefault();

      try {
        const { isLoading, isFormInvalid } = state;
        if (isLoading || isFormInvalid) return;

        const { name, email, password, passwordConfirmation } = state;
        setState((oldState) => ({ ...oldState, isLoading: true }));
        const account = await addAccount.add({
          name,
          email,
          password,
          passwordConfirmation,
        });
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
    [addAccount, history, setCurrentAccount, state]
  );

  return { state, setState, handleSubmit };
};
