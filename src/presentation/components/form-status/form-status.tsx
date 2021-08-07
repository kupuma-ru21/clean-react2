import React from 'react';
import { Spinner } from '@/presentation/components';
import Styles from './form-status-styles.scss';

type Props = { state: any };

const FormStatus: React.VFC<Props> = ({ state }: Props) => {
  const { isLoading, mainError } = state;
  return (
    <div data-testid="error-wrap" className={Styles.errorWrap}>
      {isLoading && <Spinner className={Styles.spinner} />}
      {mainError && (
        <span className={Styles.error} data-testid="main-error">
          {mainError}
        </span>
      )}
    </div>
  );
};

export default FormStatus;
