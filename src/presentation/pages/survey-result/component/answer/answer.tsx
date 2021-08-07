import React, { useCallback } from 'react';
import { useRecoilValue } from 'recoil';
import { SurveyResultAnswerModel } from '@/domain/models';
import { onSurveyAnswerState } from '@/presentation/pages/survey-result/component';
import Styles from './answer-styles.scss';

type Props = { answer: SurveyResultAnswerModel };

const Answer: React.VFC<Props> = ({ answer }: Props) => {
  const activeClassName = answer.isCurrentAccountAnswer ? Styles.active : '';
  const { onAnswer } = useRecoilValue(onSurveyAnswerState);

  const answerClick = useCallback(
    (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
      if (e.currentTarget.classList.contains(Styles.active)) {
        return;
      }

      onAnswer(answer.answer);
    },
    [answer.answer, onAnswer]
  );

  return (
    <li
      data-testid="answer-wrap"
      className={[Styles.answerWrap, activeClassName].join(' ')}
      onClick={answerClick}
    >
      {answer.image && (
        <img data-testid="image" src={answer.image} alt={answer.answer} />
      )}
      <span data-testid="answer" className={Styles.answer}>
        {answer.answer}
      </span>
      <span data-testid="percent" className={Styles.percent}>
        {answer.percent}%
      </span>
    </li>
  );
};

export default Answer;
