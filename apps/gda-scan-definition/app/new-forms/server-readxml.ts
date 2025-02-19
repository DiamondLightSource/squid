
import fs from "fs";
import { XMLBuilder, XmlBuilderOptions, XMLParser } from "fast-xml-parser";
import { DetectorsSchema, OutputParametersType, QexafsParametersType, SampleParametersType } from "../schemas/qexafs";
import { format } from "path";

const parser = new XMLParser();

const options: XmlBuilderOptions = {
    processEntities:false,
    preserveOrder: true,
    format: true,
    ignoreAttributes: false,
    commentPropName: "phone"
};

const builder = new XMLBuilder(options);


const basePath: string = "/tmp/qexafs/experiment_1";

const qexafsPath = `${basePath}/QEXAFS_Parameters.xml`;
const detectorsPath = `${basePath}/Detector_Parameters.xml`;

const samplePath = `${basePath}/Sample_Parameters.xml`
const outputPath = `${basePath}/Output_Parameters.xml`


export function readQexafsParameters(): QexafsParametersType {
    const content = fs.readFileSync(qexafsPath);
    const parsedResult = parser.parse(content.toString());
    console.log("Parsed result", parsedResult);
    // todo here validate
    const qexafsParameters: QexafsParametersType = {
        elementSymbol: parsedResult.QEXAFS_Parameters.elementSymbol,
        edge: parsedResult.QEXAFS_Parameters.edge,
        edgeEnergy: parsedResult.QEXAFS_Parameters.edgeEnergy,
        initialEnergy: parsedResult.QEXAFS_Parameters.initialEnergy,
        finalEnergy: parsedResult.QEXAFS_Parameters.finalEnergy,
        speedMDegPerSecond: parsedResult.QEXAFS_Parameters.speedMDegPerSecond,
        stepSize: parsedResult.QEXAFS_Parameters.stepSize,
    };

    return qexafsParameters;
}

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

export function readDetectorParameters(): DetectorsSchema {
    const content = fs.readFileSync(detectorsPath);
    const parsedResult = parser.parse(content.toString());
    console.log("Parsed result", parsedResult);
    // todo here validate
    const detectors: DetectorsSchema = {
        shouldValidate: false,
        detectorConfiguration: parsedResult.Detector_Parameters.detectorConfiguration,
    };

    return detectors
}

export function readSampleParameters(): SampleParametersType{
    const content = fs.readFileSync(samplePath);
    const parsedResult = parser.parse(content.toString());
    console.log("Parsed result", parsedResult);
    // todo here validate
    const sampleParameters: SampleParametersType = {
        shouldValidate: parsedResult.Sample_Parameters.shouldValidate,
        name: "",
        description1: "",
        description2: "",
        stage: "",
        temperaturecontrol: "",
        xythetastage: undefined,
        ln2cryostage: undefined,
        sxcryostage: undefined,
        pulsetubecryostat: undefined,
        furnace: undefined,
        lakeshore: undefined,
        samplewheel: undefined,
        userstage: undefined,
        sampleParameterMotorPosition: []
    };
    return sampleParameters;
}

export function readOutputParameters(): OutputParametersType{
    const content = fs.readFileSync(outputPath);
    const parsedResult = parser.parse(content.toString());
    console.log("Parsed result", parsedResult);
    // todo here validate
    const outputParameters: OutputParametersType = {
        shouldValidate: false,
        asciiFileName: "",
        asciiDirectory: "",
        nexusDirectory: "",
        extraData: false,
        signalActive: false,
        metadataActive: false
    };
    return parsedResult;
}
