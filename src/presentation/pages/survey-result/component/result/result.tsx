import React from 'react';
import { useHistory } from 'react-router-dom';
import { Calendar } from '@/presentation/components';
import { LoadSurveyResult } from '@/domain/usecases';
import Styles from './result-styles.scss';
import { Answer } from '@/presentation/pages/survey-result/component';

type Props = { surveyResult: LoadSurveyResult.Model };

const Result: React.VFC<Props> = ({ surveyResult }: Props) => {
  const { goBack } = useHistory();

  return (
    <>
      <hgroup>
        <Calendar date={surveyResult.date} className={Styles.calendarWrap} />
        <h2 data-testid="question">{surveyResult.question}</h2>
      </hgroup>
      <ul className={Styles.answerList} data-testid="answers">
        {surveyResult.answers.map((answer) => {
          return <Answer answer={answer} key={answer.answer} />;
        })}
      </ul>
      <button
        data-testid="back-button"
        onClick={goBack}
        className={Styles.button}
      >
        Volter
      </button>
    </>
  );
};

export default Result;
