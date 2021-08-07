import faker from 'faker';
import { HttpClientSpy, mockRemoteSurveyResultModel } from '@/data/test';
import { HttpStatusCode } from '@/data/procotols/http';
import { RemoteSaveSurveyResult } from './remote-save-survey-result';

type SutTypes = {
  sut: RemoteSaveSurveyResult;
  httpClientSpy: HttpClientSpy;
};

const makeSut = (url = faker.internet.url()): SutTypes => {
  const httpClientSpy = new HttpClientSpy();
  httpClientSpy.response = {
    statusCode: HttpStatusCode.ok,
    body: mockRemoteSurveyResultModel(),
  };
  const sut = new RemoteSaveSurveyResult(url, httpClientSpy);
  return { sut, httpClientSpy };
};

describe('RemoteSaveSurveyResult', () => {
  test('Should call HttpClinet with correct URL and Method', async () => {
    const url = faker.internet.url();
    const { sut, httpClientSpy } = makeSut(url);
    await sut.save({ answer: faker.random.word() });
    expect(httpClientSpy.url).toBe(url);
    expect(httpClientSpy.method).toBe('put');
  });
});
