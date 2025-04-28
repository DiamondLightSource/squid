"use client";
import z from "zod";

const energyTypeUnion = z.discriminatedUnion("startEnergy", [
    z.object({ startEnergy: z.literal("electronVolts"), data: z.number() }), // five regions by defualt
    z.object({ startEnergy: z.literal("inTermsOfK"), data: z.number() }), // three regions by default but larger
]);
const scalingTypes = z.enum(['constant', 'linear', 'quadratic']);

export type Scaling = z.infer<typeof scalingTypes>;
function getExposure(value: number, scaling: Scaling): number {
    if (scaling == 'quadratic') {
        return value ** value * 0.5 + 0.1 * value + 0.3;
    }
    if (scaling == 'linear') {
        return 0.1 * value + 0.3;
    }
    return value;
}
// todo make into a ZOD schema

export type RegionOfInterest = {
    startingEnergyElectronVolts: number; // or in K space if XAFS scan, add toggle
    numberOfPointsOfExposure: number;
    endEnergyElectronVolts: number;
    exposureMilisecondsPerPoint: number; // may not be constant
    formulaForExposureTime: string;
};
const defaultXanesROIs: RegionOfInterest[] = [];
const defaultExadsROIs: RegionOfInterest[] = [];
