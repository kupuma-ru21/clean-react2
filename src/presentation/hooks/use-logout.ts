import { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { ApiContext } from '@/presentation/context';

type ResultType = () => void;

export const useLogout = (): ResultType => {
  const { setCurrentAccount } = useContext(ApiContext);
  const history = useHistory();

  return (): void => {
    setCurrentAccount(undefined);
    history.replace('/login');
  };
};
