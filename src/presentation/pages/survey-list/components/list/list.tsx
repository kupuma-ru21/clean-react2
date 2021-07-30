import React, { useContext } from 'react';
import { SurveyModel } from '@/domain/models';
import {
  SurveyItemEmpty,
  SurveyItem,
  SurveyContext,
} from '@/presentation/pages/survey-list/components';
import Styles from './list-styles.scss';

const List: React.VFC = () => {
  const { state } = useContext(SurveyContext);
  return (
    <ul data-testid="survey-list" className={Styles.listWrap}>
      {!state.surveys.length && <SurveyItemEmpty />}
      {state.surveys.length &&
        state.surveys.map((survey: SurveyModel) => {
          return <SurveyItem key={survey.id} survey={survey} />;
        })}
    </ul>
  );
};

export default List;