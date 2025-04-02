import { z } from "zod";

// Define the Zod schema for K
const KSchema = z.object({
  name: z.string(),
  myParam: z.number().int(), // Ensure integer value
  float: z.number(), // Allow floating point
});

// Infer TypeScript type from the schema
export type K = z.infer<typeof KSchema>;
