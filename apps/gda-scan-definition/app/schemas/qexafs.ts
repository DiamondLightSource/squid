import { z } from "zod";
import { elements } from "@diamondlightsource/periodic-table/elements";
import zodToJsonSchema from "zod-to-json-schema";
import { convertSchemaToUiSchema, JsonSchema, UiSchema } from "../forms-editor/schemaToUiSchema";

export type FormFileDefinition = {
  fileName: string;
  schema: JsonSchema;
  uiSchema: UiSchema;
}

// INVARIANTS
export const allowedElementSymbols = elements
  .filter((e) => {
    const n = parseInt(e.Number);
    return 1 < n && n < 109;
  })
  .map((element) => element.Symbol) as [string, ...string[]];

export const multipleScanSchema = z.object({
  diameter: z.number().positive().int(),
  color: z.enum(["red", "green", "blue", "yellow"]),
  title: z.string().min(1).max(100),
});

export const allowedEdges = [
  "K",
  "L3",
  "L2",
  "L1",
  "M5",
  "M4",
  "M3",
  "M2",
  "M1",
] as [string, ...string[]];

// Define the schema for validation

export const qexafsParametersSchema = z.object({
  element: z.enum(allowedElementSymbols),
  edge: z.enum(allowedEdges),
  // edgeEnergy: z.number().positive().int(),
  initialEnergy: z.number().positive().int(),
  finalEnergy: z.number().positive().int(),
  // speed is in MDegPerSecond
  speed: z.number().positive().min(0.1).max(85100),
  stepSize: z.number().positive().int(),
});

export type QexafsParametersType = z.infer<typeof qexafsParametersSchema>;
export const qexafsParametersJson: JsonSchema = zodToJsonSchema(qexafsParametersSchema) as unknown as JsonSchema;
export const qexafsParametersUiSchema = convertSchemaToUiSchema(qexafsParametersJson);

// Base schema for a single detector configuration
export const detectorConfigurationSchema = z.object({
  description: z.string(),
  detectorName: z.string().optional(), // Some configurations may have empty detector names
  configFileName: z.string().optional(),
  scriptCommand: z.string().optional(),
  useDetectorInScan: z.boolean(),
  useScriptCommand: z.boolean(),
  useConfigFile: z.boolean(),
  alwaysUseDetectorInScan: z.boolean().optional(),
  extraDetectorName: z.string().optional(),
});


// Main schema for DetectorParameters
// todo missing the definition for the full detector parameters schema
export const detectorParametersSchema = z.object({
  shouldValidate: z.boolean(),
  detectorConfigurationsList: z.array(detectorConfigurationSchema),
});

export const detectorConfigurationJson: JsonSchema = zodToJsonSchema(detectorConfigurationSchema) as unknown as JsonSchema;
export const detectorConfigurationUiSchema = convertSchemaToUiSchema(detectorConfigurationJson);
export type DetectorConfiguration = z.infer<typeof detectorConfigurationSchema>;
export type DetectorsSchema = z.infer<typeof detectorParametersSchema>;

export const outputParametersSchema = z.object({
  shouldValidate: z.boolean(),
  asciiFileName: z.string(),
  asciiDirectory: z.string(),
  nexusDirectory: z.string(),
  extraData: z.boolean(),
  signalActive: z.boolean(),
  metadataActive: z.boolean(),
  beforeScriptName: z.string().optional(), // Optional since it can be empty
  afterScriptName: z.string().optional(), // Optional since it can be empty
  beforeFirstRepetition: z.string().optional(), // Optional since it can be empty
});

export type OutputParametersType = z.infer<typeof outputParametersSchema>;

export const outputParametersJson: JsonSchema = zodToJsonSchema(outputParametersSchema) as unknown as JsonSchema;
export const outputParametersUiSchema = convertSchemaToUiSchema(outputParametersJson);

// Schema for common motor position structure
export const motorPositionSchema = z.object({
  scannableName: z.string(),
  description: z.string(),
  doMove: z.boolean(),
  demandPosition: z.number(),
});

