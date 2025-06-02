import z from "zod";
const newPvUpdateSchema = z.object({
    "pv": z.string().describe("pv: SR-DI-DCCT-01:SIGNAL"),
    "readonly": z.boolean().describe("readonly true"),
    "type": z.string().describe("type update"),
    "seconds": z.number().describe("seconds 1747142090"),
    "nanos": z.number().describe("nanos 409140467"),
    "vtype": z.string().describe("vtype VDouble"),
    "units": z.string().describe("units mA"),
    "description": z.null().describe("description null"),
    "precision": z.number().describe("precision 4"),
    "min": z.number().describe("min 0"),
    "max": z.number().describe("max 300"),
    "warn_low": z.string().describe("warn_low NaN"),
    "warn_high": z.string().describe("warn_high NaN"),
    "alarm_low": z.string().describe("alarm_low NaN"),
    "alarm_high": z.string().describe("alarm_high NaN"),
    "severity": z.string().describe("severity NONE"),
    "value": z.number().describe("value 300.044341016123"),
});



export type PhysicalPvWithMm = z.infer<typeof newPvUpdateSchema>;

export const StageStateSchema = z.object({
    x: z.number(),
    y: z.number(),
    z: z.number(),
});

export type StageState = z.infer<typeof StageStateSchema>;
export const startingState: StageState = {
    x: 0,
    y: 0,
    z: 0
};
