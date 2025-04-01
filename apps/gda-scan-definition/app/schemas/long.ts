
import { z } from "zod";

// todo add this  for beanType allowed options
const FishEnum = z.enum(["Salmon", "Tuna", "Trout"]);

const ParametersForScanBean = z.object({
    beanFileName: z.string() , // '/scratch/users/data/2024/0-0/xml/Experiment_2_b18/QEXAFS_Parameters.xml',
    beanType: z.string(), // 'uk.ac.gda.beans.exafs.QEXAFSParameters'
    // ParameterValue: z.optional()
});


export const LongRowSchema = z.object({
  numberOfRepetitions: z.number().min(1),
  params: z.array(ParametersForScanBean),
});

export type LongRowSchemaType = z.infer<typeof LongRowSchema>;

// Define schema for an array of rows
export const LongSchema = z.object({
  ParameterScansList: z.array(LongRowSchema)
});
export type LongSchemaType = z.infer<typeof LongSchema>;
