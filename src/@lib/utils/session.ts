// Storage utils functions using sessionStorage
export const session = {
  // for save data to sessionStorage
  setData(key: string, data: any) {
    if (typeof window === 'undefined') return;
    sessionStorage.setItem(key, JSON.stringify(data));
  },
  // for retrieve data from sessionStorage
  getData<T = any>(key: string) {
    if (typeof window === 'undefined') return null;
    const data = sessionStorage.getItem(key);
    if (!data) return null;
    return JSON.parse(data) as T;
  },
  //for remove data from sessionStorage
  removeData(key: string) {
    if (typeof window === 'undefined') return;
    sessionStorage.removeItem(key);
  },
  // for clear all sessionStorage data
  clear(): boolean {
    if (typeof window === 'undefined') return;
    sessionStorage.clear();
  },
};
