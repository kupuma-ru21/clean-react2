import React, { useCallback, useContext } from 'react';
import { SurveyContext } from '@/presentation/pages/survey-list/components';
import Styles from './error-styles.scss';

const Error: React.VFC = () => {
  const { state, setState } = useContext(SurveyContext);
  const reload = useCallback((): void => {
    setState((oldState) => {
      return { surveys: [], error: '', reload: !oldState.reload };
    });
  }, [setState]);
  return (
    <div className={Styles.errorWrap}>
      <span data-testid="error">{state.error}</span>
      <button data-testid="reload" onClick={reload}>
        Reload
      </button>
    </div>
  );
};

export default Error;
