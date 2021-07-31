import React, { useEffect, useState } from 'react';
import { LoadSurveyList } from '@/domain/usecases/load-survey-list';
import { Footer, Header } from '@/presentation/components';
import {
  SurveyContext,
  SurveyListItem,
  Error,
} from '@/presentation/pages/survey-list/components';
import Styles from './survey-list-styles.scss';

type Props = { loadSurveyList: LoadSurveyList };

const SurveyList: React.VFC<Props> = ({ loadSurveyList }: Props) => {
  const [state, setState] = useState({
    surveys: [] as LoadSurveyList.Model[],
    error: '',
    reload: false,
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
  }, [loadSurveyList, state.reload]);

  return (
    <div className={Styles.surveyListWrap}>
      <Header />
      <div className={Styles.contentWrap}>
        <h2>Enquetes</h2>
        <SurveyContext.Provider value={{ state, setState }}>
          {state.error && <Error />}
          {!state.error && <SurveyListItem />}
        </SurveyContext.Provider>
      </div>
      <Footer />
    </div>
  );
};

export default SurveyList;
