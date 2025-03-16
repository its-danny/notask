import { atom } from "jotai";

export interface AppError {
  message: string;
  timestamp: number;
}

export const errorAtom = atom<AppError | null>(null);

export const setErrorAtom = atom(
  (get) => get(errorAtom),
  (get, set, message: string) => {
    set(errorAtom, {
      message,
      timestamp: Date.now(),
    });
  },
);

export const clearErrorAtom = atom(
  (get) => get(errorAtom),
  (get, set) => {
    set(errorAtom, null);
  },
);
