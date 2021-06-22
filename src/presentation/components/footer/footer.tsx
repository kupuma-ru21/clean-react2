import React, { memo } from 'react';
import Styles from './footer-styles.scss';

const Footer: React.VFC = () => {
  return <footer className={Styles.footer} />;
};

export default memo(Footer);
