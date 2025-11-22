// src/schemas/numberSchema.jsx
import { z } from "zod";

// EXACTEMENT ce que demande l'énoncé
export const numberSchema = z.object({
  number: z.number().min(1).max(50),
});
