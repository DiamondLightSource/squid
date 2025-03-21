
import fs from "fs";
import { rootDirectory } from "../qexafs/server-safety";
import * as csv from "csv";
import { LongSchemaType } from "../schemas/long";


export function updateCsv(data: LongSchemaType): void {
    const stringified = "";
    // csv.stringify(data)
    fs.writeFileSync(stringified, "somepath");
    // todo update this and the logic and the path
}

const path = "";
export function readCsv(): LongSchemaType {

    const content = fs.readFileSync(path);

    // todo parse csv
    const result: LongSchemaType = [];
    return result;
}