"use server";
// schema here
// https://xraypy.github.io/XrayDB/dbschema.html

import { z } from "zod";

import { actionClient } from "../clients/actionclient";
import { allowedElementSymbols } from "./allowedElementSymbols";
import {
  getAbsorptionEdgeEnergy,
  getElementProperties,
  getFluorescenceYields,
  getTransitionsEmissionsForElement,
  getXrayLevelsForElement,
} from "./new-api-access";

const elementRequestSchema = z.object({
  elementSymbol: z.enum(allowedElementSymbols),
});

export const actionGetFluorescenceYields = actionClient
  .schema(elementRequestSchema)
  .action(async ({ parsedInput: { elementSymbol } }) => {
    const f = await getFluorescenceYields(elementSymbol);
    console.log(`${elementSymbol} fluorescence: ${f.yield}`);
    return {
      success: "Fluorescence yields retrieved successfully",
      yieldValue: f.yield,
    };
  });

export const actionGetAbsorptionEdgeEnergy = actionClient
  .schema(elementRequestSchema)
  .action(async ({ parsedInput: { elementSymbol } }) => {
    console.log(`started the get absorption for ${elementSymbol}`)
    const energy = await getAbsorptionEdgeEnergy(elementSymbol);
    console.log(`${elementSymbol} energy: ${energy.toString()}`);
    return {
      success: "Absorption edge energy retrieved successfully",
      energy,
    };
  });

export const actionGetElementProperties = actionClient
  .schema(elementRequestSchema)
  .action(async ({ parsedInput: { elementSymbol } }) => {
    const data = await getElementProperties(elementSymbol);
    console.log(`data :${data} for element: ${elementSymbol}`);
    return {
      success: "Ok",
      data,
    };
  });

export const actionGetXrayLevelsForElement = actionClient
  .schema(elementRequestSchema)
  .action(async ({ parsedInput: { elementSymbol } }) => {
    const data = await getXrayLevelsForElement(elementSymbol);
    console.log(`data :${data} for element: ${elementSymbol}`);
    return {
      success: "Ok",
      data,
    };
  });

export const actionGetTransitionsEmissionsForElement = actionClient
  .schema(elementRequestSchema)
  .action(async ({ parsedInput: { elementSymbol } }) => {
    const data = await getTransitionsEmissionsForElement(elementSymbol);
    console.log(`data :${data} for element: ${elementSymbol}`);
    return {
      success: "Ok",
      data,
    };
  });
