"use server";

import { ElementPropertiesResponseType, AbsorptionEdgeResponseType, EmissionDataResponseType } from "../schemas/xraylibSchemas";

const apiUrl = process.env.ROAPI_API_URL ?? "http://172.23.169.67:8080/api/tables";

export async function getElementProperties(
  element: string
): Promise<ElementPropertiesResponseType> {

  const response = await fetch(
    `${apiUrl}/elements?filter[element]='${element}'`
  );
  console.log(`response: ${response}`)
  const data = await response.json();
  return data;
}

export async function getXrayLevelsForElement(
  element: string
): Promise<AbsorptionEdgeResponseType> {
  const response = await fetch(
    `${apiUrl}/xray_levels?filter[element]='${element}'`
  );
  const data = await response.json();
  return data;
}

export async function getTransitionsEmissionsForElement(
  element: string
): Promise<EmissionDataResponseType> {
  const response = await fetch(
    `${apiUrl}/xray_transitions?filter[element]='${element}'`
  );
  const data = await response.json();
  return data;
}
