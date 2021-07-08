import faker from 'faker';
import { UnexpectedError } from '@/domain/errors';
import { SurveyModel } from '@/domain/models';
import { HttpGetClientSpy } from '@/data/test';
import { HttpStatusCode } from '@/data/procotols/http';
import { RemoteLoadSurveyList } from './remote-load-survey-list';

type SutTypes = {
  sut: RemoteLoadSurveyList;
  httpGetClientSpy: HttpGetClientSpy<SurveyModel[]>;
};

const makeSut = (url = faker.internet.url()): SutTypes => {
  const httpGetClientSpy = new HttpGetClientSpy<SurveyModel[]>();
  const sut = new RemoteLoadSurveyList(url, httpGetClientSpy);
  return { sut, httpGetClientSpy };
};

describe('RemoteLoadSurveyList', () => {
  test('Should call HttpGetClient with correct URL', async () => {
    const url = faker.internet.url();
    const { sut, httpGetClientSpy } = makeSut(url);
    await sut.loadAll();
    expect(httpGetClientSpy.url).toBe(url);
  });

  test('Should throw UnexpectedError if HttpGetClient returns 403', async () => {
    const { sut, httpGetClientSpy } = makeSut();
    httpGetClientSpy.response = { statusCode: HttpStatusCode.forbidden };
    const promise = sut.loadAll();
    await expect(promise).rejects.toThrow(new UnexpectedError());
  });
});