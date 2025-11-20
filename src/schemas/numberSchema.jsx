// src/schemas/numberSchema.jsx
import { z } from "zod";

// Schéma pour la "réponse API"
export const numberSchema = z.object({
  number: z.number().int().min(1).max(50),
});

// Schéma pour la saisie utilisateur
export const inputNumberSchema = z
  .string()
  .trim()
  .min(1, { message: "Veuillez saisir un nombre." })
  .transform((value) => Number(value.replace(",", ".")))
  .refine((value) => !Number.isNaN(value), {
    message: "La valeur doit être un nombre.",
  })
  .refine((value) => Number.isInteger(value), {
    message: "La valeur doit être un entier.",
  })
  .refine((value) => value >= 1 && value <= 10000, {
    message: "La valeur doit être comprise entre 1 et 10 000.",
  });
