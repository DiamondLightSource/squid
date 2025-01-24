"use server";
// import { z } from "zod";
const apiUrl = "http://172.23.169.51:8080/api/tables";

// export const edgeAbsorptionSchema = z.object({
//   name: z.string().min(1, "File name is required"),
//   edge: z.enum(["K", "L1", "L2", "L3", "M1", "M2", "M3", "N1", "N2", "N3"]),
//   widthIneV: z.number().optional(),
//   energyIneV: z.number().optional(),
//   fluorescenceYield: z
//     .number()
//     .min(0, "Fluorescence yield must be greater than or equal to 0")
//     .max(1, "Fluorescence yield must be less than or equal to 1"),
//   edgeJump: z.number().min(0, "Edge jump must be greater than or equal to 0"),
// });

// type EdgeAbsorptionData = z.infer<typeof edgeAbsorptionSchema>;

// export async function getAllEdgesForElement(
//   element: string
// ): Promise<EdgeAbsorptionData[]> {
//   const response = await fetch(
//     `${apiUrl}/xray_levels&filter[element]='${element}'`
//   );
//   //   this gives element, iuac_symbol for the edge, abosption_edge = energy and fluorescence)yield = yield and jump_ratio is the last thing
//   // I need width still - not sure where to find it
//   const data = await response.json();
//   // todo fillout with the roapi docs https://roapi.github.io/docs/api/query/rest.html
//   return data;
// }

// export const fluorescenceLinesSchema = z.object({
//   line: z.string(),
//   energyIneV: z.number(),
//   intensity: z
//     .number()
//     .min(0, "Intensity must be greater than or equal to 0")
//     .max(1, "Intensity must be less than or equal to 1"),
// });

// type FluorescenceLineData = z.infer<typeof fluorescenceLinesSchema>;

// /**
//  * select * from xray_transitions where element = 'O';
//  *  (id integer primary key, element text, iupac_symbol text, siegbahn_symbol text, initial_level text, final_level text, emission_energy real, intensity real)
//  *  in theory could renderall of them but the two first ones
//     14|O|K-L1|Ka3|K|L1|501.5|9.74605e-05
//     15|O|K-L2|Ka2|K|L2|524.9|0.334188
//     16|O|K-L3|Ka1|K|L3|524.9|0.665714
//  * @param element
//  * @returns
//  */
// export async function getFluorescenceLinesForElement(
//   element: string
// ): Promise<FluorescenceLineData[]> {
//   const response = await fetch(
//     `${apiUrl}/xray_transitions&filter[element]='${element}'`
//   );
//   const data = await response.json();
//   return data;
// }

export async function getElementProperties(
  element: string
): Promise<Record<string, any>> {
  const response = await fetch(
    `${apiUrl}/elements&filter[element]='${element}'`
  );
  const data = await response.json();
  return data;
}

export async function getXrayLevelsForElement(element: string) {
  const response = await fetch(
    `${apiUrl}/xray_levels&filter[element]='${element}'`
  );
  const data = await response.json();
  return data;
}

export async function getTransitionsEmissionsForElement(element: string) {
  const response = await fetch(
    `${apiUrl}/xray_transitions&filter[element]='${element}'`
  );
  const data = await response.json();
  return data;
}
