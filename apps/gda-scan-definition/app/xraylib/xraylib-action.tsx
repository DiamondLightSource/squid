"use server";
// https://github.com/xraypy/XrayDB?tab=readme-ov-file
// and schema here
// https://xraypy.github.io/XrayDB/dbschema.html
// file from here

import { actionClient } from "../clients/actionclient";
import { ElementType } from "@diamondlightsource/periodic-table/elements";
import { z } from "zod";

import sqlite3 from "sqlite3";

// Initialize an in-memory SQLite database
const db = new sqlite3.Database(".xraydb.sqlite", (err) => {
  if (err) {
    console.error("Failed to open database:", err.message);
    return;
  }
  console.log("Connected to in-memory SQLite database.");
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
  element: ElementType,
  callback: (err: Error | null, energy: number | null) => void
) {
  const query = `SELECT absorption_edge FROM xray_levels WHERE element = ?`;

  db.get(query, [element], (err, row) => {
    if (err) {
      callback(err, null);
      return;
    }
    if (row) {
      callback(null, row.absorption_edge);
    } else {
      callback(new Error(`Element '${element}' not found.`), null);
    }
  });
}

// Define a function to get fluorescence yields for a given element
function getFluorescenceYields(element, callback) {
  const query = `SELECT shell, yield FROM fluorescence_yields WHERE element = ?`;

  db.all(query, [element], (err, rows) => {
    if (err) {
      callback(err, null);
      return;
    }
    if (rows && rows.length > 0) {
      callback(null, rows);
    } else {
      callback(
        new Error(`No fluorescence yields found for element '${element}'.`),
        null
      );
    }
  });
}

// Action: Add a new circle
export const addCircle = actionClient
  .schema(circleSchema)
  .action(async ({ parsedInput: { diameter, color, title } }) => {
    const existingCircles = readCircles();

    const newCircle = { diameter, color, title };
    console.log("Adding circle", newCircle);
    const updatedData = {
      circles: {
        circle: [...existingCircles, newCircle],
      },
    };

    const xml = create(updatedData).end({ prettyPrint: true });
    console.log("Writing to file", xml);
    fs.writeFileSync(filePath, xml);

    return { success: "Circle added successfully", circle: newCircle };
  });
