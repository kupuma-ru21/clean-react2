import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { AccessDeniedError } from '@/domain/errors';
import { LoadSurveyList } from '@/domain/usecases/load-survey-list';
import { Footer, Header } from '@/presentation/components';
import {
  SurveyContext,
  SurveyListItem,
  Error,
} from '@/presentation/pages/survey-list/components';
import { ApiContext } from '@/presentation/context';
import Styles from './survey-list-styles.scss';

type Props = { loadSurveyList: LoadSurveyList };

const SurveyList: React.VFC<Props> = ({ loadSurveyList }: Props) => {
  const { setCurrentAccount } = useContext(ApiContext);
  const history = useHistory();
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
      .catch((error) => {
        if (error instanceof AccessDeniedError) {
          setCurrentAccount(undefined);
          history.replace('/login');
          return;
        }
        setState((oldState) => {
          return { ...oldState, error: error.message };
        });
      });
  }, [history, loadSurveyList, setCurrentAccount, state.reload]);

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
