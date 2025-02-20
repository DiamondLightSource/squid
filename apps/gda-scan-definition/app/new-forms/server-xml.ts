
import { XMLBuilder, XmlBuilderOptions, XMLParser } from "fast-xml-parser";
import fs from "fs";
import { detectorParametersSchema, DetectorsSchema, outputParametersSchema, OutputParametersType, qexafsParametersSchema, QexafsParametersType, sampleParametersSchema, SampleParametersType } from "../schemas/qexafs";
import { rootDirectory } from "./server-safety";

const options: XmlBuilderOptions = {
    // processEntities: false,
    // preserveOrder: true,
    format: true,
    // ignoreAttributes: false,
    // commentPropName: "phone"
};

const parser = new XMLParser();
const builder = new XMLBuilder(options);
// const builder = new XMLBuilder();

const basePath: string = rootDirectory;

const qexafsPath = `${basePath}/QEXAFS_Parameters.xml`;
const detectorsPath = `${basePath}/Detector_Parameters.xml`;

const samplePath = `${basePath}/Sample_Parameters.xml`
const outputPath = `${basePath}/Output_Parameters.xml`




const PREPEND_FOR_XML = "<?xml version=\"1.0\" encoding=\"UTF-8\"?>"

export function updateQexafsParameters(data: QexafsParametersType): void {
    const fullObject = {
        "QEXAFSParameters": data
    }
    const xml = builder.build(fullObject);
    fs.writeFileSync(qexafsPath, `${PREPEND_FOR_XML}\n${xml}`);
}

export function updateDetectorParameters(data: DetectorsSchema): void {
    const fullObject = {
        "DetectorParameters": data
    }

    const xml = builder.build(fullObject);
    fs.writeFileSync(detectorsPath, `${PREPEND_FOR_XML}\n${xml}`);
}

export function updateSampleParameters(data: SampleParametersType): void {
    const fullObject = {
        "B18SampleParameters": data
    }

    const xml = builder.build(fullObject);
    fs.writeFileSync(samplePath,`${PREPEND_FOR_XML}\n${xml}`);
}

export function updateOutputParameters(data: OutputParametersType): void {
    const fullObject = {
        "OutputParameters": data
    }

    const xml = builder.build(fullObject);
    fs.writeFileSync(outputPath, `${PREPEND_FOR_XML}\n${xml}`);
}

export function readQexafsParameters(): QexafsParametersType {
    const content = fs.readFileSync(qexafsPath);
    const parsedResult = parser.parse(content.toString());

    console.log("Parsed result", parsedResult);
    const p = parsedResult.QEXAFSParameters;
    try {
        const params: QexafsParametersType = qexafsParametersSchema.parse(p);
        return params
    } catch (e) {
        console.log("Error", e);
    }
    throw new Error("Failed to parse quesafs parameters at path " + qexafsPath);
}

export function readDetectorParameters(): DetectorsSchema {
    const content = fs.readFileSync(detectorsPath);
    const parsedResult = parser.parse(content.toString());

    const p = parsedResult.DetectorParameters;
    console.log("Parsed result", parsedResult);
    try {
        const params: DetectorsSchema = detectorParametersSchema.parse(p);
        return params
    } catch (e) {
        console.log("Error", e);
    }
    throw new Error("Failed to parse output parameters at path " + detectorsPath);
}

export function readSampleParameters(): SampleParametersType {
    const content = fs.readFileSync(samplePath);
    const parsedResult = parser.parse(content.toString());
    console.log("Parsed result", parsedResult);
    const p = parsedResult.B18SampleParameters;
    try {
        const sampleParameters: SampleParametersType = sampleParametersSchema.parse(p);
        return sampleParameters
    } catch (e) {
        console.log("Error", e);
    }
    throw new Error("Failed to parse sample parameters at path " + samplePath);
}

export function readOutputParameters(): OutputParametersType {
    const content = fs.readFileSync(outputPath);
    const parsedResult = parser.parse(content.toString());

    const p = parsedResult.OutputParameters;
    try {
        const params: OutputParametersType = outputParametersSchema.parse(p);
        return params
    } catch (e) {
        console.log("Error", e);
    }
    throw new Error("Failed to parse output parameters at path " + outputPath);
}
