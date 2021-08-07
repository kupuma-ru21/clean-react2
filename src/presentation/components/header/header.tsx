import React, { memo, useCallback } from 'react';
import { useRecoilValue } from 'recoil';
import { Logo, currentAccountState } from '@/presentation/components';
import { useLogout } from '@/presentation/hooks';
import Styles from './header-styles.scss';

const Header: React.FC = () => {
  const { getCurrentAccount } = useRecoilValue(currentAccountState);
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
