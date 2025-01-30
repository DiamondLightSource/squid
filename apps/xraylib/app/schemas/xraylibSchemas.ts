import { z } from "zod";

export const elementPropertiesSchema = z.object({
  atomic_number: z
    .number()
    .int()
    .min(1, "Atomic number must be a positive integer"), // Atomic numbers start from 1
  density: z.number().min(0, "Density must be a non-negative number"), // Density cannot be negative
  element: z
    .string()
    .length(1, "Element symbol must have at least 1 character")
    .max(2, "Element symbol cannot have more than 2 characters") // Most element symbols are 1 or 2 characters
    .regex(
      /^[A-Z][a-z]?$/,
      "Element symbol must start with an uppercase letter"
    ), // Ensure valid element symbols
  molar_mass: z.number().min(0, "Molar mass must be a non-negative number"), // Molar mass cannot be negative
  name: z
    .string()
    .min(1, "Element name is required") // Ensure non-empty name
    .regex(
      /^[A-Za-z\s]+$/,
      "Element name must only contain letters and spaces"
    ), // Validate name format
});

export type ElementPropertiesResponseType = z.infer<
  typeof elementPropertiesSchema
>[];

export const absorptionEdgeSchema = z.object({
  absorption_edge: z
    .number()
    .min(0, "Absorption edge must be a non-negative number"), // Absorption edge cannot be negative
  element: z
    .string()
    .length(1, "Element symbol must have at least 1 character")
    .max(2, "Element symbol cannot have more than 2 characters")
    .regex(
      /^[A-Z][a-z]?$/,
      "Element symbol must start with an uppercase letter"
    ), // Validate element symbol
  fluorescence_yield: z
    .number()
    .min(0, "Fluorescence yield must be greater than or equal to 0")
    .max(1, "Fluorescence yield must be less than or equal to 1"), // Valid range: 0 ≤ fluorescence yield ≤ 1
  id: z.number().int().min(1, "ID must be a positive integer"), // IDs are usually positive integers
  iupac_symbol: z
    .string()
    .min(1, "IUPAC symbol is required") // Ensure it's not empty
    .regex(
      /^[A-Z][1-9]?$/,
      "IUPAC symbol must start with an uppercase letter and may have an optional digit"
    ), // Examples: K, L1, M2
  jump_ratio: z
    .number()
    .min(0, "Jump ratio must be greater than or equal to 0"), // Jump ratio must be non-negative
});

export type AbsorptionEdgeResponseType = z.infer<typeof absorptionEdgeSchema>[];

export const emissionDataSchema = z.object({
  element: z
    .string()
    .length(1, "Element symbol must have at least 1 character")
    .max(2, "Element symbol cannot have more than 2 characters")
    .regex(
      /^[A-Z][a-z]?$/,
      "Element symbol must start with an uppercase letter"
    ), // Validate element symbol
  emission_energy: z
    .number()
    .min(0, "Emission energy must be a non-negative number"), // Emission energy cannot be negative
  final_level: z
    .string()
    .min(1, "Final level is required") // Ensure it's not empty
    .regex(
      /^[A-Z][1-9]?$/,
      "Final level must start with an uppercase letter and may include a digit"
    ), // Examples: L1, M2
  id: z.number().int().min(1, "ID must be a positive integer"), // IDs are usually positive integers
  initial_level: z
    .string()
    .min(1, "Initial level is required") // Ensure it's not empty
    .regex(
      /^[A-Z][1-9]?$/,
      "Initial level must start with an uppercase letter and may include a digit"
    ), // Examples: K, L1
  intensity: z.number().min(0, "Intensity must be greater than or equal to 0"), // Intensity must be non-negative
  iupac_symbol: z
    .string()
    .min(1, "IUPAC symbol is required") // Ensure it's not empty
    .regex(
      /^[A-Z]-[A-Z1-9]+$/,
      "IUPAC symbol must follow the format 'X-Y' (e.g., K-L1)"
    ), // Validate IUPAC symbol
  siegbahn_symbol: z
    .string()
    .min(1, "Siegbahn symbol is required") // Ensure it's not empty
    .regex(
      /^[A-Za-z0-9]+$/,
      "Siegbahn symbol must contain only alphanumeric characters"
    ), // Examples: Ka1, Ka3
});

export type EmissionDataResponseType = z.infer<typeof emissionDataSchema>[];
