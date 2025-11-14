import { z } from "zod";

export const numberSchema = z.object({
  number: z.number().min(1).max(50),
});

export const inputNumberSchema = z
  .string()
  .trim()
  .min(1, "Veuillez saisir un nombre")
  .regex(/^\d+$/, "Le nombre doit être un entier positif")
  .transform((value) => Number(value));
