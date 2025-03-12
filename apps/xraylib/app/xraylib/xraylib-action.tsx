"use server";
// schema here
// https://xraypy.github.io/XrayDB/dbschema.html

import { z } from "zod";

import { actionClient } from "../clients/actionclient";
import { allowedElementSymbols } from "./allowedElementSymbols";
import {
  getElementProperties,
  getTransitionsEmissionsForElement,
  getXrayLevelsForElement,
} from "./new-api-access";

const elementRequestSchema = z.object({
  elementSymbol: z.enum(allowedElementSymbols),
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
