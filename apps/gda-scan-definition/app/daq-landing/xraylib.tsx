"use server";
import z from 'zod';

const apiUrl = process.env.ROAPI_API_URL ?? "http://172.23.169.67:8080/api/tables";
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

export async function getXrayLevelsForElement(
    element: string
): Promise<AbsorptionEdgeResponseType> {
    const response = await fetch(
        `${apiUrl}/xray_levels?filter[element]='${element}'`
    );
    const data = await response.json();
    return data;
}

// todo maybe use useElementData hook - into a common lib maybe?
