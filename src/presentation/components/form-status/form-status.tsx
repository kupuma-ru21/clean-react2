import React, { useContext } from 'react';
import Spinner from '@/presentation/components/spinner/spinner';
import Styles from './form-status-styles.scss';
import Context from '@/presentation/context/form/form-context';

const FormStatus: React.VFC = () => {
  const { isLoading, errorMessage } = useContext(Context);
  return (
    <div data-testid="error-wrap" className={Styles.errorWrap}>
      {isLoading && <Spinner className={Styles.spinner} />}
      {errorMessage && <span className={Styles.error}>{errorMessage}</span>}
    </div>
  );
};

export default FormStatus;
