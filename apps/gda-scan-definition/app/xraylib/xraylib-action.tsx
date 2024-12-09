"use server";
// https://github.com/xraypy/XrayDB?tab=readme-ov-file
// and schema here
// https://xraypy.github.io/XrayDB/dbschema.html
// file from here

import { actionClient } from "../clients/actionclient";
import { ElementType } from "@diamondlightsource/periodic-table/elements";
import { z } from "zod";

import sqlite3 from "sqlite3";
import { allowedElements } from "../schemas/qexafs";

// todo fix the filesystem readout here
// Initialize an in-memory SQLite database
const db = new sqlite3.Database("./xraydb2.sqlite", (err) => {
  if (err) {
    console.error("Failed to open database:", err.message);
    return;
  }
  console.log("Connected to file read only SQLite database.");
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
function getAbsorptionEdgeEnergy(
  elementName: string,
  callback: (err: Error | null, energy: number | null) => void
) {
  const query = `SELECT absorption_edge FROM xray_levels WHERE element = ?`;

  db.get(query, [elementName], (err, row) => {
    console.log(`some row: ${row}`);
    console.log(`some error: ${err}`);

    if (err) {
      callback(err, null);
      return;
    }
    if (row) {
      callback(null, row.absorption_edge);
    } else {
      callback(new Error(`Element '${elementName}' not found.`), null);
    }
  });
}

const absorptionEdgeEnergyRequestSchema = z.object({
  element: z.enum(allowedElements),
});

export const actionGetAbsorptionEdgeEnergy = actionClient
  .schema(absorptionEdgeEnergyRequestSchema)
  .action(async ({ parsedInput: { element } }) => {
    getAbsorptionEdgeEnergy(element, (err, energy) => {
      if (err) {
        return { error: err.message };
      }

      return {
        success: "Absorption edge energy retrieved successfully",
        energy,
      };
    });
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
  element: z.enum(allowedElements),
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