// Schema for xythetastage
const xyThetaStageSchema = z.object({
  x: z.number(),
  y: z.number(),
  theta: z.number(),
});

// Schema for ln2cryostage
const ln2CryoStageSchema = z.object({
  height: z.number(),
  angle: z.number(),
  calibAngle: z.number(),
  calibHeight: z.number(),
  sampleNumberA: z.number(),
  sampleNumberB: z.number(),
  cylinderType: z.string(),
  manual: z.boolean(),
  editCalibration: z.boolean(),
});

// Schema for sxcryostage
const sxCryoStageSchema = z.object({
  height: z.number(),
  rot: z.number(),
  calibHeight: z.number(),
  sampleNumber: z.number(),
  manual: z.boolean(),
});

// Schema for pulsetubecryostat
const pulseTubeCryostatSchema = z.object({
  temperature1: z.number(),
  temperature2: z.number(),
  pressure: z.number(),
  setPoint: z.number(),
  tolerance: z.number(),
  time: z.number(),
  controlFlag: z.boolean(),
});

// Schema for furnace
const furnaceSchema = z.object({
  temperature: z.number(),
  tolerance: z.number(),
  time: z.number(),
  controlFlag: z.boolean(),
});

// Schema for lakeshore
const lakeShoreSchema = z.object({
  temp0: z.number(),
  temp1: z.number(),
  temp2: z.number(),
  temp3: z.number(),
  tempSelect0: z.boolean(),
  tempSelect1: z.boolean(),
  tempSelect2: z.boolean(),
  tempSelect3: z.boolean(),
  setPointSet: z.number(),
  tolerance: z.number(),
  time: z.number(),
  controlFlag: z.boolean(),
});

// Schema for samplewheel
const sampleWheelSchema = z.object({
  demand: z.number(),
  filter: z.string().optional(), // May be empty
  manual: z.boolean(),
  wheelEnabled: z.boolean(),
});

// Schema for userstage
const userStageSchema = z.object({
  axis2: z.number(),
  axis4: z.number(),
  axis5: z.number(),
  axis6: z.number(),
  axis7: z.number(),
  axis8: z.number(),
});

// Main Schema for B18SampleParameters
export const sampleParametersSchema = z.object({
  shouldValidate: z.boolean(),
  name: z.string(),
  description1: z.string(),
  description2: z.string(),
  stage: z.string(),
  temperaturecontrol: z.string(),
  xythetastage: xyThetaStageSchema,
  ln2cryostage: ln2CryoStageSchema,
  sxcryostage: sxCryoStageSchema,
  pulsetubecryostat: pulseTubeCryostatSchema,
  furnace: furnaceSchema,
  lakeshore: lakeShoreSchema,
  samplewheel: sampleWheelSchema,
  userstage: userStageSchema,
  sampleParameterMotorPositionsList: z.array(motorPositionSchema),
});


export const fullQexafsSchema = z.object({
  qexafsParameters: qexafsParametersSchema,
  detectorParameters: detectorParametersSchema,
  outputParameters: outputParametersSchema,
  sampleParameters: sampleParametersSchema,
});


export const partialQexafsSchema = z.object({
  qexafsParameters: qexafsParametersSchema,
  outputParameters: outputParametersSchema,
})

export type PartialQexafsSchemaType = z.infer<typeof partialQexafsSchema>;

export const partialQexafsJson: JsonSchema = zodToJsonSchema(partialQexafsSchema) as unknown as JsonSchema;


export type FullQexafsSchemaType = z.infer<typeof fullQexafsSchema>;
export const fullQexafsJson: JsonSchema = zodToJsonSchema(fullQexafsSchema) as unknown as JsonSchema;
// console.log("full qexafs json", fullQexafsJson);
export const fullQexafsUiSchema: UiSchema = convertSchemaToUiSchema(fullQexafsJson);
// console.log('fullQexafsUiSchema', fullQexafsUiSchema);



