import faker from 'faker';
import { RemoteLoadSurveyList } from '@/data/usecases';

export const mockRemoteSurveyModel = (): RemoteLoadSurveyList.Model => {
  return {
    id: faker.datatype.uuid(),
    question: faker.random.words(10),
    date: faker.date.recent().toISOString(),
    didAnswer: faker.datatype.boolean(),
  };
};

export const mockRemoteSurveyListModel = (): RemoteLoadSurveyList.Model[] => [
  mockRemoteSurveyModel(),
  mockRemoteSurveyModel(),
  mockRemoteSurveyModel(),
];
