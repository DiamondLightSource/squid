"use server";
import fs from "fs";
import { XMLBuilder, XMLValidator, XMLParser } from "fast-xml-parser";
import { actionClient } from "../clients/actionclient";
import { circleSchema } from "../schemas/circleSchema";

// https://www.npmjs.com/package/fast-xml-parser

// Path to store XML data
const filePath = "/tmp/next/circles-fast.xml";
const builder = new XMLBuilder();
const parser = new XMLParser();

// Helper to read existing data
function readCircles(): any[] {
  if (!fs.existsSync(filePath)) return [];
  const data = fs.readFileSync(filePath, "utf-8");
  const parsed = parser.parse(data);
  console.log("Read circles", parsed);
  const circles = parsed["circles"]?.circle;
  return Array.isArray(circles) ? circles : [circles]; // Handle no or single entry cases
}

// Action: Add a new circle
export const addCircleFast = actionClient
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

    const xml = builder.build(updatedData);
    console.log("Writing to file", xml);
    fs.writeFileSync(filePath, xml);

    return { success: "Circle added successfully", circle: newCircle };
  });

// Action: Get all circles
export const getCirclesFast = actionClient.action(async () => {
  const circles = readCircles();
  return { circles };
});
