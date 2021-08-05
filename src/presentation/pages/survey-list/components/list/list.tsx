import React from 'react';
import { LoadSurveyList } from '@/domain/usecases';
import {
  SurveyItemEmpty,
  SurveyItem,
} from '@/presentation/pages/survey-list/components';
import Styles from './list-styles.scss';

type Props = { surveys: LoadSurveyList.Model[] };

const List: React.VFC<Props> = ({ surveys }: Props) => {
  return (
    <ul data-testid="survey-list" className={Styles.listWrap}>
      {!surveys.length && <SurveyItemEmpty />}
      {surveys.length &&
        surveys.map((survey: LoadSurveyList.Model) => {
          return <SurveyItem key={survey.id} survey={survey} />;
        })}
    </ul>
  );
};

export default List;
