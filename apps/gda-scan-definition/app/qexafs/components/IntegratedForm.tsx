"use client";

import React, { useEffect, useState } from "react";
import { JsonForms } from "@jsonforms/react";
import { materialRenderers, MaterialArrayControlRenderer } from "@jsonforms/material-renderers";
import { fullQexafsSchema, fullQexafsUiSchema, FullQexafsSchemaType, fullQexafsJson, partialQexafsJson } from "../../schemas/qexafs";
import { useQexafsState, useQexafsDispatch, startConfigRead, startConfigUpdate } from "./QexafsContextProvider";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
import SampleParametersForm from "../../components/forms/SampleForm";
import DetectorParametersForm from "../../components/forms/DetectorParametersForm";

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

    const partial = true;
    return (
        <div>
            <h1>QEXAFS Configuration</h1>
            <Box style={{ marginTop: "20px" }}>
                <Button onClick={handleReadConfig} disabled={isLoading}>
                    Read Config
                </Button>
                <Button onClick={handleUpdateConfig} disabled={isLoading || !formData}>
                    Update Config
                </Button>
            </Box>
            {isLoading && <p>Loading...</p>}
            {error && <p style={{ color: "red" }}>Error: {error}</p>}

            {partial ?

                <div>
                    <Typography variant="h5" sx={{ color: 'black' }}>

                        here logic to display the partial and the manual parts
                    </Typography>
                    {
                        formData ? (
                            <div>
                                {/* JSON Forms integration */}
                                < JsonForms
                                    data={formData}
                                    onChange={({ data }) => setFormData(data)}
                                    schema={partialQexafsJson}
                                    // uischema={fullQexafsUiSchema}
                                    renderers={materialRenderers}
                                />
                                <DetectorParametersForm />
                                <SampleParametersForm />

                            </div>
                        ) : (
                            <p>No configuration available. Please fetch the configuration.</p>
                        )
                    }
                </div>
                :
                <div>
                    {
                        formData ? (
                            <div>
                                {/* JSON Forms integration */}
                                < JsonForms
                                    data={formData}
                                    onChange={({ data }) => setFormData(data)}
                                    schema={fullQexafsJson}
                                    // uischema={fullQexafsUiSchema}
                                    renderers={materialRenderers}
                                />
                            </div>
                        ) : (
                            <p>No configuration available. Please fetch the configuration.</p>
                        )
                    }
                </div>

            }

        </div >
    );
};

export default IntegratedForm;
