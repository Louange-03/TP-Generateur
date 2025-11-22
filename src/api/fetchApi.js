// src/api/fetchApi.js
import { numberSchema } from "../schemas/numberSchema.jsx";

// API simulée EXACTEMENT comme dans l'énoncé.
// Parfois succès, parfois échec (Zod lève une erreur).
export async function fetchNumberAlea() {
  await new Promise((resolve) => setTimeout(resolve, 500));

  const raw = { number: Math.floor(Math.random() * 1000) };

  // Zod valide : 1 <= number <= 50
  // Si c'est > 50 => erreur => TanStack Query passe en "error"
  return numberSchema.parse(raw);
}
