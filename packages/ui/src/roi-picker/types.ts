import { z } from "zod";

// Generic Region of Interest Schema
export const roiSchema = z.object({
  xStart: z.number(),
  xEnd: z.number(),
  yStart: z.number(),
  yEnd: z.number(),
  values: z.record(z.string(), z.number()),
});

export const axesSchema = z.object({
  xMin: z.number(),
  xMax: z.number(),
  yMin: z.number(),
  yMax: z.number(),
  xLabel: z.string(),
  yLabel: z.string(),
});

export const roiContextSchema = z.object({
  axes: axesSchema,
  regions: z.array(roiSchema),
  data: z.array(z.array(z.number())), // 2D ndarray
});

export type Roi = z.infer<typeof roiSchema>;
export type Axes = z.infer<typeof axesSchema>;
export type RoiContextType = z.infer<typeof roiContextSchema>;
