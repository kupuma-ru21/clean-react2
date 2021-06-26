import faker from 'faker';
import { mockAddAccountParams } from '@/domain/test';
import { AddAccountParams } from '@/domain/usecases';
import { AccountModel } from '@/domain/models/';
import { EmainInUseError } from '@/domain/errors';
import { HttpPostClientSpy } from '@/data/test';
import { HttpStatusCode } from '@/data/procotols/http';
import { RemoteAddAccount } from './remote-add-account';

type SutType = {
  sut: RemoteAddAccount;
  httpPostClientSpy: HttpPostClientSpy<AddAccountParams, AccountModel>;
};

const makeSut = (url: string = faker.internet.url()): SutType => {
  const httpPostClientSpy = new HttpPostClientSpy<
    AddAccountParams,
    AccountModel
  >();
  const sut = new RemoteAddAccount(url, httpPostClientSpy);
  return { sut, httpPostClientSpy };
};

describe('RemoteAddAccount', () => {
  test('Should call HttpPostClient with correct URL', async () => {
    const url = faker.internet.url();
    const { sut, httpPostClientSpy } = makeSut(url);
    await sut.add(mockAddAccountParams());
    expect(httpPostClientSpy.url).toBe(url);
  });

  test('Should call HttpPostClient with correct body', async () => {
    const { sut, httpPostClientSpy } = makeSut();
    const addAccountParams = mockAddAccountParams();
    await sut.add(addAccountParams);
    expect(httpPostClientSpy.body).toEqual(addAccountParams);
  });

  test('Should throw EmainInUseError if HttpPostClient returns 403', async () => {
    const { sut, httpPostClientSpy } = makeSut();
    httpPostClientSpy.response = { statusCode: HttpStatusCode.forbidden };
    const promise = sut.add(mockAddAccountParams());
    await expect(promise).rejects.toThrow(new EmainInUseError());
  });
});