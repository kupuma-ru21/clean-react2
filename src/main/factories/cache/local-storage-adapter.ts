import { SetStorage } from '@/data/procotols/cache/set-storage';
import { LocalStorageAdapter } from '@/infra/cahce/local-storage-adapter';

export const makeLocalStorageAdapter = (): SetStorage => {
  return new LocalStorageAdapter();
};
