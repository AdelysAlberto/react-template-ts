import { type StoreApi, type UseBoundStore, create } from "zustand";

type Errors = Record<string, string>;

interface IUseErrorStore {
  error: Errors;
  setError: (error: Errors) => void;
  clearError: () => void;
}

const useErrorStore: UseBoundStore<StoreApi<IUseErrorStore>> = create((set, _) => ({
  error: {},
  setError: error => set({ error }),
  clearError: () => set({ error: {} }),
}));

export default useErrorStore;
