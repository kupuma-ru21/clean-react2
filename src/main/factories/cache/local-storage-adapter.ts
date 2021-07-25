import { LocalStorageAdapter } from '@/infra/cahce/local-storage-adapter';

export const makeLocalStorageAdapter = (): LocalStorageAdapter => {
  return new LocalStorageAdapter();
};
