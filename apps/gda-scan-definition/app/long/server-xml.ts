"use server";
import fs from 'fs';
import { XMLBuilder, XMLParser } from "fast-xml-parser";
import { LongRowSchema, LongRowSchemaType, LongSchema, LongSchemaType } from '../schemas/long';
import { basePath } from '../actions/basePath';
import { PREPEND_FOR_XML } from '../qexafs/server-xml';
import { fixXmlToWrapInList } from "../qexafs/fixXmlToWrapInList";

// XML Builder options
const options = {
    ignoreAttributes: false,
    format: true, // Pretty print for readability
    suppressEmptyNode: true,
};

const longConfigFilePath = `${basePath}/long.xml`;
// Create an XML builder instance
const builder = new XMLBuilder(options);


const parserOptions = {
    ignoreAttributes: false, // Keep attributes if present
    //   alwaysCreateTextNode: true, // Ensures text nodes are explicitly stored
    isArray: (name: string, jpath) => {
        // Define elements that should be arrays when duplicated
        const arrayFields = ["ParametersForScan", "ParametersForScanBean"]; // Example duplicated elements
        return arrayFields.includes(name); // Only convert these to arrays
    },
};

const parser = new XMLParser(parserOptions);

// Function to convert a row to XML format
function convertRowToXml(row: LongRowSchemaType): string {
    const xmlObject = {
        ParametersForScan: {
            numberOfRepetitions: row.Repetitions,
            ParametersForScanBean: [
                {
                    beanFileName: row.Scan,
                    beanType: "uk.ac.gda.beans.exafs.QEXAFSParameters",
                },
                {
                    beanFileName: row.Detector,
                    beanType: "uk.ac.gda.beans.exafs.DetectorParameters",
                },
                {
                    beanFileName: row.Sample,
                    beanType: "uk.ac.gda.beans.exafs.b18.B18SampleParameters",
                    ParameterValue: [
                        {
                            fullPathToGetter: "getSampleWheelParameters.getFilter",
                            newValue: row.Sample_getSampleWheelParameters_getFilter,
                            editable: true,
                        },
                        {
                            fullPathToGetter: "getSampleParameterMotorPosition(sam2x).getDoMove",
                            newValue: row.Sample_getSampleParameterMotorPosition_sam2x_getDoMove,
                            editable: true,
                        },
                        {
                            fullPathToGetter: "getSampleParameterMotorPosition(sam2x).getDemandPosition",
                            newValue: row.Sample_getSampleParameterMotorPosition_sam2x_getDemandPosition,
                            editable: true,
                        },
                        {
                            fullPathToGetter: "getSampleParameterMotorPosition(sam2y).getDoMove",
                            newValue: row.Sample_getSampleParameterMotorPosition_sam2y_getDoMove,
                            editable: true,
                        },
                        {
                            fullPathToGetter: "getSampleParameterMotorPosition(sam2y).getDemandPosition",
                            newValue: row.Sample_getSampleParameterMotorPosition_sam2y_getDemandPosition,
                            editable: true,
                        },
                        {
                            fullPathToGetter: "getSampleParameterMotorPosition(fluoDist).getDoMove",
                            newValue: row.Sample_getSampleParameterMotorPosition_fluoDist_getDoMove,
                            editable: true,
                        },
                        {
                            fullPathToGetter: "getSampleParameterMotorPosition(fluoDist).getDemandPosition",
                            newValue: row.Sample_getSampleParameterMotorPosition_fluoDist_getDemandPosition,
                            editable: true,
                        },
                    ],
                },
                {
                    beanFileName: row.Output,
                    beanType: "uk.ac.gda.beans.exafs.OutputParameters",
                },
            ],
        },
    };

    return builder.build(xmlObject);
}

// Function to convert multiple rows
function convertRowsToXml(rows: LongRowSchemaType[]): string {
    const xmlList = rows.map((row) => convertRowToXml(row)).join("\n\n");
    return xmlList;
}


export async function readXmlLongConfig(): Promise<LongSchemaType> {
    console.log("trying to read xml long config");
    const content = fs.readFileSync(longConfigFilePath);
    const fixed = fixXmlToWrapInList(content.toString(), "ParametersForScan", "ParametersScansList");
    const parsedResult = parser.parse(fixed);
    let p = parsedResult.ParameterCollection;
    p.ParametersScansList = p.ParametersScansList.ParametersForScan;
    try {
        console.log(`p before parsing`);
        console.dir(p);
        const params: LongSchemaType = LongSchema.parse(p);
        // const things = params.ParameterScansList.map(i => {
        //     return LongRowSchema.parse(i);
        // })
        // params.items = things;
        return params
    } catch (e) {
        console.error("Error", e);
    }
    throw new Error("Failed to parse output parameters at path " + longConfigFilePath);
}

export async function updateXmlLongConfig(data: LongSchemaType): Promise<void> {
    const fullObject = {
        "ParameterCollection": convertRowsToXml(data)
    }
    const xml = builder.build(fullObject);
    fs.writeFileSync(longConfigFilePath, `${PREPEND_FOR_XML}\n${xml}`);
}
