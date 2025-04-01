
import { z } from "zod";

export const LongRowSchema = z.object({
  Scan: z.string(), // File path for QEXAFSParameters
  Detector: z.string(), // File path for DetectorParameters
  Sample: z.string(), // File path for SampleParameters
  Sample_getSampleWheelParameters_getFilter: z.string(), // String value (e.g., "Laser")
  Sample_getSampleParameterMotorPosition_sam2x_getDoMove: z.boolean(), // Boolean
  Sample_getSampleParameterMotorPosition_sam2x_getDemandPosition: z.number(), // Float or int
  Sample_getSampleParameterMotorPosition_sam2y_getDoMove: z.boolean(), // Boolean
  Sample_getSampleParameterMotorPosition_sam2y_getDemandPosition: z.number(), // Float or int
  Sample_getSampleParameterMotorPosition_fluoDist_getDoMove: z.boolean(), // Boolean
  Sample_getSampleParameterMotorPosition_fluoDist_getDemandPosition: z.number(), // Float or int
  Output: z.string(), // File path for OutputParameters
  Repetitions: z.number().int(), // Integer value
});

export type LongRowSchemaType = z.infer<typeof LongRowSchema>;

// Define schema for an array of rows
export const LongSchema = z.object({
  ParameterScansList: z.array(LongRowSchema)
});
export type LongSchemaType = z.infer<typeof LongSchema>;
