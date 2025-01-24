import {
  materialCells,
  materialRenderers,
} from "@jsonforms/material-renderers";
import { JsonForms } from "@jsonforms/react";
import { useState } from "react";
import { z } from "zod";
import { zodToJsonSchema } from "zod-to-json-schema";

const mySchema = z
  .object({
    myString: z.string().min(5),
    myUnion: z.union([z.number(), z.boolean()]),
  })
  .describe("My neat object schema");

const jsonSchema = zodToJsonSchema(mySchema, "mySchema");
console.log(jsonSchema);
const schema = {
  type: "object",
  properties: {
    name: {
      type: "string",
      minLength: 1,
    },
    done: {
      type: "boolean",
    },
    due_date: {
      type: "string",
      format: "date",
    },
    recurrence: {
      type: "string",
      enum: ["Never", "Daily", "Weekly", "Monthly"],
    },
  },
  required: ["name", "due_date"],
};

const uischema = {
  type: "VerticalLayout",
  elements: [
    {
      type: "Control",
      label: false,
      scope: "#/properties/done",
    },
    {
      type: "Control",
      scope: "#/properties/name",
    },
    {
      type: "HorizontalLayout",
      elements: [
        {
          type: "Control",
          scope: "#/properties/due_date",
        },
        {
          type: "Control",
          scope: "#/properties/recurrence",
        },
      ],
    },
  ],
};

const initialData = {};

export function JsonFormExample() {
  const [data, setData] = useState(initialData);

  return (
    <JsonForms
      schema={schema}
      uischema={uischema}
      data={data}
      renderers={materialRenderers}
      cells={materialCells}
      onChange={({ data, _errors }) => setData(data)}
    />
  );
}
