"use client";

import React, { useEffect, useState } from "react";
import { JsonForms } from "@jsonforms/react";
import { materialRenderers } from "@jsonforms/material-renderers";
import { fullQexafsSchema, fullQexafsUiSchema, FullQexafsSchemaType, fullQexafsJson } from "../../schemas/qexafs";
import { useQexafsState, useQexafsDispatch, startConfigRead, startConfigUpdate } from "./QexafsContextProvider";

const IntegratedForm = () => {
    const { config, isLoading, error } = useQexafsState();
    const dispatch = useQexafsDispatch();
    const [formData, setFormData] = useState<FullQexafsSchemaType | undefined>(config);

    // Sync context state with form data whenever `config` changes
    useEffect(() => {
        setFormData(config);
    }, [config]);

    const handleReadConfig = async () => {
        await startConfigRead(dispatch);
    };

    const handleUpdateConfig = async () => {
        if (!formData) {
            alert("No existing configuration to update!");
            return;
        }
        await startConfigUpdate(dispatch, formData);
    };

    return (
        <div>
            <h1>QEXAFS Configuration</h1>

            {isLoading && <p>Loading...</p>}
            {error && <p style={{ color: "red" }}>Error: {error}</p>}

            {formData ? (
                <div>
                    {/* JSON Forms integration */}
                    <JsonForms
                        data={formData}
                        onChange={({ data }) => setFormData(data)}
                        schema={fullQexafsJson}
                        // uischema={fullQexafsUiSchema}
                        renderers={materialRenderers}
                    />
                </div>
            ) : (
                <p>No configuration available. Please fetch the configuration.</p>
            )}

            <div style={{ marginTop: "20px" }}>
                <button onClick={handleReadConfig} disabled={isLoading}>
                    Read Config
                </button>
                <button onClick={handleUpdateConfig} disabled={isLoading || !formData}>
                    Update Config
                </button>
            </div>
        </div>
    );
};

export default IntegratedForm;
