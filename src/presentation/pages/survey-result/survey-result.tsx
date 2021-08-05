import React, { useEffect, useState } from 'react';
import FlipMove from 'react-flip-move';
import { LoadSurveyResult } from '@/domain/usecases';
import {
  Calendar,
  Error,
  Footer,
  Header,
  Loading,
} from '@/presentation/components';
import Styles from './survey-result-styles.scss';

type Props = { loadSurveyResult: LoadSurveyResult };

const SurveyResult: React.VFC<Props> = ({ loadSurveyResult }: Props) => {
  const [state] = useState({
    isLoading: false,
    error: '',
    surveyResult: null as LoadSurveyResult.Model[],
  });

  useEffect(() => {
    loadSurveyResult.load().then().catch();
  }, [loadSurveyResult]);
  return (
    <div className={Styles.surveyResultWrap}>
      <Header />
      <div className={Styles.contentWrap} data-testid="survey-result">
        {state.surveyResult && (
          <>
            <hgroup>
              <Calendar date={new Date()} className={Styles.calendarWrap} />
              <h2>Qual e seu framework web favorite</h2>
            </hgroup>
            <FlipMove className={Styles.answerList}>
              <li>
                <img src="http://fordevs.herokuapp.com/static/img/logo-react.png" />
                <span className={Styles.answer}>React.js</span>
                <span className={Styles.percent}>50%</span>
              </li>
              <li className={Styles.active}>
                <img src="http://fordevs.herokuapp.com/static/img/logo-react.png" />
                <span className={Styles.answer}>React.js</span>
                <span className={Styles.percent}>50%</span>
              </li>
              <li>
                <img src="http://fordevs.herokuapp.com/static/img/logo-react.png" />
                <span className={Styles.answer}>React.js</span>
                <span className={Styles.percent}>50%</span>
              </li>
            </FlipMove>
            <button>Volter</button>
          </>
        )}

        {state.isLoading && <Loading />}
        {state.error && <Error error={state.error} reload={() => {}} />}
      </div>
      <Footer />
    </div>
  );
};

export default SurveyResult;
