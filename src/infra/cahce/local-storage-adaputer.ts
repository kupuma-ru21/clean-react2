import { SetStorage } from '@/data/procotols/cache/set-storage';

export class LocalStorageAdaputer implements SetStorage {
  async set(key: string, value: any): Promise<void> {
    localStorage.setItem(key, value);
  }
}
