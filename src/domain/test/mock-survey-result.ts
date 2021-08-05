import faker from 'faker';
import { LoadSurveyResult } from '@/domain/usecases';

export const mockSurveyResultModel = (): LoadSurveyResult.Model => {
  return {
    question: faker.random.words(10),
    date: faker.date.recent(),
    answers: [
      {
        image: faker.internet.url(),
        answer: faker.random.word(),
        count: faker.datatype.number(),
        percent: faker.datatype.number(100),
        isCurrentAccountAnswer: faker.datatype.boolean(),
      },
      {
        answer: faker.random.word(),
        count: faker.datatype.number(),
        percent: faker.datatype.number(100),
        isCurrentAccountAnswer: faker.datatype.boolean(),
      },
    ],
  };
};

export class LoadSurveyResultSpy implements LoadSurveyResult {
  callsCount = 0;
  surveyResult = mockSurveyResultModel();
  async load(): Promise<LoadSurveyResult.Model> {
    this.callsCount++;
    return this.surveyResult;
  }
}
