import React, { useCallback, useEffect, useState } from 'react';
import { LoadSurveyResult } from '@/domain/usecases';
import { Error, Footer, Header, Loading } from '@/presentation/components';
import { useErrorHandler } from '@/presentation/hooks';
import { Result } from '@/presentation/pages/survey-result/component';
import Styles from './survey-result-styles.scss';

type Props = { loadSurveyResult: LoadSurveyResult };

const SurveyResult: React.VFC<Props> = ({ loadSurveyResult }: Props) => {
  const [state, setState] = useState({
    isLoading: false,
    error: '',
    surveyResult: null as LoadSurveyResult.Model,
    reload: false,
  });

  const handleError = useErrorHandler((error: Error) => {
    setState((oldState) => {
      return {
        ...oldState,
        isLoading: false,
        surveyResult: null,
        error: error.message,
      };
    });
  });

  const reload = useCallback(() => {
    setState((oldState) => {
      return {
        ...oldState,
        surveyResult: null,
        error: '',
        reload: !oldState.reload,
      };
    });
  }, []);

  useEffect(() => {
    loadSurveyResult
      .load()
      .then((surveyResult) => {
        setState((oldState) => {
          return { ...oldState, surveyResult };
        });
      })
      .catch(handleError);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loadSurveyResult, state.reload]);
  return (
    <div className={Styles.surveyResultWrap}>
      <Header />
      <div className={Styles.contentWrap} data-testid="survey-result">
        {state.surveyResult && <Result surveyResult={state.surveyResult} />}

        {state.isLoading && <Loading />}
        {state.error && <Error error={state.error} reload={reload} />}
      </div>
      <Footer />
    </div>
  );
};

export default SurveyResult;
