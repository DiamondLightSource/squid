"use server";
import { promises as fs, PathLike } from "fs";

import { TreeViewBaseItem } from "@mui/x-tree-view";
import { actionClient } from "../clients/actionclient";
import { basePath } from "./basePath";
import path from "path";

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

async function readFiles(p: PathLike): Promise<TreeViewBaseItem[]> {
  const dir: string = p.toString();
  const dirPath = path.resolve(dir);

  async function getItems(currentPath: string): Promise<TreeViewBaseItem[]> {
    const entries = await fs.readdir(currentPath, { withFileTypes: true });

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

    return items;
  }

  return getItems(dirPath); // Start from the base directory
}

export const getFiles = actionClient.action(async () => {
  //   const files = readFilesFlat();
  const files = readFiles(basePath);
  return { files };
});
