import { SetStorage } from '@/data/procotols/cache/set-storage';
import { LocalStorageAdaputer } from '@/infra/cahce/local-storage-adaputer';

export const makeLocalStorageAdapter = (): SetStorage => {
  return new LocalStorageAdaputer();
};
