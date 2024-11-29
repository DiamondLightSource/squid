import { z } from "zod";
import { elements } from "@diamondlightsource/periodic-table/elements";
import { maxHeaderSize } from "http";

// more than Zn(30) and less than Nd(60)
// todo make this real
const allowedElements = elements
  .filter((e) => {
    const n = parseInt(e.Number);
    return 30 < n && n < 60;
  })
  .map((element) => element.Symbol) as [string, ...string[]];

export const multipleScanSchema = z.object({
  diameter: z.number().positive().int(),
  color: z.enum(["red", "green", "blue", "yellow"]),
  title: z.string().min(1).max(100),
});

const allowedEdges = ["K", "L3", "L2", "L1", "M5", "M4", "M3", "M2", "M1"] as [
  string,
  ...string[],
];
// Define the schema for validation

export const paramsSchema = z.object({
  element: z.enum(allowedElements),
  edge: z.enum(allowedEdges),
  edgeEnergy: z.number().positive().int(),
  initialEnergy: z.number().positive().int(),
  finalEnergy: z.number().positive().int(),
  speedMDegPerSecond: z.number().positive().min(0.1).max(85100),
  stepSize: z.number().positive().int(),
});

export const detectorsSchema = z.object({
  diameter: z.number().positive().int(),
  color: z.enum(["red", "green", "blue", "yellow"]),
  title: z.string().min(1).max(100),
});

export const sampleSchema = z.object({
  diameter: z.number().positive().int(),
  color: z.enum(["red", "green", "blue", "yellow"]),
  title: z.string().min(1).max(100),
});

export const outputSchema = z.object({
  diameter: z.number().positive().int(),
  color: z.enum(["red", "green", "blue", "yellow"]),
  title: z.string().min(1).max(100),
});
