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
import { z } from "zod";
import { XMLBuilder, XMLValidator, XMLParser } from "fast-xml-parser";

// https://www.npmjs.com/package/fast-xml-parser

export const simpleAction = actionClient.action(async () => {
  return { success: "Simple action executed" };
});

export const simpleActionWithParams = actionClient.action(
  async ({ parsedInput }) => {
    return { success: `Simple action executed with params: ${parsedInput}` };
  }
);

const path = `${basePath}/Detector_Parameters.xml`;
// Path to store XML data
const builder = new XMLBuilder();
const parser = new XMLParser();

function readDetectorFile(): DetectorsSchema {
  console.debug(`Reading detector file at path: ${path}`);

  if (!fs.existsSync) {
    console.log(`Detector file not found at path: ${path}`);
    return { shouldValidate: false, detectorConfiguration: [] };
  }

  const buffer: Buffer = fs.readFileSync(path);
  console.log(`Read raw detector file: ${buffer.toString()}`);
  const parsedResult = parser.parse(buffer.toString());
  console.log(`Parsed detector schema object: ${parsedResult}`);
  // const parsedResult = create(buffer.toString()).end({ format: "object" });
  const parsed =
    Array.isArray(parsedResult) == true ? parsedResult[0] : parsedResult;
  if (typeof parsed !== "object" || !parsed["DetectorParameters"]) {
    console.error("DetectorParameters not found in the file");
    return { shouldValidate: false, detectorConfiguration: [] };
  }
  // console.debug(`Parsed detector file: ${JSON.stringify(parsed)}`);
  // parse into the zod schema, assert it belongs to the right type
  const detectorsSchema: DetectorsSchema = detectorParametersSchema.parse(
    parsed["DetectorParameters"]
  );
  console.log(`Final schema with values: ${detectorsSchema}`);
  // return the parsed object
  return detectorsSchema;
}

export const getDetectors = actionClient.action(async () => {
  console.log("Fetching detectors");
  const detectorsParams = readDetectorFile();
  console.log(`Detectors: ${JSON.stringify(detectorsParams)}`);
  return { detectors: detectorsParams };
});

function writeDetectorFile(detectors: DetectorsSchema) {
  console.debug(`Writing detector file at path: ${path}`);
  const xml = create({ DetectorParameters: detectors }).end({ format: "xml" });
  fs.writeFileSync(path, xml);
  console.log(`Wrote detector file: ${xml}`);
  return { success: "Wrote detector file" };
}

export const updateDetectors = actionClient
  .schema(detectorParametersSchema)
  .action(async ({ parsedInput }) => {
    console.log(`Updating detectors: ${JSON.stringify(parsedInput)}`);
    writeDetectorFile(parsedInput);
    return { success: "Updated detectors" };
  });
