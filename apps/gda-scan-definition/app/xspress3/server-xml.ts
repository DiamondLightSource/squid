"use server";
import { basePath } from "../actions/basePath";
import { fixXmlToWrapInList } from "../qexafs/fixXmlToWrapInList";
import { PREPEND_FOR_XML } from "../qexafs/server-xml";
import { Xspress3ConfigSchema, Xspress3ConfigSchemaType } from "../schemas/xspress3";
import { XMLBuilder, XmlBuilderOptions, XMLParser } from "fast-xml-parser";
import fs from "fs";

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
const options: XmlBuilderOptions = {
    // processEntities: false,
    // preserveOrder: true,
    format: true,
    // ignoreAttributes: false,
    // commentPropName: "phone"
};


const xspress3Path = `${basePath}/Xspress3.xml`;
const parser = new XMLParser(parserOptions);
const builder = new XMLBuilder(options);

export async function readXspress3Parameters(): Promise<Xspress3ConfigSchemaType> {
    const content = fs.readFileSync(xspress3Path);
    console.log(`raw content: ${content}`);
    const fixed = fixXmlToWrapInList(content.toString(), "DetectorElement", "DetectorElements")
    const parsedResult = parser.parse(fixed);

    console.log(fixed)
    console.log(parsedResult);
    const p = parsedResult.XspressParameters;
    console.log(`trying to read the parameters, ${p}`)
    console.dir(p)
    const tmpFirstItem = p.DetectorElements;
    const tmpArrayCopy = p.DetectorElements;
    delete p.DetectorElements;
    p.DetectorElement = tmpFirstItem;
    // todo temporary reset to [] 
    p.DetectorElements = [];

    try {
        const params:Xspress3ConfigSchemaType = Xspress3ConfigSchema.parse(p);
        params.DetectorElements = tmpArrayCopy;
        console.log(`should be parsed by now`)
        console.dir(params);
        return params
    } catch (e) {
        console.log("Error", e);
    }
    throw new Error("Failed to parse xspress3 parameters at path " + xspress3Path);
}

export async function updateXspress3Parameters(data: Xspress3ConfigSchemaType): Promise<void> {
    const fullObject = {
        "XspressParameters": data
    }
    const xml = builder.build(fullObject);
    fs.writeFileSync(xspress3Path, `${PREPEND_FOR_XML}\n${xml}`);
}

