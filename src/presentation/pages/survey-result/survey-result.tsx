import React, { useCallback, useEffect } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { LoadSurveyResult, SaveSurveyResult } from '@/domain/usecases';
import { Error, Footer, Header, Loading } from '@/presentation/components';
import { useErrorHandler } from '@/presentation/hooks';
import {
  Result,
  surveyResultState,
  onSurveyAnswerState,
} from '@/presentation/pages/survey-result/component';
import Styles from './survey-result-styles.scss';

type Props = {
  loadSurveyResult: LoadSurveyResult;
  saveSurveyResult: SaveSurveyResult;
};

const SurveyResult: React.VFC<Props> = ({
  loadSurveyResult,
  saveSurveyResult,
}: Props) => {
  const [state, setState] = useRecoilState(surveyResultState);

  const setOnAnswer = useSetRecoilState(onSurveyAnswerState);

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
  }, [setState]);

  const onAnswer = useCallback(
    (answer: string): void => {
      if (state.isLoading) return;
      setState((oldState) => {
        return { ...oldState, isLoading: true };
      });
      saveSurveyResult
        .save({ answer })
        .then((surveyResult) => {
          setState((oldState) => {
            return { ...oldState, surveyResult, isLoading: false };
          });
        })
        .catch(handleError);
    },
    [handleError, saveSurveyResult, setState, state.isLoading]
  );

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

  useEffect(() => {
    setOnAnswer({ onAnswer });
  }, [onAnswer, setOnAnswer]);

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
