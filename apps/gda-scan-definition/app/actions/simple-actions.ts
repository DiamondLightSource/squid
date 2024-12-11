"use server";
import fs from "fs";
import { create } from "xmlbuilder2";
import { actionClient } from "../clients/actionclient";
import { basePath } from "./basePath";
import {
  DetectorConfiguration,
  DetectorsSchema,
} from "../components/forms/DetectorParametersForm";
import { detectorParametersSchema } from "../schemas/qexafs";
import { XMLSerializedAsObject } from "xmlbuilder2/lib/interfaces";

export const simpleAction = actionClient.action(async () => {
  return { success: "Simple action executed" };
});

export const simpleActionWithParams = actionClient.action(
  async ({ parsedInput }) => {
    return { success: `Simple action executed with params: ${parsedInput}` };
  }
);

function readDetectorFile(): DetectorsSchema {
  const path = `${basePath}/Detector_Parameters.xml`;
  console.debug(`Reading detector file at path: ${path}`);

  if (!fs.existsSync) {
    console.log(`Detector file not found at path: ${path}`);
    return { shouldValidate: false, detectorConfiguration: [] };
  }

  const buffer: Buffer = fs.readFileSync(path);
  const parsedResult = create(buffer.toString()).end({ format: "object" });
  const parsed =
    Array.isArray(parsedResult) == true ? parsedResult[0] : parsedResult;
  if (typeof parsed !== "object" || !parsed["DetectorParameters"]) {
    console.error("DetectorParameters not found in the file");
    return { shouldValidate: false, detectorConfiguration: [] };
  }
  console.debug(`Parsed detector file: ${JSON.stringify(parsed)}`);
  // parse into the zod schema, assert it belongs to the right type
  const detectorsSchema: DetectorsSchema = detectorParametersSchema.parse(
    parsed["DetectorParameters"]
  );
  // return the parsed object
  return detectorsSchema;
}

export const getDetectors = actionClient.action(async () => {
  console.log("Fetching detectors");
  const detectorsParams = readDetectorFile();
  console.log(`Detectors: ${JSON.stringify(detectorsParams)}`);
  return { detectors: detectorsParams };
});
