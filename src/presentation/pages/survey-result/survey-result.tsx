import React from 'react';
import FlipMove from 'react-flip-move';
import { Footer, Header, Spinner } from '@/presentation/components';
import Styles from './survey-result-styles.scss';

const SurveyResult: React.VFC = () => {
  return (
    <div className={Styles.surveyResultWrap}>
      <Header />
      <div className={Styles.contentWrap}>
        <h2>Qual e seu framework web favorite</h2>
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
        <div className={Styles.loadingWrap}>
          <div className={Styles.loading}>
            <span>loading...</span>
            <Spinner isNegative={true} />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SurveyResult;
