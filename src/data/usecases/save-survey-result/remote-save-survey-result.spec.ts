import faker from 'faker';
import { mockSaveSurveyResultParams } from '@/domain/test';
import { HttpClientSpy, mockRemoteSurveyResultModel } from '@/data/test';
import { HttpStatusCode } from '@/data/procotols/http';
import { RemoteSaveSurveyResult } from './remote-save-survey-result';
import { AccessDeniedError, UnexpectedError } from '@/domain/errors';

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
  test('Should call HttpClinet with correct values', async () => {
    const url = faker.internet.url();
    const { sut, httpClientSpy } = makeSut(url);
    const saveSurveyResultParams = mockSaveSurveyResultParams();
    await sut.save(saveSurveyResultParams);
    expect(httpClientSpy.url).toBe(url);
    expect(httpClientSpy.method).toBe('put');
    expect(httpClientSpy.body).toEqual(saveSurveyResultParams);
  });

  test('Should throw AccessDeniedError if HttpGetClient returns 403', async () => {
    const { sut, httpClientSpy } = makeSut();
    httpClientSpy.response = { statusCode: HttpStatusCode.forbidden };
    const promise = sut.save(mockSaveSurveyResultParams());
    await expect(promise).rejects.toThrow(new AccessDeniedError());
  });

  test('Should throw UnexpectedError if HttpGetClient returns 404', async () => {
    const { sut, httpClientSpy } = makeSut();
    httpClientSpy.response = { statusCode: HttpStatusCode.notFound };
    const promise = sut.save(mockSaveSurveyResultParams());
    await expect(promise).rejects.toThrow(new UnexpectedError());
  });

  test('Should throw UnexpectedError if HttpGetClient returns 500', async () => {
    const { sut, httpClientSpy } = makeSut();
    httpClientSpy.response = { statusCode: HttpStatusCode.serverError };
    const promise = sut.save(mockSaveSurveyResultParams());
    await expect(promise).rejects.toThrow(new UnexpectedError());
  });
});
