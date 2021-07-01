import React, { useCallback, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { AddAccount, SaveAccessToken } from '@/domain/usecases';
import { Validation } from '@/presentation/procotols/validation';

export type Props = {
  validation: Validation;
  addAccount: AddAccount;
  saveAccessToken: SaveAccessToken;
};

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

export const useSignup = ({
  validation,
  addAccount,
  saveAccessToken,
}: Props): Return => {
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

  useEffect(() => {
    setState((oldState) => {
      return {
        ...oldState,
        nameError: validation.validate('name', { name: state.name }),
      };
    });
  }, [state.name, validation]);
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
        passwordConfirmationError: validation.validate('passwordConfirmation', {
          passwordConfirmation: state.passwordConfirmation,
        }),
      };
    });
  }, [state.passwordConfirmation, validation]);
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
  const handleSubmit: HandleSubmit = useCallback(
    async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
      event.preventDefault();

      try {
        const { isLoading, isFormInvalid } = state;
        if (isLoading || isFormInvalid) return;

        const { name, email, password, passwordConfirmation } = state;
        setState((oldState) => ({ ...oldState, isLoading: true }));
        const { accessToken } = await addAccount.add({
          name,
          email,
          password,
          passwordConfirmation,
        });
        await saveAccessToken.save(accessToken);
        history.replace('/');
      } catch (error) {
        setState((oldState) => ({
          ...oldState,
          isLoading: false,
          mainError: error.message,
        }));
      }
    },
    [addAccount, history, saveAccessToken, state]
  );

  return { state, setState, handleSubmit };
};
