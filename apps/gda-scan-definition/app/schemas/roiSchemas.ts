
// in reference to https://github.com/DiamondLightSource/spectroscopy-bluesky/pull/10


import { z } from "zod";

// Sub-schema: QexafsParams
export const qexafsParamsSchema = z.object({
    quad_multiplier: z.number(),
    linear_multiplier: z.number(),
    constant: z.number(),
});

// Main schema: ROI
export const roiSchema = z.object({
    number_of_exposure_points: z.number().int(),
    start_energy_electron_volts: z.number(),
    end_energy_electron_volts: z.number(),
    exposure_miliseconds_per_point: z.number(),
    qexafs_params: qexafsParamsSchema,
});

// TypeScript types (optional but useful)
export type QexafsParams = z.infer<typeof qexafsParamsSchema>;
export type Roi = z.infer<typeof roiSchema>;
