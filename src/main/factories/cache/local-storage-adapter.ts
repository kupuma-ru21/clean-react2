import { SetStorage } from '@/data/procotols/cache';
import { LocalStorageAdapter } from '@/infra/cahce/local-storage-adapter';

export const makeLocalStorageAdapter = (): SetStorage => {
  return new LocalStorageAdapter();
};
