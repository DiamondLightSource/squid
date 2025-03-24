
import { XMLBuilder, XmlBuilderOptions, XMLParser } from "fast-xml-parser";
import fs from "fs";
import { detectorParametersSchema, DetectorsSchema, motorPositionSchema, outputParametersSchema, OutputParametersType, qexafsParametersSchema, QexafsParametersType, sampleParametersSchema, SampleParametersType } from "../schemas/qexafs";
import { rootDirectory } from "./server-safety";
import { fixXmlToWrapInList } from "./fixXmlToWrapInList";

const options: XmlBuilderOptions = {
    // processEntities: false,
    // preserveOrder: true,
    format: true,
    // ignoreAttributes: false,
    // commentPropName: "phone"
};


const parserOptions = {
    ignoreAttributes: false, // Keep attributes if present
    //   alwaysCreateTextNode: true, // Ensures text nodes are explicitly stored
    isArray: (name: string, jpath) => {
        return false;
        // Define elements that should be arrays when duplicated
        const arrayFields = ["sampleParameterMotorPosition", "detectorConfiguration"]; // Example duplicated elements
        return arrayFields.includes(name); // Only convert these to arrays
    },
};

const parser = new XMLParser(parserOptions);
const builder = new XMLBuilder(options);
// const builder = new XMLBuilder();

const basePath: string = rootDirectory;

const qexafsPath = `${basePath}/QEXAFS_Parameters.xml`;
const detectorsPath = `${basePath}/Detector_Parameters.xml`;

const samplePath = `${basePath}/Sample_Parameters.xml`
const outputPath = `${basePath}/Output_Parameters.xml`


export const PREPEND_FOR_XML = "<?xml version=\"1.0\" encoding=\"UTF-8\"?>"

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
    fs.writeFileSync(samplePath, `${PREPEND_FOR_XML}\n${xml}`);
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
    const fixed = fixXmlToWrapInList(content.toString(), "detectorConfiguration", "detectorConfigurationList")
    const parsedResult = parser.parse(fixed);
    console.dir(parsedResult);
    let p = parsedResult.DetectorParameters;
    const r = parsedResult.DetectorParameters.detectorConfigurationList.detectorConfiguration;
    console.dir(r);
    delete p.detectorConfigurationList;
    p.detectorConfiguration = r;
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
    const fixed = fixXmlToWrapInList(content.toString(), "sampleParameterMotorPosition", "sampleParameterMotorPositionList")
    const parsedResult = parser.parse(fixed);

    console.log("Parsed result", parsedResult);
    let p = parsedResult.B18SampleParameters;
    const r = parsedResult.B18SampleParameters.sampleParameterMotorPositionList.sampleParameterMotorPosition;
    delete p.sampleParameterMotorPositionList
    p.sampleParameterMotorPosition = r;
    try {
        const sampleParameters: SampleParametersType = sampleParametersSchema.parse(p);
        const motors = sampleParameters.sampleParameterMotorPosition.map(i => motorPositionSchema.parse(i));
        sampleParameters.sampleParameterMotorPosition = motors;
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
        console.error("Error", e);
    }
    throw new Error("Failed to parse output parameters at path " + outputPath);
}
