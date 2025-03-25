import { z } from "zod";

export const XanesRegionSchema = z.object({
    energy: z.number(),
    step: z.number(),
    time: z.number(),
});

export const XanesParametersSchema = z.object({
    scannableName: z.string(),
    element: z.string().max(3),
    edge: z.string().max(3),
    regions: z.array(XanesRegionSchema),
    finalEnergy: z.number(),
});


export type XanesParametersSchemaType = z.infer<typeof XanesParametersSchema>;