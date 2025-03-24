"use client";
import React, { useState } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Button,
    TextField,
    Switch,
    IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LongRowSchemaType, LongSchema, LongSchemaType } from "../../schemas/long";
import { startConfigRead, startConfigUpdate, useLongDispatch, useLongState } from "./LongContext";


const CLEAN_ROW: LongRowSchemaType = {
    Scan: "",
    Detector: "",
    Sample: "",
    Sample_getSampleWheelParameters_getFilter: "",
    Sample_getSampleParameterMotorPosition_sam2x_getDoMove: false,
    Sample_getSampleParameterMotorPosition_sam2x_getDemandPosition: 0,
    Sample_getSampleParameterMotorPosition_sam2y_getDoMove: false,
    Sample_getSampleParameterMotorPosition_sam2y_getDemandPosition: 0,
    Sample_getSampleParameterMotorPosition_fluoDist_getDoMove: false,
    Sample_getSampleParameterMotorPosition_fluoDist_getDemandPosition: 0,
    Output: "",
    Repetitions: 1,
};

export default function LongScheduler() {
    const { config, isLoading, error } = useLongState();
    const dispatch = useLongDispatch();

    const { control, handleSubmit, setValue, getValues } = useForm({
        resolver: zodResolver(LongSchema),
        defaultValues: { experiments: config },
    });

    // Function to handle adding a new row
    const addRow = async () => {
        if (!config) {
            alert("no existing definition to update!");
            return;
        }
        const newRow = window.structuredClone(CLEAN_ROW);
        const updatedConfig: LongSchemaType = [...config, newRow];
        await startConfigUpdate(dispatch, updatedConfig)
    };

    const handleReadConfig = async () => {
        await startConfigRead(dispatch);
    };

    // Function to delete a row
    const deleteRow = async (index: number) => {

        if (!config) {
            alert("no existing definition to update!");
            return;
        }
        const filteredConfig: LongSchemaType = config.filter((_, i) => i !== index);
        await startConfigUpdate(dispatch, filteredConfig)
    };

    return (
        <form onSubmit={handleSubmit((validData) => console.log("✅ Valid Data:", validData))}>
            <Button onClick={handleReadConfig} disabled={isLoading}>
                Read Config
            </Button>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Scan</TableCell>
                            <TableCell>Detector</TableCell>
                            <TableCell>Sample</TableCell>
                            <TableCell>Filter</TableCell>
                            <TableCell>sam2x Move</TableCell>
                            <TableCell>sam2x Position</TableCell>
                            <TableCell>sam2y Move</TableCell>
                            <TableCell>sam2y Position</TableCell>
                            <TableCell>fluoDist Move</TableCell>
                            <TableCell>fluoDist Position</TableCell>
                            <TableCell>Output</TableCell>
                            <TableCell>Repetitions</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {!config ? <p>no config!</p> : config.map((row, index) => (
                            <TableRow key={index}>
                                {Object.keys(row).map((key) => (
                                    <TableCell key={key}>
                                        <Controller
                                            name={`experiments.${index}.${key}`}
                                            control={control}
                                            defaultValue={row[key as keyof typeof row]}
                                            render={({ field }) =>
                                                typeof row[key as keyof typeof row] === "boolean" ? (
                                                    <Switch {...field} checked={field.value} />
                                                ) : typeof row[key as keyof typeof row] === "number" ? (
                                                    <TextField type="number" {...field} size="small" />
                                                ) : (
                                                    <TextField {...field} size="small" />
                                                )
                                            }
                                        />
                                    </TableCell>
                                ))}
                                <TableCell>
                                    <IconButton onClick={() => deleteRow(index)} color="error">
                                        <DeleteIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <Button onClick={addRow} variant="contained" color="primary" sx={{ mt: 2 }}>
                Add Row
            </Button>
            <Button type="submit" variant="contained" color="success" sx={{ mt: 2, ml: 2 }}>
                Submit
            </Button>
        </form>
    );
}
