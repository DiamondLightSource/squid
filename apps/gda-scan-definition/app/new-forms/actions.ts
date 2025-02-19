
"use server"

import { actionClient } from "../clients/actionclient";
import { fullQexafsSchema, FullQexafsSchemaType } from "../schemas/qexafs";
import { readDetectorParameters, readOutputParameters, readQexafsParameters, readSampleParameters, updateDetectorParameters, updateOutputParameters, updateQexafsParameters, updateSampleParameters } from "./server-readxml";

export const readScanDefinition = actionClient.action(async (): Promise<{ success: boolean, data: FullQexafsSchemaType | null }> => {

    const result: FullQexafsSchemaType = {
        qexafsParameters: readQexafsParameters(),
        detectorParameters: readDetectorParameters(),
        outputParameters: readOutputParameters(),
        sampleParameters: readSampleParameters(),
    };
    return { success: true, data: result }
});

export const updateScanDefinition = actionClient
    .schema(fullQexafsSchema).action(async ({ parsedInput: { qexafsParameters, detectorParameters, outputParameters, sampleParameters } }): Promise<{ success: boolean }> => {
        console.log(`Updating scan definition: ${qexafsParameters} ${detectorParameters} ${outputParameters} ${sampleParameters}`);
        // todo update the various files
        updateQexafsParameters(qexafsParameters);
        updateDetectorParameters(detectorParameters);
        updateOutputParameters(outputParameters);
        updateSampleParameters(sampleParameters);

        return { success: true }
    });
