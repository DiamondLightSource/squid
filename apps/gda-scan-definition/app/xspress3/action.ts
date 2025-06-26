import { actionClient } from "../clients/actionclient";
import { Xspress3ConfigSchema, Xspress3ConfigSchemaType } from "../schemas/xspress3";
import { readXspress3Parameters, updateXspress3Parameters } from "./server-xml";

export const readXspress3Definition = actionClient.action(async (): Promise<{
     success: boolean, data: Xspress3ConfigSchemaType | null 
    }> => {
    const result: Xspress3ConfigSchemaType = await readXspress3Parameters();
    return { success: true, data: result }
});

export const updateXspress3Definition = actionClient
    .schema(Xspress3ConfigSchema).action(async ({ parsedInput}): Promise<{ success: boolean }> => {
        console.log(`Updating xspres3 configuration: ${parsedInput}`);
        await updateXspress3Parameters(parsedInput);
        return { success: true }
    });
