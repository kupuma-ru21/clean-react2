import React from 'react';
import { Icon, IconName } from '@/presentation/components';
import Styles from './survey-item-styles.scss';

const SurveyItem: React.VFC = () => {
  return (
    <li>
      <div className={Styles.surveyItemWrap}>
        <Icon className={Styles.iconWrap} iconName={IconName.thumbDown} />
        <time>
          <span className={Styles.day}>22</span>
          <span className={Styles.month}>10</span>
          <span className={Styles.year}>2020</span>
        </time>
        <p>Qual e seu framework web favorite?</p>
      </div>
      <footer>Ver Resulttado</footer>
    </li>
  );
};

export default SurveyItem;
