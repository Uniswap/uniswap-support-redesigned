import { SideNavData } from '../lib/types';

export class LocalStorageManager<T> {
  key: string;

  constructor(key: string) {
    this.key = key;
  }

  set(value: T): void {
    const valueToSet = typeof value === 'string' ? value : JSON.stringify(value);
    localStorage.setItem(this.key, valueToSet);
  }

  get(): T | undefined {
    const value = localStorage.getItem(this.key);
    if (value) {
      return JSON.parse(value);
    }
    return undefined;
  }

  clear(): void {
    localStorage.removeItem(this.key);
  }
}

export const SideNavDataManager = new LocalStorageManager<{
  expriresAt: number;
  data: SideNavData;
}>('SIDE_NAV_DATA');
