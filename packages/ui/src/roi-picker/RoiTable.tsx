"use client";

import React from "react";
import { useRoiContext } from "./RoiContext";
import {
    Box,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    Button,
    TextField,
} from "@mui/material";

export default function RoiTable() {
    const { regions, updateRoi, deleteRoi } = useRoiContext();

    const handleUpdate = (index: number, key: string, value: string) => {
        const updatedValues = {
            ...regions[index].values,
            [key]: parseFloat(value),
        };

        const updatedRoi = { ...regions[index], values: updatedValues };
        updateRoi(index, updatedRoi);
    };

    return (
        <Box sx={{ mt: 4 }}>
            <Table size="small">
                <TableHead>
                    <TableRow>
                        <TableCell>Start (X)</TableCell>
                        <TableCell>End (X)</TableCell>
                        <TableCell>Start (Y)</TableCell>
                        <TableCell>End (Y)</TableCell>
                        <TableCell>Values</TableCell>
                        <TableCell>Actions</TableCell>
                    </TableRow>
                </TableHead>

                <TableBody>
                    {regions.map((roi, idx) => (
                        <TableRow key={idx}>
                            <TableCell>{roi.xStart}</TableCell>
                            <TableCell>{roi.xEnd}</TableCell>
                            <TableCell>{roi.yStart}</TableCell>
                            <TableCell>{roi.yEnd}</TableCell>
                            <TableCell>
                                {Object.entries(roi.values).map(([key, val]) => (
                                    <TextField
                                        key={key}
                                        label={key}
                                        value={val}
                                        size="small"
                                        variant="outlined"
                                        sx={{ mr: 1, mb: 1, width: 100 }}
                                        onChange={(e) =>
                                            handleUpdate(idx, key, e.target.value)
                                        }
                                    />
                                ))}
                            </TableCell>
                            <TableCell>
                                <Button
                                    size="small"
                                    variant="outlined"
                                    color="error"
                                    onClick={() => deleteRoi(idx)}
                                >
                                    Delete
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Box>
    );
}
