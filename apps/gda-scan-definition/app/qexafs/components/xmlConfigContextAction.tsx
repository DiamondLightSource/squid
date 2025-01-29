"use server";
import { z } from "zod";
import { actionClient } from "../../clients/actionclient";

export const folderSchema = z.object({
    name: z.string().min(1, "Folder name is required"),
    relativePath: z.string().default("."), // Default to the current directory
});

/**
 * reads each of the files and compres if identical to the new ones, if not updates them
 */
function updateFiles() {

}

function readFiles() {

}

export const readXmlContext = actionClient
    .schema(Rea)
    .action(readFiles);


export const updateXmlContext = actionClient.schema().action(async({parsedInput:{}}));

