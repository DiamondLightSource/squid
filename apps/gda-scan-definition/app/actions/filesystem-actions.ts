"use server";
import { promises as fs, PathLike } from "fs";

import { TreeViewBaseItem } from "@mui/x-tree-view";
import { actionClient } from "../clients/actionclient";
import { basePath } from "./basePath";
import path from "path";
import {
  fileRenameSchema,
  fileSchema,
  folderSchema,
} from "../schemas/filesystemSchemas";

async function readFilesFlat(): Promise<TreeViewBaseItem[]> {
  const dir: string = basePath.toString();
  const dirPath = path.resolve(dir);
  const files: string[] = await fs.readdir(dirPath);
  return files.map((file) => ({
    id: file,
    label: file,
    children: [],
  }));
}

async function readFiles(p: string): Promise<TreeViewBaseItem[]> {
  const dirPath = path.resolve(p);
  console.log(`dirPath: ${dirPath}`);

  async function getItems(currentPath: string): Promise<TreeViewBaseItem[]> {
    const entries = await fs.readdir(currentPath, { withFileTypes: true });
    console.log(`entries: ${entries} with length: ${entries.length}`);

    const items = await Promise.all(
      entries.map(async (entry) => {
        const fullPath = path.join(currentPath, entry.name);
        if (entry.isDirectory()) {
          const children = await getItems(fullPath); // Recursive call for nested directories
          return {
            id: fullPath,
            label: entry.name,
            children, // Nested structure
          };
        } else {
          return {
            id: fullPath,
            label: entry.name,
            children: [], // No children for files
          };
        }
      })
    );
    console.log(`items: ${items} with length: ${items.length}`);

    return items;
  }

  return getItems(dirPath); // Start from the base directory
}

export const getFiles = actionClient.action(async () => {
  //   const files = readFilesFlat();
  const files = await readFiles(basePath);
  console.log(`files in the getFiles function: ${files}`);
  return { files };
});

export const makeFile = actionClient
  .schema(fileSchema)
  .action(async ({ parsedInput: { name, type, content, relativePath } }) => {
    // Resolve the full file path
    const filePath = path.resolve(basePath, relativePath, `${name}.${type}`);

    try {
      // Ensure the directory exists
      await fs.mkdir(path.dirname(filePath), { recursive: true });

      // Write the file content
      await fs.writeFile(filePath, content || "");

      return { success: true, filePath };
    } catch (error) {
      console.error("Error creating file:", error);
      if (error instanceof Error) {
        throw new Error(`Failed to create file: ${error.message}`);
      } else {
        throw new Error("Failed to create file: Unknown error");
      }
    }
  });

export const renameFile = async (basePath: string) =>
  actionClient
    .schema(fileRenameSchema)
    .action(async ({ parsedInput: { oldName, newName, relativePath } }) => {
      // Resolve the full file paths
      const oldFilePath = path.resolve(basePath, relativePath, oldName);
      const newFilePath = path.resolve(basePath, relativePath, newName);

      // todo normalize error handling
      if (!newFilePath.startsWith(basePath)) {
        throw new Error(`Access denied: path is outside of allowed base path.`);
      }
      try {
        // Ensure the old file exists
        if (!(await fs.stat(oldFilePath)).isFile()) {
          throw new Error(`File not found: ${oldFilePath}`);
        }

        // Guardrail: Ensure that the folderPath is within the basePath
        // Rename the file
        await fs.rename(oldFilePath, newFilePath);

        return { success: true, oldFilePath, newFilePath };
      } catch (error) {
        console.error("Error renaming file:", error);
        if (error instanceof Error) {
          throw new Error(`Failed to rename file: ${error.message}`);
        } else {
          throw new Error("Failed to rename file: Unknown error");
        }
      }
    });

export const makeFolder = actionClient
  .schema(folderSchema)
  .action(async ({ parsedInput: { name, relativePath } }) => {
    // Resolve the full folder path
    const folderPath = path.resolve(basePath, relativePath, name);

    try {
      // Create the folder
      await fs.mkdir(folderPath, { recursive: true });

      return { success: true, folderPath };
    } catch (error) {
      console.error("Error creating folder:", error);
      if (error instanceof Error) {
        throw new Error(`Failed to create folder: ${error.message}`);
      } else {
        throw new Error("Failed to create folder: Unknown error");
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

export const deleteFile = actionClient
  .schema(fileSchema)
  .action(async ({ parsedInput: { relativePath, name } }) => {
    // Resolve the full file path
    const filePath = path.resolve(basePath, relativePath, name);

    try {
      // Check if the file exists
      await fs.access(filePath);

      // Delete the file
      await fs.unlink(filePath);

      return { success: true, filePath };
    } catch (error) {
      console.error("Error deleting file:", error);
      if (error instanceof Error) {
        throw new Error(`Failed to delete file: ${error.message}`);
      } else {
        throw new Error("Failed to delete file: Unknown error");
      }
    }
  });

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
