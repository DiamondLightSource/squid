import { z } from "zod";
export const fileSchema = z.object({
  name: z.string().min(1, "File name is required"),
  type: z.enum(["txt", "csv", "json", "other"]),
  content: z.string().optional(), // Allow optional content for file creation
  relativePath: z.string().default("."), // Default to the current directory
});

export const folderSchema = z.object({
  name: z.string().min(1, "Folder name is required"),
  relativePath: z.string().default("."), // Default to the current directory
});

