import React from 'react';
import FlipMove from 'react-flip-move';
import { useHistory } from 'react-router-dom';
import { Calendar } from '@/presentation/components';
import { LoadSurveyResult } from '@/domain/usecases';
import Styles from './result-styles.scss';

type Props = { surveyResult: LoadSurveyResult.Model };

const Result: React.VFC<Props> = ({ surveyResult }: Props) => {
  const { goBack } = useHistory();

  return (
    <>
      <hgroup>
        <Calendar date={surveyResult.date} className={Styles.calendarWrap} />
        <h2 data-testid="question">{surveyResult.question}</h2>
      </hgroup>
      <FlipMove className={Styles.answerList} data-testid="answers">
        {surveyResult.answers.map((answer) => {
          const className = answer.isCurrentAccountAnswer ? Styles.active : '';

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
