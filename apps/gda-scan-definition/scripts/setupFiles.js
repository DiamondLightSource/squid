const fs = require("fs");
const path = require("path");
const util = require("util");

// Promisified version of fs.copyFile
const copyFile = util.promisify(fs.copyFile);

// Function to copy files from reference folder to base path
async function copyFilesToBasePath(fileNames, basePath) {
    const referenceFolder = path.resolve("./reference"); // reference folder path

    // Ensure the basePath is valid and exists
    const resolvedBasePath = path.resolve(basePath);
    // if (!resolvedBasePath.startsWith(path.resolve("./"))) {
    //     throw new Error("Access denied: basePath is outside of allowed directory.");
    // }

    // Ensure the basePath directory exists
    if (!fs.existsSync(resolvedBasePath)) {
        console.log(`Base path doesn't exist. Creating directory: ${resolvedBasePath}`);
        fs.mkdirSync(resolvedBasePath, { recursive: true });
    }

    // Iterate over each file name in the array
    for (const fileName of fileNames) {
        const referenceFilePath = path.join(referenceFolder, fileName);
        const destinationFilePath = path.join(resolvedBasePath, fileName);

        try {
            // Check if file exists in reference folder
            if (!fs.existsSync(referenceFilePath)) {
                console.error(`File ${fileName} not found in reference folder.`);
                continue; // Skip to next file if not found
            }

            // Copy the file from reference folder to base path
            await copyFile(referenceFilePath, destinationFilePath);
            console.log(`Copied ${fileName} to ${resolvedBasePath}`);
        } catch (error) {
            console.error(`Error copying ${fileName}: ${error.message}`);
        }
    }

    console.log("File copy operation completed.");
}

// Example usage
const fileNames = [
    "Detector_Parameters.xml",
    "Output_Parameters.xml",
    "QEXAFS_Parameters.xml",
    "Sample_Parameters.xml",
]; // Array of file names to copy

// const basePath = "./targetFolder"; // Base folder where files will be copied to
const basePath = "/tmp/qexafs/experiment_1";

// Start the file copy process
copyFilesToBasePath(fileNames, basePath).catch(console.error);
