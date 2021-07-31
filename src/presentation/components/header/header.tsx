import React, { memo, useCallback, useContext } from 'react';
import { Logo } from '@/presentation/components';
import { useLogout } from '@/presentation/hooks';
import { ApiContext } from '@/presentation/context';
import Styles from './header-styles.scss';

const Header: React.FC = () => {
  const { getCurrentAccount } = useContext(ApiContext);
  const logout = useLogout();
  const buttonClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>): void => {
      e.preventDefault();
      logout();
    },
    [logout]
  );

  return (
    <header className={Styles.headerWrap}>
      <div className={Styles.headerContent}>
        <Logo />
        <div className={Styles.logoutWrap}>
          <span data-testid="username">{getCurrentAccount().name}</span>
          <a data-testid="logout" href="#" onClick={buttonClick}>
            Sair
          </a>
        </div>
      </div>
    </header>
  );
};

export default memo(Header);
