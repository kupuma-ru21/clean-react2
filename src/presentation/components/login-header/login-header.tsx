import React, { memo } from 'react';
import Logo from '@/presentation/components/logo/logo';
import Styles from './login-header-styles.scss';

type Props = React.HTMLAttributes<HTMLSpanElement>;

const LoginHeader: React.VFC<Props> = (props: Props) => {
  return (
    <header className={Styles.header}>
      <Logo />
      <h1>4Dev - Enquetes para Programadores</h1>
    </header>
  );
};

export default memo(LoginHeader);