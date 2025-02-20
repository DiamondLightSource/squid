
import { XMLBuilder, XmlBuilderOptions, XMLParser } from "fast-xml-parser";
import fs from "fs";
import { detectorParametersSchema, DetectorsSchema, outputParametersSchema, OutputParametersType, qexafsParametersSchema, QexafsParametersType, sampleParametersSchema, SampleParametersType } from "../schemas/qexafs";
import { rootDirectory } from "./server-safety";

const parser = new XMLParser();

const options: XmlBuilderOptions = {
    processEntities: false,
    preserveOrder: true,
    format: true,
    ignoreAttributes: false,
    commentPropName: "phone"
};

const builder = new XMLBuilder(options);

const basePath: string = rootDirectory;

const qexafsPath = `${basePath}/QEXAFS_Parameters.xml`;
const detectorsPath = `${basePath}/Detector_Parameters.xml`;

const samplePath = `${basePath}/Sample_Parameters.xml`
const outputPath = `${basePath}/Output_Parameters.xml`


export function updateQexafsParameters(data: QexafsParametersType): void {
    const xml = builder.build(data);
    fs.writeFileSync(qexafsPath, xml);
}

export function updateDetectorParameters(data: DetectorsSchema): void {
    const xml = builder.build(data);
    fs.writeFileSync(detectorsPath, xml);
}

export function updateSampleParameters(data: SampleParametersType): void {
    const xml = builder.build(data);
    fs.writeFileSync(samplePath, xml);
}

export function updateOutputParameters(data: OutputParametersType): void {
    const xml = builder.build(data);
    fs.writeFileSync(outputPath, xml);
}

export function readQexafsParameters(): QexafsParametersType {
    const content = fs.readFileSync(qexafsPath);
    const parsedResult = parser.parse(content.toString());

    console.log("Parsed result", parsedResult);
    const p = parsedResult.QEXAFSParameters;
    try {
        const params:  QexafsParametersType= qexafsParametersSchema.parse(p);
        return params
    } catch (e) {
        console.log("Error", e);
    }
    throw new Error("Failed to parse output parameters");
}

export function readDetectorParameters(): DetectorsSchema {
    const content = fs.readFileSync(detectorsPath);
    const parsedResult = parser.parse(content.toString());

    const p = parsedResult.DetectorParameters;
    try {
        const params:  DetectorsSchema  = detectorParametersSchema.parse(p);
        return params
    } catch (e) {
        console.log("Error", e);
    }
    throw new Error("Failed to parse output parameters");
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
    throw new Error("Failed to parse sample parameters");
}

export function readOutputParameters(): OutputParametersType {
    const content = fs.readFileSync(outputPath);
    const parsedResult = parser.parse(content.toString());

    const p = parsedResult.OutputParameters;
    try {
        const params:  OutputParametersType= outputParametersSchema.parse(p);
        return params
    } catch (e) {
        console.log("Error", e);
    }
    throw new Error("Failed to parse output parameters");
}
