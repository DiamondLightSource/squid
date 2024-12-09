"use server";
import fs, { PathLike, PathOrFileDescriptor } from "fs";
import { create } from "xmlbuilder2";
import { actionClient } from "../clients/actionclient";
import {
  detectorParametersSchema,
  outputParametersSchema,
  qexafsParametersSchema,
  sampleParametersSchema,
} from "../schemas/qexafs";
import { basePath } from "./basePath";
import {
  XMLSerializedAsObject,
  XMLSerializedAsObjectArray,
} from "xmlbuilder2/lib/interfaces";

// Helper to read existing data
function readParameters(xmlPath: string): any[] {
  if (!fs.existsSync(xmlPath)) return [];
  const data = fs.readFileSync(xmlPath, "utf-8");
  const parsed: XMLSerializedAsObject | XMLSerializedAsObjectArray = create(
    data
  ).end({ format: "object" });
  console.log("Read params xml", parsed);
  // return an array from the parsed
  return Array.isArray(parsed) ? parsed : [parsed];
}

const createParamsCallback =
  (p: string) =>
  async ({ parsedInput }: { parsedInput: any }) => {
    const existingParams = readParameters(p);
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
    fs.writeFileSync(p, xml);

    return {
      success: "Parameters added successfully",
      parameters: newParams,
    };
  };

const qefxeasPath = `${basePath}/QEFXEAS_Parameters.xml`;
export const updateQexafsParameters = actionClient
  .schema(qexafsParametersSchema)
  .action(createParamsCallback(qefxeasPath));

export const getParameters = actionClient.action(async () => {
  const parameters = readParameters(qefxeasPath);
  return { parameters };
});




export const updateDetectorParameters = actionClient
  .schema(detectorParametersSchema)
  .action(createParamsCallback(`${basePath}/Detector_Parameters.xml`));

export const updateOutputParameters = actionClient
  .schema(outputParametersSchema)
  .action(createParamsCallback(`${basePath}/Output_Parameters.xml`));

export const updateSampleParameters = actionClient
  .schema(sampleParametersSchema)
  .action(createParamsCallback(`${basePath}/Sample_Parameters.xml`));
