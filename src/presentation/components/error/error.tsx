import React from 'react';
import Styles from './error-styles.scss';

type Props = { error: string; reload: () => void };

const Error: React.VFC<Props> = ({ error, reload }: Props) => {
  return (
    <div className={Styles.errorWrap}>
      <span data-testid="error">{error}</span>
      <button data-testid="reload" onClick={reload}>
        Reload
      </button>
    </div>
  );
};

export default Error;
