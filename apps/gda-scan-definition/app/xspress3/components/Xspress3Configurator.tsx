"use client";

import React from 'react'
import { useXspress3Configuration } from '../hooks'
import { Box, Button, InputLabel, Typography } from '@mui/material';
import { CheckBox } from '@mui/icons-material';
import Input from "@mui/material/Input";


function Xspress3Configurator() {
    const { config, loading } = useXspress3Configuration();

    console.dir(config);
    if (loading) {
        return <Typography variant='h3'>Loading...</Typography>
    }
    return (
        <Box>
            <Button>
                Read configuration
            </Button>
            {config ? (
                <>
                    <InputLabel>
                        Detector Name:
                        <Input
                            type="text"
                            placeholder="Detector Name"
                            value={config.detectorName || ""}
                            onChange={(e) => {
                                window.alert("not implemented yet")
                            }} />
                    </InputLabel>
                    <pre style={{ color: 'black' }}>{JSON.stringify(config, null, 2)}</pre>

                </>

            ) : (
                <p style={{ color: 'black' }}>No configuration available. Please fetch the configuration.</p>
            )}


        </Box>
    )
}

export default Xspress3Configurator
