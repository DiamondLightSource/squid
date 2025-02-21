import path from "path";
import fs from "fs";

export const rootDirectory = process.env.FILE_STORAGE_ROOT ||  "/tmp/qexafs/experiment_1";

/**
 * Resolves a safe file path for writing files based on a trusted root directory.
 * @param {string} relativePath - The relative path provided by the client.
 * @returns {string} The absolute, safe path for writing the file.
 * @throws {Error} If the resolved path is outside the root directory.
 */
export function resolveSafeFilePath(relativePath:string):string {
  // Get the root directory from the environment variable

  if (!rootDirectory) {
    throw new Error("Environment variable FILE_STORAGE_ROOT is not set.");
  }

  // Resolve the absolute path
  const absolutePath = path.resolve(rootDirectory, relativePath);

  // Ensure the resolved path is within the root directory
  if (!absolutePath.startsWith(rootDirectory)) {
    throw new Error("Invalid file path: Path is outside the root directory.");
  }

  // Ensure the directory exists (optional)
  const dirPath = path.dirname(absolutePath);
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }

  return absolutePath;
}
