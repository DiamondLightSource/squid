"use server";
// file from here
// https://github.com/xraypy/XrayDB?tab=readme-ov-file
// and schema here
// https://xraypy.github.io/XrayDB/dbschema.html
// todo trying the async sqlite3 variant
// https://www.npmjs.com/package/promised-sqlite3

import { promisify } from "util";
import { actionClient } from "../clients/actionclient";
import { ElementType } from "@diamondlightsource/periodic-table/elements";
import { z } from "zod";

import sqlite3 from "sqlite3";
import { allowedElementSymbols } from "../schemas/qexafs";
import path from "path";

// Construct the absolute path to the database file
const dbPath = path.join(process.cwd(), "data", "xraydb.sqlite");

console.log(`dbPath: ${dbPath}`);

// todo fix the filesystem readout here
// Initialize an in-memory SQLite database
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error("Failed to open database:", err.message);
    return;
  }
  console.log("Connected to file read only SQLite database.");
});
const testQuery = `SELECT * FROM xray_levels WHERE element = 'Fe'`;

const dbGet = promisify(db.get.bind(db));

db.get(testQuery, (err, row) => {
  console.log(`some row: ${Object.keys(row)}`);
  console.log(`edge: ${row.absorption_edge}`);
  console.log(`some error: ${err}`);
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
async function getAbsorptionEdgeEnergy(elementSymbol: string) {
  const query = `SELECT absorption_edge FROM xray_levels WHERE element = '${elementSymbol}';`;

  const result = await dbGet(query);
  console.log(`result: ${result}`);
  return result;
  //  (err, row) => {
  //   console.log(`some row: ${row}`);
  //   console.log(`some error: ${err}`);

  //   if (err) {
  //     callback(err, null);
  //     return;
  //   }
  //   if (row) {
  //     callback(null, row.absorption_edge);
  //   } else {
  //     callback(new Error(`Element '${elementSymbol}' not found.`), null);
  //   }
  // });
}

const absorptionEdgeEnergyRequestSchema = z.object({
  elementSymbol: z.enum(allowedElementSymbols),
});

// todo bug with the promises vs callbacks setup
export const actionGetAbsorptionEdgeEnergy = actionClient
  .schema(absorptionEdgeEnergyRequestSchema)
  .action(async ({ parsedInput: { elementSymbol } }) => {
    const energy = await getAbsorptionEdgeEnergy(elementSymbol);
    console.log(`some energy: ${energy.toString()}`);
    // if (err) {
    //   return { error: err.message };
    // }

    return {
      success: "Absorption edge energy retrieved successfully",
      energy,
    };
    // getAbsorptionEdgeEnergy(elementSymbol, (err, energy) => {
    //   console.log(`some energy: ${energy}`);
    //   if (err) {
    //     return { error: err.message };
    //   }

    //   return {
    //     success: "Absorption edge energy retrieved successfully",
    //     energy,
    //   };
    // });
  });

// Define a function to get fluorescence yields for a given element
function getFluorescenceYields(elementName: string, callback) {
  const query = `SELECT shell, yield FROM fluorescence_yields WHERE element = ?`;

  db.all(query, [elementName], (err, rows) => {
    if (err) {
      callback(err, null);
      return;
    }
    if (rows && rows.length > 0) {
      callback(null, rows);
    } else {
      callback(
        new Error(`No fluorescence yields found for element '${elementName}'.`),
        null
      );
    }
  });
}

const fluorescenceYieldsRequestSchema = z.object({
  element: z.enum(allowedElementSymbols),
});

export const actionGetFluorescenceYields = actionClient
  .schema(fluorescenceYieldsRequestSchema)
  .action(async ({ parsedInput: { element } }) => {
    getFluorescenceYields(element, (err, yields) => {
      if (err) {
        return { error: err.message };
      }

      return {
        success: "Fluorescence yields retrieved successfully",
        yields,
      };
    });
  });
