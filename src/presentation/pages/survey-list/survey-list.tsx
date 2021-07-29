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
  const [state, setState] = useState({
    surveys: [] as SurveyModel[],
    error: '',
  });

  useEffect(() => {
    loadSurveyList
      .loadAll()
      .then((surveys) =>
        setState((oldState) => {
          return { ...oldState, surveys };
        })
      )
      .catch((error) =>
        setState((oldState) => {
          return { ...oldState, error: error.message };
        })
      );
  }, [loadSurveyList]);

  return (
    <div className={Styles.surveyListWrap}>
      <Header />
      <div className={Styles.contentWrap}>
        <h2>Enquetes</h2>
        {state.error && (
          <div>
            <span data-testid="error">{state.error}</span>
            <button>Recarregar</button>
          </div>
        )}
        {!state.error && (
          <ul data-testid="survey-list">
            {!state.surveys.length && <SurveyItemEmpty />}
            {state.surveys.length &&
              state.surveys.map((survey: SurveyModel) => {
                return <SurveyItem key={survey.id} survey={survey} />;
              })}
          </ul>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default SurveyList;
