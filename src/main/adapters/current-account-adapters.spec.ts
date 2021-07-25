import { UnexpectedError } from '@/domain/errors';
import { mockAccountModel } from '@/domain/test';
import { LocalStorageAdapter } from '@/infra/cahce/local-storage-adapter';
import { setCurrentAccountAdapter } from './current-account-adapters';

jest.mock('@/infra/cahce/local-storage-adapter');

describe('CurrentAccountAdapter', () => {
  test('Should call LocalStorage with correct values', () => {
    const account = mockAccountModel();
    const setSpy = jest.spyOn(LocalStorageAdapter.prototype, 'set');
    setCurrentAccountAdapter(account);
    expect(setSpy).toHaveBeenCalledWith('account', account);
  });

  test('Should throw UnexpectedError', () => {
    expect(() => {
      setCurrentAccountAdapter(undefined);
    }).toThrow(new UnexpectedError());
  });
});
