"use server";

import { ElementPropertiesResponseType, AbsorptionEdgeResponseType, EmissionDataResponseType } from "../schemas/xraylibSchemas";

const apiUrl = "http://172.23.169.51:8080/api/tables";

export async function getFluorescenceYields(element: string) {
  const response: Response = await fetch(
    `${apiUrl}/xray_levels?filter[element]='${element}'`
  );
  console.dir(response)
  console.log(`response: ${response}`)
  const data = await response.json();
  console.dir(data)
  return data["fluorescence_yield"];
}

export async function getAbsorptionEdgeEnergy(element: string) {

  const response = await fetch(
    `${apiUrl}/xray_levels?filter[element]='${element}'`
  );
  console.log(`response: ${response}`)
  console.dir(response)
  const data = await response.json();
  console.dir(data)
  return data["absorption_edge"];
}

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
