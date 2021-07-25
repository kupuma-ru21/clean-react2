import React, { useContext } from 'react';
import { Spinner } from '@/presentation/components';
import Styles from './form-status-styles.scss';
import { FormContext } from '@/presentation/context';

const FormStatus: React.VFC = () => {
  const { state } = useContext(FormContext);
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
