// src/stores/usePrimeStore.js
import { create } from "zustand";
import { isPrime } from "../service/verifIsPrime.jsx";

export const usePrimeStore = create((set, get) => ({
  currentNumber: null,
  isCurrentPrime: null,
  source: null, // "api" | "manual"
  history: [],  // [{ value, isPrime, source, id }]

  // cache { [number]: boolean }
  cache: {},

  // Utilisé quand le nombre vient de l'API aléatoire
  setFromApi(number) {
    const { cache } = get();
    let prime;
    if (cache[number] !== undefined) {
      prime = cache[number];
    } else {
      prime = isPrime(number);
      cache[number] = prime;
    }

    const entry = {
      id: Date.now() + "_api",
      value: number,
      isPrime: prime,
      source: "api",
    };

    set((state) => ({
      currentNumber: number,
      isCurrentPrime: prime,
      source: "api",
      cache: { ...state.cache, [number]: prime },
      history: [entry, ...state.history].slice(0, 10),
    }));
  },

  // Utilisé quand l'utilisateur saisit un nombre
  checkManual(number) {
    const { cache } = get();
    let prime;
    if (cache[number] !== undefined) {
      prime = cache[number];
    } else {
      prime = isPrime(number);
      cache[number] = prime;
    }

    const entry = {
      id: Date.now() + "_manual",
      value: number,
      isPrime: prime,
      source: "manual",
    };

    set((state) => ({
      currentNumber: number,
      isCurrentPrime: prime,
      source: "manual",
      cache: { ...state.cache, [number]: prime },
      history: [entry, ...state.history].slice(0, 10),
    }));
  },
}));
