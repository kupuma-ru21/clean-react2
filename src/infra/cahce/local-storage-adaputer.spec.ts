import faker from 'faker';
import 'jest-localstorage-mock';
import { LocalStorageAdaputer } from './local-storage-adaputer';

describe('LocalStorageAdaputer', () => {
  beforeEach(() => {
    localStorage.clear();
  });
  test('Should call localStorage with correct value', async () => {
    const sut = new LocalStorageAdaputer();
    const key = faker.database.column();
    const value = faker.random.word();
    await sut.set(key, value);
    expect(localStorage.setItem).toHaveBeenCalledWith(key, value);
  });
});
