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
import { z } from "zod";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LongSchema } from "../../schemas/long";

// Define Zod schema for a single row
const ExperimentRowSchema = z.object({
    Scan: z.string().min(1, "Required"),
    Detector: z.string().min(1, "Required"),
    Sample: z.string().min(1, "Required"),
    Sample_getSampleWheelParameters_getFilter: z.string(),
    Sample_getSampleParameterMotorPosition_sam2x_getDoMove: z.boolean(),
    Sample_getSampleParameterMotorPosition_sam2x_getDemandPosition: z.number(),
    Sample_getSampleParameterMotorPosition_sam2y_getDoMove: z.boolean(),
    Sample_getSampleParameterMotorPosition_sam2y_getDemandPosition: z.number(),
    Sample_getSampleParameterMotorPosition_fluoDist_getDoMove: z.boolean(),
    Sample_getSampleParameterMotorPosition_fluoDist_getDemandPosition: z.number(),
    Output: z.string().min(1, "Required"),
    Repetitions: z.number().int().min(1, "Must be at least 1"),
});

// Define schema for an array of rows
const ExperimentDataSchema = z.array(ExperimentRowSchema);

export default function LongScheduler() {
    const [data, setData] = useState([
        {
            Scan: "/scratch/users/data/2024/0-0/xml/Experiment_2_b18/QEXAFS_Parameters.xml",
            Detector: "/scratch/users/data/2024/0-0/xml/Experiment_2_b18/Detector_Parameters.xml",
            Sample: "/scratch/users/data/2024/0-0/xml/Experiment_2_b18/Sample_Parameters2.xml",
            Sample_getSampleWheelParameters_getFilter: "Laser",
            Sample_getSampleParameterMotorPosition_sam2x_getDoMove: true,
            Sample_getSampleParameterMotorPosition_sam2x_getDemandPosition: 16.0003,
            Sample_getSampleParameterMotorPosition_sam2y_getDoMove: true,
            Sample_getSampleParameterMotorPosition_sam2y_getDemandPosition: 90,
            Sample_getSampleParameterMotorPosition_fluoDist_getDoMove: true,
            Sample_getSampleParameterMotorPosition_fluoDist_getDemandPosition: -100,
            Output: "/scratch/users/data/2024/0-0/xml/Experiment_2_b18/Output_Parameters.xml",
            Repetitions: 1,
        },
    ]);

    const { control, handleSubmit, setValue, getValues } = useForm({
        resolver: zodResolver(LongSchema),
        defaultValues: { experiments: data },
    });

    // Function to handle adding a new row
    const addRow = () => {
        const newRow = {
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
        setData([...data, newRow]);
    };

    // Function to delete a row
    const deleteRow = (index: number) => {
        const newData = data.filter((_, i) => i !== index);
        setData(newData);
    };

    return (
        <form onSubmit={handleSubmit((validData) => console.log("✅ Valid Data:", validData))}>
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
                        {data.map((row, index) => (
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
