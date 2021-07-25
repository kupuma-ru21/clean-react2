import faker from 'faker';
import 'jest-localstorage-mock';
import { AccountModel } from '@/domain/models';
import { LocalStorageAdapter } from './local-storage-adapter';

const makeSut = (): LocalStorageAdapter => new LocalStorageAdapter();

describe('LocalStorageAdapter', () => {
  beforeEach(() => {
    localStorage.clear();
  });
  test('Should call localStorage with correct value', () => {
    const sut = makeSut();
    const key = faker.database.column();
    const value = faker.random.objectElement<AccountModel>();
    sut.set(key, value);
    expect(localStorage.setItem).toHaveBeenCalledWith(
      key,
      JSON.stringify(value)
    );
  });
});