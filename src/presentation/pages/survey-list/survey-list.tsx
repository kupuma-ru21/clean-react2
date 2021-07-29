import React, { useEffect, useState } from 'react';
import { LoadSurveyList } from '@/domain/usecases/load-survey-list';
import { Footer, Header } from '@/presentation/components';
import {
  SurveyItem,
  SurveyItemEmpty,
} from '@/presentation/pages/survey-list/components';
import Styles from './survey-list-styles.scss';
import { SurveyModel } from '@/domain/models';

type Props = { loadSurveyList: LoadSurveyList };

const SurveyList: React.VFC<Props> = ({ loadSurveyList }: Props) => {
  const [state, setState] = useState({ surveys: [] as SurveyModel[] });

  useEffect(() => {
    loadSurveyList.loadAll().then((surveys) =>
      setState((oldState) => {
        return { ...oldState, surveys };
      })
    );
  }, [loadSurveyList]);

  return (
    <div className={Styles.surveyListWrap}>
      <Header />
      <div className={Styles.contentWrap}>
        <h2>Enquetes</h2>
        <ul data-testid="survey-list">
          {!state.surveys.length && <SurveyItemEmpty />}
          {state.surveys.length &&
            state.surveys.map((survey: SurveyModel) => {
              return <SurveyItem key={survey.id} survey={survey} />;
            })}
        </ul>
      </div>
      <Footer />
    </div>
  );
};

export default SurveyList;
