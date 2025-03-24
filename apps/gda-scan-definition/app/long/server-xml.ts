import fs from 'fs';
import { XMLBuilder, XMLParser } from "fast-xml-parser";
import { LongRowSchemaType, LongSchema, LongSchemaType } from '../schemas/long';
import { basePath } from '../actions/basePath';
import { PREPEND_FOR_XML } from '../qexafs/server-xml';

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
        return false;
        // Define elements that should be arrays when duplicated
        const arrayFields = ["sampleParameterMotorPosition", "detectorConfiguration"]; // Example duplicated elements
        return arrayFields.includes(name); // Only convert these to arrays
    },
};

const parser = new XMLParser(parserOptions);

// Function to convert a row to XML format
export function convertRowToXml(row: LongRowSchemaType): string {
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


export function readXmlLongConfig(): LongSchemaType {


    const content = fs.readFileSync(longConfigFilePath);
    const parsedResult = parser.parse(content.toString()):
    const p = parsedResult.ParameterCollection;

    try {
        const params: LongSchemaType = LongSchema.parse(p);
        return params
    } catch (e) {
        console.error("Error", e);
    }
    throw new Error("Failed to parse output parameters at path " + longConfigFilePath);


}

export function updateXmlLongConfig(data: LongSchemaType): void {
    const fullObject = {
        "ParameterCollection": data
    }
    const xml = builder.build(fullObject);
    fs.writeFileSync(longConfigFilePath, `${PREPEND_FOR_XML}\n${xml}`);
}
