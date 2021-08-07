import React, { useCallback, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useRecoilState, useRecoilValue } from 'recoil';
import { currentAccountState } from '@/presentation/components';
import { AddAccount } from '@/domain/usecases';
import { Validation } from '@/presentation/procotols/validation';
import { signUpState } from './components';

export type Props = { validation: Validation; addAccount: AddAccount };

type HandleSubmit = (event: React.FormEvent<HTMLFormElement>) => Promise<void>;
type Return = { handleSubmit: HandleSubmit };

export const useSignup = ({ validation, addAccount }: Props): Return => {
  const [state, setState] = useRecoilState(signUpState);

  const validate = useCallback(
    (field: string): void => {
      const { name, email, password, passwordConfirmation } = state;
      const formdata = { name, email, password, passwordConfirmation };
      setState((oldState) => ({
        ...oldState,
        [`${field}Error`]: validation.validate(field, formdata),
      }));
    },
    [setState, state, validation]
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
    setState,
    state.emailError,
    state.nameError,
    state.passwordConfirmationError,
    state.passwordError,
  ]);

  const history = useHistory();
  const { setCurrentAccount } = useRecoilValue(currentAccountState);
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
    [addAccount, history, setCurrentAccount, setState, state]
  );

  return { handleSubmit };
};
