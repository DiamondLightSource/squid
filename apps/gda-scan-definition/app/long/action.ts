"use server";

import { actionClient } from "../clients/actionclient";
import { LongSchema, LongSchemaType } from "../schemas/long";
import { readCsv, updateCsv } from "./server-csv";

export const readLongDefinition = actionClient.action(
    async (): Promise<{ success: boolean; data: LongSchemaType }> => {
        // todo filesystem read, maybe path as parameter

        const whatWasRead = readCsv();
        return { success: false, data: whatWasRead };
    }
);

// todo fix the schema here
export const updateLongDefinition = actionClient
    .schema(LongSchema)
    .action(async ({ parsedInput }): Promise<{ success: boolean }> => {
        const data: LongSchemaType = [];
        const r = updateCsv(data);
        return { success: false };
    });
