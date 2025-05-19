"use client";

import React, { useState } from "react";
import { Box, Button, Menu, MenuItem, TextField } from "@mui/material";
import { useRoiContext } from "./RoiContext";

type Props = {
    x: number;
    y: number;
    roiIndex: number;
    onClose: () => void;
};

export default function RoiContextMenu({ x, y, roiIndex, onClose }: Props) {
    const { regions, updateRoi } = useRoiContext();
    const roi = regions[roiIndex];

    const [values, setValues] = useState(roi.values);

    const handleSave = () => {
        updateRoi(roiIndex, { ...roi, values });
        onClose();
    };

    return (
        <Menu
            open={true}
            onClose={onClose}
            anchorReference="anchorPosition"
            anchorPosition={{ top: y, left: x }}
        >
            {Object.keys(values).map((key) => (
                <MenuItem key={key}>
                    <TextField
                        label={key}
                        value={values[key]}
                        onChange={(e) =>
                            setValues({ ...values, [key]: parseFloat(e.target.value) })
                        }
                    />
                </MenuItem>
            ))}
            <MenuItem>
                <Button variant="contained" onClick={handleSave}>Save</Button>
            </MenuItem>
        </Menu>
    );
}
