"use server";
import { promises as fs } from "fs";
import path from "path";
import { actionClient } from "../clients/actionclient";
import { fileSchema } from "../schemas/filesystemSchemas";
import { basePath } from "./basePath";

export const getFileBuffer = actionClient
  .schema(fileSchema)
  .action(async ({ parsedInput: { relativePath, name } }) => {
    // Resolve the full file path
    const filePath = path.resolve(basePath, relativePath, name);

    try {
      // Check if the file exists
      if (!fs.access(filePath, fs.constants.R_OK)) {
        throw new Error(`File not found: ${filePath}`);
      }

      // Read the file content as a buffer
      const fileBuffer = await fs.readFile(filePath);
      const s: string = fileBuffer.toString();

      console.log(`fileBuffer: ${s}`);
      return { success: true, fileBuffer: s };
    } catch (error) {
      console.error("Error retrieving file buffer:", error);
      if (error instanceof Error) {
        throw new Error(`Failed to retrieve file buffer: ${error.message}`);
      } else {
        throw new Error("Failed to retrieve file buffer: Unknown error");
      }
    }
  });

export const modifyFileBuffer = actionClient
  .schema(fileSchema)
  .action(async ({ parsedInput: { relativePath, name, content } }) => {
    // Resolve the full file path
    if (content === undefined) {
      throw new Error("Content is undefined");
    }
    const filePath = path.resolve(basePath, relativePath, name);

    try {
      // Write the buffer to the file
      await fs.writeFile(filePath, content);

      return { success: true, filePath };
    } catch (error) {
      console.error("Error modifying file buffer:", error);
      if (error instanceof Error) {
        throw new Error(`Failed to modify file: ${error.message}`);
      } else {
        throw new Error("Failed to modify file: Unknown error");
      }
    }
  });
