import faker from 'faker';
import { RemoteLoadSurveyResult } from '@/data/usecases';

export const mockRemoteSurveyResultModel = (): RemoteLoadSurveyResult.Model => {
  return {
    question: faker.random.words(10),
    date: faker.date.recent().toISOString(),
    answers: [
      {
        image: faker.internet.url(),
        answer: faker.random.word(),
        count: faker.datatype.number(),
        percent: faker.datatype.number(100),
        inCurrentAccountAnswer: faker.datatype.boolean(),
      },
      {
        answer: faker.random.word(),
        count: faker.datatype.number(),
        percent: faker.datatype.number(100),
        inCurrentAccountAnswer: faker.datatype.boolean(),
      },
    ],
  };
};