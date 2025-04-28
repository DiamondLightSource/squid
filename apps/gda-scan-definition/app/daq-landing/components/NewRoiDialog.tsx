"use client";

import React, { useState } from "react";
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Typography } from "@mui/material";
import { RegionOfInterest } from "./RegionOfInterest";

type NewROIDialogProps = {
    open: boolean;
    onClose: () => void;
    onSubmit: (roi: RegionOfInterest) => void;
};

// todo this should be more complex
function NewROIDialog({ open, onClose, onSubmit }: NewROIDialogProps) {
    const [startingEnergy, setStartingEnergy] = useState(0);
    const [endEnergy, setEndEnergy] = useState(1000);
    const [exposureMs, setExposureMs] = useState(50);

    const handleSubmit = () => {
        const newROI: RegionOfInterest = {
            startingEnergyElectronVolts: startingEnergy,
            endEnergyElectronVolts: endEnergy,
            exposureMilisecondsPerPoint: exposureMs,
            formulaForExposureTime: "",
            numberOfPointsOfExposure: 0,
        };
        onSubmit(newROI);
        onClose();
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Add New Region of Interest</DialogTitle>
            <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}>
                <TextField
                    label="Start Energy (eV)"
                    type="number"
                    value={startingEnergy}
                    onChange={(e) => setStartingEnergy(parseFloat(e.target.value))}
                />
                <TextField
                    label="End Energy (eV)"
                    type="number"
                    value={endEnergy}
                    onChange={(e) => setEndEnergy(parseFloat(e.target.value))}
                />
                <TextField
                    label="Exposure Time (ms)"
                    type="number"
                    value={exposureMs}
                    onChange={(e) => setExposureMs(parseFloat(e.target.value))}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button onClick={handleSubmit} variant="contained">
                    Add ROI
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default NewROIDialog;
