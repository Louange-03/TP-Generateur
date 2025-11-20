// src/api/fetchApi.js
import { numberSchema } from "../schemas/numberSchema.jsx";

// API simulée : renvoie toujours un nombre valide 1–50
export async function fetchNumberAlea() {
  // Simule une latence réseau
  await new Promise((resolve) => setTimeout(resolve, 500));

  while (true) {
    const raw = { number: Math.floor(Math.random() * 1000) };

    const parsed = numberSchema.safeParse(raw);
    if (parsed.success) {
      return parsed.data; // { number }
    }

    // Si Zod rejette (nombre hors [1, 50]), on retente silencieusement.
  }
}
