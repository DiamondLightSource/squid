"use server";
// file from here
// https://github.com/xraypy/XrayDB?tab=readme-ov-file
// and schema here
// https://xraypy.github.io/XrayDB/dbschema.html

import { promisify } from "util";
import { actionClient } from "../clients/actionclient";
import { string, z } from "zod";

import sqlite3 from "sqlite3";
import { allowedElementSymbols } from "../schemas/qexafs";
import path from "path";
import {
  getElementProperties,
  getTransitionsEmissionsForElement,
  getXrayLevelsForElement,
} from "./new-api-access";

// INITIALIZE DATABASE SETUP
// Construct the absolute path to the database file
const dbPath = path.join(process.cwd(), "data", "xraydb.sqlite");

console.log(`dbPath: ${dbPath}`);
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error("Failed to open database:", err.message);
    return;
  }
  console.log("Connected to file read only SQLite database.");
});

const dbGet = promisify(db.get.bind(db));

const testQuery = `SELECT * FROM xray_levels WHERE element = 'Fe'`;
db.get(testQuery, (err, row) => {
  console.log(
    `starting the db with iron, some row: ${Object.keys(row)}  edge: ${row.absorption_edge}`
  );
});

process.on("exit", () => {
  db.close((err) => {
    if (err) {
      console.error("Failed to close database:", err.message);
    } else {
      console.log("Closed database connection.");
    }
  });
});

// Define a function to get the absorption edge energy for a given element
async function getAbsorptionEdgeEnergy(elementSymbol: string): Promise<number> {
  const query = `SELECT absorption_edge FROM xray_levels WHERE element = '${elementSymbol}';`;
  const result = await dbGet(query);
  console.log(`result: ${result}`);

  return result["absorption_edge"];
}

export type FluorescenceOutput = {
  yield: number;
};

export async function getFluorescenceYields(
  elementSymbol: string
): Promise<FluorescenceOutput> {
  const query = `SELECT fluorescence_yield FROM xray_levels WHERE element = '${elementSymbol}';`;
  const r = (await dbGet(query)) as { yield: number };
  console.log(`keys: ${Object.keys(r)}`);
  const o: FluorescenceOutput = {
    yield: r["fluorescence_yield"],
  };
  return o;
}

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
