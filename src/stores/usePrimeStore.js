import { create } from "zustand";
import { verifIsPrime } from "../service/verifIsPrime.jsx";

const initialState = {
  lastNumber: null,
  isPrime: null,
  mode: null,
  history: [],
};

export const usePrimeStore = create((set) => ({
  ...initialState,

  setFromApi: (number) =>
    set((state) => {
      const isPrime = verifIsPrime(number);
      const entry = { number, isPrime, source: "api" };
      return {
        lastNumber: number,
        isPrime,
        mode: "api",
        history: [...state.history, entry],
      };
    }),

  checkManualNumber: (number) =>
    set((state) => {
      const isPrime = verifIsPrime(number);
      const entry = { number, isPrime, source: "manual" };
      return {
        lastNumber: number,
        isPrime,
        mode: "manual",
        history: [...state.history, entry],
      };
    }),

  setMode: (mode) => set({ mode }),
  reset: () => set(initialState),
}));
