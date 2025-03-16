import { atom } from "jotai";

export interface SuccessMessage {
  message: string;
  timestamp: number;
}

export const successAtom = atom<SuccessMessage | null>(null);

export const setSuccessAtom = atom(
  (get) => get(successAtom),
  (get, set, message: string) => {
    set(successAtom, {
      message,
      timestamp: Date.now(),
    });
  },
);

export const clearSuccessAtom = atom(
  (get) => get(successAtom),
  (get, set) => {
    set(successAtom, null);
  },
);
