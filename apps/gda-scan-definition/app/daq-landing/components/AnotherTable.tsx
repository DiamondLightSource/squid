"use client";

import React, { useState } from "react";
import {
    Box,
    Button,
    Typography,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
} from "@mui/material";
import { useSendRois } from "../hooks/useSendRois";
import { Roi } from "../../schemas/roiSchemas";

const defaultRoi: Roi = {
    number_of_exposure_points: 100,
    start_energy_electron_volts: 1000,
    end_energy_electron_volts: 2000,
    exposure_miliseconds_per_point: 50,
    qexafs_params: {
        quad_multiplier: 0,
        linear_multiplier: 0,
        constant: 1,
    },
};

export default function RoiTable() {
    const [rois, setRois] = useState<Roi[]>([defaultRoi]);
    const { sendRois, isLoading, error, success } = useSendRois("/api/submit-rois"); // Replace with your endpoint

    const addNewRoi = () => setRois([...rois, defaultRoi]);

    const deleteRoi = (index: number) => {
        setRois(rois.filter((_, i) => i !== index));
    };

    const handleSend = async () => {
        await sendRois(rois);
    };

    return (
        <Box sx={{ mt: 4 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
                ROI Table
            </Typography>

            <Table size="small">
                <TableHead>
                    <TableRow>
                        <TableCell>Start (eV)</TableCell>
                        <TableCell>End (eV)</TableCell>
                        <TableCell>Exposure (ms)</TableCell>
                        <TableCell>Points</TableCell>
                        <TableCell>Constant</TableCell>
                        <TableCell>Linear</TableCell>
                        <TableCell>Quad</TableCell>
                        <TableCell />
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rois.map((roi, idx) => (
                        <TableRow key={idx}>
                            <TableCell>{roi.start_energy_electron_volts}</TableCell>
                            <TableCell>{roi.end_energy_electron_volts}</TableCell>
                            <TableCell>{roi.exposure_miliseconds_per_point}</TableCell>
                            <TableCell>{roi.number_of_exposure_points}</TableCell>
                            <TableCell>{roi.qexafs_params.constant}</TableCell>
                            <TableCell>{roi.qexafs_params.linear_multiplier}</TableCell>
                            <TableCell>{roi.qexafs_params.quad_multiplier}</TableCell>
                            <TableCell>
                                <Button size="small" onClick={() => deleteRoi(idx)}>
                                    Delete
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
                <Button variant="outlined" onClick={addNewRoi}>
                    Add New
                </Button>
                <Button
                    variant="contained"
                    onClick={handleSend}
                    disabled={isLoading || rois.length === 0}
                >
                    {isLoading ? "Sending..." : "Send All"}
                </Button>
            </Box>

            {success && (
                <Typography color="success.main" sx={{ mt: 1 }}>
                    ROIs submitted successfully!
                </Typography>
            )}
            {error && (
                <Typography color="error.main" sx={{ mt: 1 }}>
                    Error: {error}
                </Typography>
            )}
        </Box>
    );
}
