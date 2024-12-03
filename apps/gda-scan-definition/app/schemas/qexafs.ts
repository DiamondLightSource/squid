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

export const qexafsParametersSchema = z.object({
  element: z.enum(allowedElements),
  edge: z.enum(allowedEdges),
  edgeEnergy: z.number().positive().int(),
  initialEnergy: z.number().positive().int(),
  finalEnergy: z.number().positive().int(),
  speedMDegPerSecond: z.number().positive().min(0.1).max(85100),
  stepSize: z.number().positive().int(),
});

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
export const detectorParametersSchema = z.object({
  shouldValidate: z.boolean(),
  detectorConfiguration: z.array(detectorConfigurationSchema),
});

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

// Schema for common motor position structure
const motorPositionSchema = z.object({
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
const b18SampleParametersSchema = z.object({
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
  sampleParameterMotorPosition: z.array(motorPositionSchema),
});
