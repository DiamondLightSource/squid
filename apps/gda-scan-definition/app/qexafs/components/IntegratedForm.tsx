"use client";

import React, { useEffect, useState } from "react";
import { JsonForms } from "@jsonforms/react";
import { materialRenderers, MaterialArrayControlRenderer } from "@jsonforms/material-renderers";
import { fullQexafsSchema, fullQexafsUiSchema, FullQexafsSchemaType, fullQexafsJson, partialQexafsJson, DetectorsSchema, SampleParametersType } from "../../schemas/qexafs";
import { useQexafsState, useQexafsDispatch, startConfigRead, startConfigUpdate } from "./QexafsContextProvider";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { Grid, Typography } from "@mui/material";
import SampleParametersForm from "../../components/forms/SampleForm";
import DetectorParametersForm from "../../components/forms/DetectorParametersForm";
import { Preview } from "@mui/icons-material";

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
            <Typography variant="h1" color="black" >QEXAFS Configuration</Typography>
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

                        Form for qexafs
                    </Typography>
                    {
                        formData ? (
                            <Grid container sx={{ margin: '2rem' }} spacing={2}>
                                {/* JSON Forms integration */}
                                <Grid item xs={2}>

                                    < JsonForms
                                        data={formData}
                                        onChange={({ data }) => setFormData(data)}
                                        schema={partialQexafsJson}
                                        // uischema={fullQexafsUiSchema}
                                        renderers={materialRenderers}
                                    />
                                </Grid>
                                <Grid item xs={6}>

                                    <DetectorParametersForm overrideDefaultValue={formData.detectorParameters} submitCallback={(d: DetectorsSchema) => setFormData((prev) => {
                                        if (prev == undefined) {
                                            return prev;
                                        }
                                        return { ...prev, detectorParameters: d }
                                    })} />
                                </Grid>
                                <Grid item xs={4}>

                                    <SampleParametersForm overrideDefaultValue={formData.sampleParameters} submitCallback={(s: SampleParametersType) => setFormData((prev) => {
                                        if (prev == undefined) {
                                            return prev;
                                        }
                                        return { ...prev, sampleParameters: s }
                                    })} />
                                </Grid>

                            </Grid>
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
