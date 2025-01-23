
import { z } from "zod";
const apiUrl = "http://172.23.169.51:8080/api/tables";

export const edgeAbsorptionSchema = z.object({
    name: z.string().min(1, "File name is required"),
    edge: z.enum(["txt", "csv", "json", "xml", "other"]), //from K L...
    widthIneV: z.number().optional(),
    energyIneV: z.number().optional(),
    fluorescenceYield: z.number().min(0, "Fluorescence yield must be greater than or equal to 0").max(1, "Fluorescence yield must be less than or equal to 1"),
    edgeJump: z.number().min(0, "Edge jump must be greater than or equal to 0"),
});

type EdgeAbsorptionData = z.infer<typeof edgeAbsorptionSchema>;

export async function getAllEdgesForElement(element: string): Promise<EdgeAbsorptionData[]> {
    const response = await fetch(`${apiUrl}/edges/${element}`);
    const data = await response.json();
    // todo fillout with the roapi docs https://roapi.github.io/docs/api/query/rest.html
    return data;
}



export const fluorescenceLinesSchema = z.object({
    line: z.string(),
    energyIneV: z.number(),
    intensity: z.number().min(0, "Intensity must be greater than or equal to 0").max(1, "Intensity must be less than or equal to 1")
});

type FluorescenceLineData = z.infer<typeof fluorescenceLinesSchema>;

export async function getFluorescenceLinesForElement(element: string): Promise<FluorescenceLineData[]> {
    const response = await fetch(`${apiUrl}/fluorescence/${element}`);
    const data = await response.json();
    // todo fillout with the roapi docs https://roapi.github.io/docs/api/query/rest.html
    return data;
}

