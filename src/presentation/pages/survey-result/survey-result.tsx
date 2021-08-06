import React, { useEffect, useState } from 'react';
import FlipMove from 'react-flip-move';
import { LoadSurveyResult } from '@/domain/usecases';
import {
  Calendar,
  Error,
  Footer,
  Header,
  Loading,
} from '@/presentation/components';
import { useErrorHandler } from '@/presentation/hooks';
import Styles from './survey-result-styles.scss';

type Props = { loadSurveyResult: LoadSurveyResult };

const SurveyResult: React.VFC<Props> = ({ loadSurveyResult }: Props) => {
  const handleError = useErrorHandler((error: Error) => {
    setState((oldState) => {
      return { ...oldState, surveyResult: null, error: error.message };
    });
  });
  const [state, setState] = useState({
    isLoading: false,
    error: '',
    surveyResult: null as LoadSurveyResult.Model,
  });

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
  }, [loadSurveyResult]);
  return (
    <div className={Styles.surveyResultWrap}>
      <Header />
      <div className={Styles.contentWrap} data-testid="survey-result">
        {state.surveyResult && (
          <>
            <hgroup>
              <Calendar
                date={state.surveyResult.date}
                className={Styles.calendarWrap}
              />
              <h2 data-testid="question">{state.surveyResult.question}</h2>
            </hgroup>
            <FlipMove className={Styles.answerList} data-testid="answers">
              {state.surveyResult.answers.map((answer) => {
                const className = answer.isCurrentAccountAnswer
                  ? Styles.active
                  : '';

                return (
                  <li
                    key={answer.answer}
                    data-testid="answer-wrap"
                    className={className}
                  >
                    {answer.image && (
                      <img
                        data-testid="image"
                        src={answer.image}
                        alt={answer.answer}
                      />
                    )}
                    <span data-testid="answer" className={Styles.answer}>
                      {answer.answer}
                    </span>
                    <span data-testid="percent" className={Styles.percent}>
                      {answer.percent}%
                    </span>
                  </li>
                );
              })}
            </FlipMove>
            <button>Volter</button>
          </>
        )}

        {state.isLoading && <Loading />}
        {state.error && <Error error={state.error} reload={() => {}} />}
      </div>
      <Footer />
    </div>
  );
};

export default SurveyResult;
