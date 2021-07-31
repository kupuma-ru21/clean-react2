import { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { AccessDeniedError } from '@/domain/errors';
import { ApiContext } from '@/presentation/context';

type CallbackType = (error: Error) => void;
type ResultType = CallbackType;

export const useErrorHandler = (callback: CallbackType): ResultType => {
  const { setCurrentAccount } = useContext(ApiContext);
  const history = useHistory();

  return (error: Error): void => {
    if (error instanceof AccessDeniedError) {
      setCurrentAccount(undefined);
      history.replace('/login');
      return;
    }

    callback(error);
  };
};
