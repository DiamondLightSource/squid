"use server";
import fs, { PathLike, PathOrFileDescriptor } from "fs";
import { create } from "xmlbuilder2";
import { actionClient } from "../clients/actionclient";
import {
  outputParametersSchema,
  qexafsParametersSchema,
} from "../schemas/qexafs";
import { basePath } from "./basePath";

// Helper to read existing data
function readParameters(xmlPath: string): any[] {
  if (!fs.existsSync(paramsPath)) return [];
  const data = fs.readFileSync(paramsPath, "utf-8");
  const parsed = create(data).end({ format: "object" });
  console.log("Read params xml", parsed);
  return [];
}

const paramsPath: PathLike = `${basePath}/QEFXEAS_Parameters.xml`;

export const updateParameters = actionClient
  .schema(qexafsParametersSchema)
  .action(async ({ parsedInput }) => {
    const existingParams = readParameters(paramsPath);

    console.log("Adding new parameters", parsedInput);
    const newParams = parsedInput;
    const updatedData = {
      parameters: {
        parameter: [...existingParams, newParams],
      },
    };

    const xml = create(updatedData).end({ prettyPrint: true });
    console.log("Writing to file", xml);
    fs.writeFileSync(paramsPath, xml);

    return {
      success: "Parameters added successfully",
      parameters: newParams,
    };
  });

export const getParameters = actionClient.action(async () => {
  const parameters = readParameters(paramsPath);
  return { parameters };
});

const outputParamsPath: PathLike = `${basePath}/Output_Parameters.xml`;

export const updateOutputParameters = actionClient
  .schema(outputParametersSchema)
  .action(async ({ parsedInput }) => {
    const existingParams = readParameters(outputParamsPath);
    console.log(`existingParams: ${existingParams}`);

    console.log("Adding new parameters", parsedInput);
    const newParams = parsedInput;
    const updatedData = {
      parameters: {
        parameter: [...existingParams, newParams],
      },
    };

    const xml = create(updatedData).end({ prettyPrint: true });
    console.log("Writing to file", xml);
    fs.writeFileSync(outputParamsPath, xml);

    return {
      success: "Parameters added successfully",
      parameters: newParams,
    };
  });

const detectorParamsPath: PathLike = `${basePath}/Detector_Parameters.xml`;
const sampleParamsPath: PathLike = `${basePath}/Sample_Parameters.xml`;

