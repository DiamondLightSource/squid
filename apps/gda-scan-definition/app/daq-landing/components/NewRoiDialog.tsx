"use client";

import React, { useState, useEffect } from "react";
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import { RegionOfInterest } from "./RegionOfInterest";

type NewROIDialogProps = {
    open: boolean;
    onClose: () => void;
    onSubmit: (roi: RegionOfInterest) => void;
    initialData?: RegionOfInterest | null; // optional initial values
};

function NewROIDialog({ open, onClose, onSubmit, initialData }: NewROIDialogProps) {
    const [startingEnergy, setStartingEnergy] = useState(0);
    const [endEnergy, setEndEnergy] = useState(1000);
    const [exposureMs, setExposureMs] = useState(50);

    useEffect(() => {
        if (initialData) {
            setStartingEnergy(initialData.startingEnergyElectronVolts);
            setEndEnergy(initialData.endEnergyElectronVolts);
            setExposureMs(initialData.exposureMilisecondsPerPoint);
        } else {
            // Reset to defaults
            setStartingEnergy(0);
            setEndEnergy(1000);
            setExposureMs(50);
        }
    }, [initialData, open]);

    const handleSubmit = () => {
        const roi: RegionOfInterest = {
            startingEnergyElectronVolts: startingEnergy,
            endEnergyElectronVolts: endEnergy,
            exposureMilisecondsPerPoint: exposureMs,
            formulaForExposureTime: initialData?.formulaForExposureTime || "",
            numberOfPointsOfExposure: initialData?.numberOfPointsOfExposure || 0,
        };
        console.log("submitting a new roi ", roi);
        onSubmit(roi);
        onClose();
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>{initialData ? "Edit Region of Interest" : "Add New Region of Interest"}</DialogTitle>
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
                <Button variant="contained" onClick={handleSubmit}>
                    {initialData ? "Save Changes" : "Add ROI"}
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default NewROIDialog;
