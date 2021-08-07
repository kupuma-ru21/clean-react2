import faker from 'faker';
import { LoadSurveyResult, SaveSurveyResult } from '@/domain/usecases';

export const mockSaveSurveyResultParams = (): SaveSurveyResult.Params => ({
  answer: faker.random.words(10),
});

export const mockSurveyResultModel = (): LoadSurveyResult.Model => {
  return {
    question: faker.random.words(10),
    date: faker.date.recent(),
    answers: [
      {
        image: faker.internet.url(),
        answer: faker.random.words(10),
        count: faker.datatype.number(),
        percent: faker.datatype.number(100),
        isCurrentAccountAnswer: true,
      },
      {
        answer: faker.random.words(2),
        count: faker.datatype.number(),
        percent: faker.datatype.number(100),
        isCurrentAccountAnswer: false,
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

export class SaveSurveyResultSpy implements SaveSurveyResult {
  params: SaveSurveyResult.Params;
  surveyResult = mockSurveyResultModel();
  callsCount = 0;

  async save(params: SaveSurveyResult.Params): Promise<SaveSurveyResult.Model> {
    this.params = params;
    this.callsCount++;
    return this.surveyResult;
  }
}
