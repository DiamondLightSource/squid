"use server";
import fs from "fs";
import { create } from "xmlbuilder2";
import { actionClient } from "../clients/actionclient";
import { circleSchema } from "../schemas/circleSchema";

// Path to store XML data
const filePath = "/tmp/next/circles.xml";

// Helper to read existing data
function readCircles(): any[] {
  if (!fs.existsSync(filePath)) return [];
  const data = fs.readFileSync(filePath, "utf-8");
  const parsed = create(data).end({ format: "object" });
  console.log("Read circles", parsed);
  const circles = parsed['circles']?.circle;
  return Array.isArray(circles) ? circles : [circles]; // Handle no or single entry cases
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

// Action: Get all circles
export const getCircles = actionClient.action(async () => {
  const circles = readCircles();
  return { circles };
});
