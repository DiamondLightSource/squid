import { z } from "zod";

// Define the schema for validation

export const circleSchema = z.object({
  diameter: z.number().positive().int(),
  color: z.enum(["red", "green", "blue", "yellow"]),
  title: z.string().min(1).max(100),
});
