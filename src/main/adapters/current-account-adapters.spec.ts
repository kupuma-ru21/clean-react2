import { mockAccountModel } from '@/domain/test';
import { LocalStorageAdapter } from '@/infra/cahce/local-storage-adapter';
import {
  setCurrentAccountAdapter,
  getCurrentAccountAdapter,
} from './current-account-adapters';

jest.mock('@/infra/cahce/local-storage-adapter');

describe('CurrentAccountAdapter', () => {
  test('Should call LocalStorage.set with correct values', () => {
    const account = mockAccountModel();
    const setSpy = jest.spyOn(LocalStorageAdapter.prototype, 'set');
    setCurrentAccountAdapter(account);
    expect(setSpy).toHaveBeenCalledWith('account', account);
  });

  test('Should call LocalStorage.get with correct value', () => {
    const account = mockAccountModel();
    const getSpy = jest
      .spyOn(LocalStorageAdapter.prototype, 'get')
      .mockReturnValueOnce(account);
    const result = getCurrentAccountAdapter();
    expect(getSpy).toHaveBeenCalledWith('account');
    expect(result).toEqual(account);
  });
});
