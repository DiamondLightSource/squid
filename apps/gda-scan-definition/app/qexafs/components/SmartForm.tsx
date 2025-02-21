"use client";
import { JsonForms } from "@jsonforms/react";
import { fullQexafsJson, fullQexafsSchema, FullQexafsSchemaType, fullQexafsUiSchema } from "../../schemas/qexafs";
import { materialRenderers } from "@jsonforms/material-renderers";
import { useState } from "react";

export const InterLinkedForms = () => {
    const [data, setData] = useState<FullQexafsSchemaType>();

    return (
        <JsonForms
            data={data}
            onChange={({ errors, data }) => setData(data)}
            schema={fullQexafsJson}
            uischema={fullQexafsUiSchema}
            renderers={materialRenderers}
        />
    );
};