import { setErrorAtom } from "@/atoms/error";
import { getDefaultStore } from "jotai";

const store = getDefaultStore();

const originalConsoleError = console.error;

console.error = (...args: unknown[]) => {
  originalConsoleError.apply(console, args);

  const message = args
    .map((arg) => (arg instanceof Error ? arg.message : String(arg)))
    .join(" ");

  store.set(setErrorAtom, message);
};
