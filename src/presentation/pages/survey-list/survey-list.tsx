import React, { useCallback, useEffect, useState } from 'react';
import { LoadSurveyList } from '@/domain/usecases/load-survey-list';
import { Error, Footer, Header } from '@/presentation/components';
import { SurveyListItem } from '@/presentation/pages/survey-list/components';
import { useErrorHandler } from '@/presentation/hooks';
import Styles from './survey-list-styles.scss';

type Props = { loadSurveyList: LoadSurveyList };

const SurveyList: React.VFC<Props> = ({ loadSurveyList }: Props) => {
  const handleError = useErrorHandler((error: Error) => {
    setState((oldState) => {
      return { ...oldState, error: error.message };
    });
  });
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
      .catch(handleError);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.reload]);

  const reload = useCallback(() => {
    setState((oldState) => {
      return { ...oldState, surveys: [], error: '', reload: !oldState.reload };
    });
  }, []);

  return (
    <div className={Styles.surveyListWrap}>
      <Header />
      <div className={Styles.contentWrap}>
        <h2>Enquetes</h2>
        {state.error && <Error error={state.error} reload={reload} />}
        {!state.error && <SurveyListItem surveys={state.surveys} />}
      </div>
      <Footer />
    </div>
  );
};

export default SurveyList;
