import React from 'react';
import { Spinner } from '@/presentation/components';
import Styles from './loading-styles.scss';

const Loading: React.VFC = () => {
  return (
    <div className={Styles.loadingWrap}>
      <div className={Styles.loading}>
        <span>loading...</span>
        <Spinner isNegative={true} />
      </div>
    </div>
  );
};

export default Loading;
