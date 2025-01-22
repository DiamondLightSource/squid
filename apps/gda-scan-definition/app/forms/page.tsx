"use client";

/*
the form is generic and we use json forms to get the correct json
all the rest is just transformations, not to write the forms manually

to add a new form we need:
- filesystem URL
- schema in ZOD


adna a separate filetree component with a file context and the backend is stateless and agnostic on the file location

okay actually using the ui schema makes this less useful to do fast

okay maybe just make the schema automatic by default only customize if something is wrong.

also add the custom formatter to work things on the edited file, just like with the scripting editor

*/

import { z } from "zod";
import { zodToJsonSchema } from "zod-to-json-schema";
import { IDEProvider } from "../components/oldIdeState";

const mySchema = z
    .object({
        myString: z.string().min(5),
        myUnion: z.union([z.number(), z.boolean()]),
    })
    .describe("My neat object schema");

const jsonSchema = zodToJsonSchema(mySchema, "mySchema");
console.log(jsonSchema);

type FormReference = {

};

import React, { useState } from 'react';
import {
    materialRenderers,
    materialCells,
} from '@jsonforms/material-renderers';
import { JsonForms } from '@jsonforms/react';
import GenericEditor from "../components/GenericEditor";
import XmlEditor from "../components/XmlEditor";
import FormWithDiffViewer from "./components/FormWithDiff";

const schema = {
    type: 'object',
    properties: {
        name: {
            type: 'string',
            minLength: 1,
        },
        done: {
            type: 'boolean',
        },
        due_date: {
            type: 'string',
            format: 'date',
        },
        recurrence: {
            type: 'string',
            enum: ['Never', 'Daily', 'Weekly', 'Monthly'],
        },
    },
    required: ['name', 'due_date'],
};

const uischema = {
    type: 'VerticalLayout',
    elements: [
        {
            type: 'Control',
            label: false,
            scope: '#/properties/done',
        },
        {
            type: 'Control',
            scope: '#/properties/name',
        },
        {
            type: 'HorizontalLayout',
            elements: [
                {
                    type: 'Control',
                    scope: '#/properties/due_date',
                },
                {
                    type: 'Control',
                    scope: '#/properties/recurrence',
                },
            ],
        },
    ],
};

const initialData = {};

export default function FormsPage() {
    const [data, setData] = useState(initialData);
    return (
        <div>
            <JsonForms
                schema={schema}
                uischema={uischema}
                data={data}
                renderers={materialRenderers}
                cells={materialCells}
                onChange={({ data, _errors }) => setData(data)}
            />
            <IDEProvider>
                <FormWithDiffViewer />
            </IDEProvider>
        </div>

    );
}
