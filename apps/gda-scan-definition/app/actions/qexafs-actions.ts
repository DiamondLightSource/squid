"use server";
import fs, { PathLike, PathOrFileDescriptor } from "fs";
import { create } from "xmlbuilder2";
import { actionClient } from "../clients/actionclient";
import { qexafsParametersSchema } from "../schemas/qexafs";
import { basePath } from "./basePath";


const paramsPath: PathLike = `${basePath}/parameters.xml`;

// Helper to read existing data
function readParameters(): any[] {
  if (!fs.existsSync(paramsPath)) return [];
  const data = fs.readFileSync(paramsPath, "utf-8");
  const parsed = create(data).end({ format: "object" });
  console.log("Read params xml", parsed);
  //   todo append this correctly
  //   const circles = parsed["circles"]?.circle;
  //   return Array.isArray(circles) ? circles : [circles]; // Handle no or single entry cases
  return [];
}

export const updateParameters = actionClient
  .schema(qexafsParametersSchema)
  .action(async ({ parsedInput }) => {
    const existingParams = readParameters();

    console.log("Adding new parameters", parsedInput);
    const newParams = parsedInput;
    const updatedData = {
      parameters: {
        parameter: [...existingParams, newParams],
      },
    };

    const xml = create(updatedData).end({ prettyPrint: true });
    console.log("Writing to file", xml);
    fs.writeFileSync(basePath, xml);

    return {
      success: "Parameters added successfully",
      parameters: newParams,
    };
  });

export const getParameters = actionClient.action(async () => {
  const parameters = readParameters();
  return { parameters };
});