export const initFullQexafsSchema: FullQexafsSchemaType = {
  qexafsParameters: {
    element: "Fe",
    edge: "K",
    // edgeEnergy: 7112,
    initialEnergy: 7112,
    finalEnergy: 7112,
    // speedMDegPerSecond: 1,
    speed: 1,
    stepSize: 0.1,
  },
  detectorParameters: {
    shouldValidate: true,
    detectorConfigurationsList: [],
  },
  outputParameters: {
    shouldValidate: true,
    asciiFileName: "output.dat",
    asciiDirectory: "/tmp",
    nexusDirectory: "/tmp",
    extraData: false,
    signalActive: true,
    metadataActive: true,
    beforeScriptName: "",
    afterScriptName: "",
    beforeFirstRepetition: "",
  },
  sampleParameters: {
    shouldValidate: true,
    name: "Sample Name",
    description1: "Description 1",
    description2: "Description 2",
    stage: "xythetastage",
    temperaturecontrol: "ln2cryostage",
    xythetastage: {
      x: 0,
      y: 0,
      theta: 0,
    },
    ln2cryostage: {
      height: 0,
      angle: 0,
      calibAngle: 0,
      calibHeight: 0,
      sampleNumberA: 0,
      sampleNumberB: 0,
      cylinderType: "",
      manual: false,
      editCalibration: false,
    },
    sxcryostage: {
      height: 0,
      rot: 0,
      calibHeight: 0,
      sampleNumber: 0,
      manual: false,
    },
    pulsetubecryostat: {
      temperature1: 0,
      temperature2: 0,
      pressure: 0,
      setPoint: 0,
      tolerance: 0,
      time: 0,
      controlFlag: false,
    },
    furnace: {
      temperature: 0,
      tolerance: 0,
      time: 0,
      controlFlag: false,
    },
    lakeshore: {
      temp0: 0,
      temp1: 0,
      temp2: 0,
      temp3: 0,
      tempSelect0: false,
      tempSelect1: false,
      tempSelect2: false,
      tempSelect3: false,
      setPointSet: 0,
      tolerance: 0,
      time: 0,
      controlFlag: false,
    },
    samplewheel: {
      demand: 0,
      filter: "",
      manual: false,
      wheelEnabled: false,
    },
    userstage: {
      axis2: 0,
      axis4: 0,
      axis5: 0,
      axis6: 0,
      axis7: 0,
      axis8: 0,
    },
    sampleParameterMotorPositionsList: [],
  },

};

export type SampleParametersType = z.infer<typeof sampleParametersSchema>;
export const sampleParametersJson: JsonSchema = zodToJsonSchema(sampleParametersSchema) as unknown as JsonSchema;
export const sampleParametersUiSchema = convertSchemaToUiSchema(sampleParametersJson);

export const sampleDefinition: FormFileDefinition = {
  fileName: "Sample_Parameters",
  schema: sampleParametersJson,
  uiSchema: sampleParametersUiSchema,
}

export const detectorsDefinition: FormFileDefinition = {
  fileName: "Detector_Parameters",
  schema: detectorConfigurationJson,
  uiSchema: detectorConfigurationUiSchema,
}

// console.dir(detectorConfigurationJson, {depth: null})

export const qexafsDefinition: FormFileDefinition = {
  fileName: "QEXAFS_Parameters",
  schema: qexafsParametersJson,
  uiSchema: qexafsParametersUiSchema,
}

export const outputDefinition: FormFileDefinition = {
  fileName: "Output_Parameters",
  schema: outputParametersJson,
  uiSchema: outputParametersUiSchema,
}

export const formConfigsMap: Record<string, FormFileDefinition> = {
  "Detector_Parameters": detectorsDefinition,
  "QEXAFS_Parameters": qexafsDefinition,
  "Sample_Parameters": sampleDefinition,
  "Output_Parameters": outputDefinition
};


