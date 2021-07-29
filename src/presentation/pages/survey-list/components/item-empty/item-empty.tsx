import React from 'react';
import Styles from './item-empty.scss';

const SurveyItemEmpty: React.VFC = () => {
  return (
    <>
      <li className={Styles.surveyItemEmptyWrap}></li>
      <li className={Styles.surveyItemEmptyWrap}></li>
      <li className={Styles.surveyItemEmptyWrap}></li>
      <li className={Styles.surveyItemEmptyWrap}></li>
    </>
  );
};

export default SurveyItemEmpty;
