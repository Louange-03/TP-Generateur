// src/stores/usePrimeStore.js
import { create } from "zustand";
import { verifIsPrime } from "../service/verifIsPrime.jsx";

export const usePrimeStore = create((set, get) => ({
  lastNumber: null,
  isPrime: null,
  mode: "idle", // "api" | "manual" | "idle"
  history: [],  // { number, isPrime, source }

  // Appelé quand un nombre vient de l'API (TanStack Query)
  setFromApi(number) {
    const prime = verifIsPrime(number);

    const entry = {
      number,
      isPrime: prime,
      source: "api",
    };

    set((state) => ({
      lastNumber: number,
      isPrime: prime,
      mode: "api",
      history: [entry, ...state.history].slice(0, 40), // limite historique
    }));
  },

  // Appelé quand l'utilisateur saisit un nombre
  checkManualNumber(number) {
    const prime = verifIsPrime(number);

    const entry = {
      number,
      isPrime: prime,
      source: "manual",
    };

    set((state) => ({
      lastNumber: number,
      isPrime: prime,
      mode: "manual",
      history: [entry, ...state.history].slice(0, 40),
    }));
  },

  clearHistory() {
    set({ history: [] });
  },
}));
