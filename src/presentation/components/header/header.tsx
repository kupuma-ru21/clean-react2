import React, { memo, useCallback, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { Logo } from '@/presentation/components';
import { ApiContext } from '@/presentation/context';
import Styles from './header-styles.scss';

const Header: React.FC = () => {
  const { setCurrentAccount, getCurrentAccount } = useContext(ApiContext);
  const history = useHistory();
  const logout = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>): void => {
      e.preventDefault();
      setCurrentAccount(undefined);
      history.replace('/login');
    },
    [history, setCurrentAccount]
  );

  return (
    <header className={Styles.headerWrap}>
      <div className={Styles.headerContent}>
        <Logo />
        <div className={Styles.logoutWrap}>
          <span data-testid="username">{getCurrentAccount().name}</span>
          <a data-testid="logout" href="#" onClick={logout}>
            Sair
          </a>
        </div>
      </div>
    </header>
  );
};

export default memo(Header);
