import { numberSchema } from "../schemas/numberSchema.jsx";

export async function fetchNumberAlea() {
  await new Promise((resolve) => setTimeout(resolve, 500));

  const raw = { number: Math.floor(Math.random() * 1000) };

  // Validation stricte de la donnée
  return numberSchema.parse(raw);
}
