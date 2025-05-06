"use client";

import React from "react";
import { Box, Typography, Stepper, Step, StepLabel } from "@mui/material";
import Link from "next/link";

const stages = [
    "Choose Element",
    "Calibrate Detectors",
    "Calibrate Scan Parameters",
    "Configure Sample Environments",
    "Collect Your Data",
];

export type StagesProps = {
    value: number; // current stage (controlled externally)
};

function Stages({ value }: StagesProps) {
    return (
        <Box sx={{ border: "1px solid lightgray", p: 2, borderRadius: 2 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
                Experiment Setup Progress
            </Typography>

            <Stepper activeStep={value} orientation="horizontal">
                {stages.map((label, index) => (
                    <Step key={index}>
                        <StepLabel
                            sx={{

                                "& .MuiStepLabel-label": {
                                    fontSize: 24,
                                    fontWeight: index === value ? "bold" : "normal",
                                    color: index === value ? "primary.main" : "inherit",
                                },
                            }}
                        >
                            <Link  href={`../`}>
                                {label}
                            </Link>
                        </StepLabel>
                    </Step>
                ))}
            </Stepper>
        </Box>
    );
}

export default Stages;
