"use server";
import fs from "fs";
import { XMLBuilder, XMLParser } from "fast-xml-parser";
import { z } from "zod";
import { actionClient } from "../../clients/actionclient";

export const folderSchema = z.object({
    name: z.string().min(1, "Folder name is required"),
    relativePath: z.string().default("."), // Default to the current directory
});


const basePath: string = "/tmp/qexafs/experiment_1";

/**
 * reads each of the files and compres if identical to the new ones, if not updates them
 */
function updateFiles() {

}

// TODO this but for all four files


// function readDetectorFile(): DetectorsSchema {
//   console.debug(`Reading detector file at path: ${path}`);

//   if (!fs.existsSync) {
//     console.log(`Detector file not found at path: ${path}`);
//     return { shouldValidate: false, detectorConfiguration: [] };
//   }

//   const buffer: Buffer = fs.readFileSync(path);
//   console.log(`Read raw detector file: ${buffer.toString()}`);
//   const parsedResult = parser.parse(buffer.toString());
//   console.log(`Parsed detector schema object: ${parsedResult}`);
//   // const parsedResult = create(buffer.toString()).end({ format: "object" });
//   const parsed =
//     Array.isArray(parsedResult) == true ? parsedResult[0] : parsedResult;
//   if (typeof parsed !== "object" || !parsed["DetectorParameters"]) {
//     console.error("DetectorParameters not found in the file");
//     return { shouldValidate: false, detectorConfiguration: [] };
//   }
//   // console.debug(`Parsed detector file: ${JSON.stringify(parsed)}`);
//   // parse into the zod schema, assert it belongs to the right type
//   const detectorsSchema: DetectorsSchema = detectorParametersSchema.parse(
//     parsed["DetectorParameters"]
//   );
//   console.log(`Final schema with values: ${detectorsSchema}`);
//   // return the parsed object
//   return detectorsSchema;
// }

const builder = new XMLBuilder();
const parser = new XMLParser();

const detectorsPath = `${basePath}/Detector_Parameters.xml`;

const qexafsPath = `${basePath}/QEXAFS_Parameters.xml`
const samplePath = `${basePath}/Sample_Parameters.xml`
const outputPath = `${basePath}/Output_Parameters.xml`

// todo fill this out, good return values
function ensureAllExist() {

}

export type FullQexafsConfig = {}:

export type QexafsUpdate = Partial<FullQexafsConfig>;

async function readFiles(): Promise<FullQexafsConfig> {
    await ensureAllExist();

    // read each file, return the parsed object

    const detectorConfig = DetectorsSchema();

    const c: FullQexafsConfig = {};
    return c

}

async function updateFiles(update: QexafsUpdate): Promise<null> {
    // read each file, compare to the update, if different, update
    // return null
}

// todo add request schema
// todo add athe action
export const readXmlContext = actionClient
    .schema()
    .action(readFiles);


export const updateXmlContext = actionClient.schema().action(async({ parsedInput: {} }));

