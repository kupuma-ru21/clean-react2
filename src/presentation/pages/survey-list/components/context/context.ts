import { createContext } from 'react';
import { SurveyModel } from '@/domain/models';

export type SurveyListState = {
  surveys: SurveyModel[];
  error: string;
  reload: boolean;
};
type SetState = React.Dispatch<React.SetStateAction<SurveyListState>>;

export default createContext<{ state: SurveyListState; setState: SetState }>(
  null
);
