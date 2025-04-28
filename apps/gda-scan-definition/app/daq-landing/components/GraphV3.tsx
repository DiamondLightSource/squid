"use client";

import React, { useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import { RegionOfInterestSvg } from "./RegionOfInterestSvg";
import { RegionOfInterest } from "./RegionOfInterest";
import NewROIDialog from "./NewRoiDialog";

type Point = {
    x: number;
    y: number;
};

export type GraphV3Props = {
    regionsOfInterest: RegionOfInterest[];
    points: Point[];
    addRoiCallback: (r: RegionOfInterest) => void;
};

// todo ask what are good meaningful values for this
const GRAPH_WIDTH = 900;
const GRAPH_HEIGHT = 300;
const ENERGY_MIN = 0;
const ENERGY_MAX = 10000; // Example energy range

function GraphV3({ regionsOfInterest, points, addRoiCallback }: GraphV3Props) {
    const scaleX = (energy: number) => 40 +
        ((energy - ENERGY_MIN) / (ENERGY_MAX - ENERGY_MIN)) * GRAPH_WIDTH;

    const scaleY = (value: number) =>
        GRAPH_HEIGHT - (value / 100) * GRAPH_HEIGHT;
    const [dialogOpen, setDialogOpen] = useState(false);

    const handleAddNewROI = (r: RegionOfInterest) => {
        // TODO: Add your actual logic
        alert("Add new Region of Interest!");
        console.dir(r);
        addRoiCallback(r);
    };

    return (
        <Box sx={{ border: "1px solid lightgray", p: 2 }}>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
                <Typography variant="h6">Scan Definition Graph</Typography>
                <Button variant="outlined" size="small" onClick={() => setDialogOpen(true)}>
                    Add New ROI
                </Button>
                <Button variant="outlined" size="small" onClick={() => setDialogOpen(true)}>
                    Add New QEXAFS ROI (appends a default field)
                </Button>
            </Box>
            <NewROIDialog
                open={dialogOpen}
                onClose={() => setDialogOpen(false)}
                onSubmit={handleAddNewROI}
            />

            <svg width={GRAPH_WIDTH} height={GRAPH_HEIGHT} style={{ backgroundColor: "#f9f9f9" }}>
                {/* Axes */}
                <line x1={0} y1={280} x2={GRAPH_WIDTH} y2={280} stroke="black" />
                <line x1={40} y1={0} x2={40} y2={GRAPH_HEIGHT} stroke="black" />

                {/* Graph Title */}
                <text x={GRAPH_WIDTH / 2} y={20} textAnchor="middle" fontSize="16" fontWeight="bold">
                    Regions of Interest
                </text>

                {/* Points Line */}
                {points.length > 1 && (
                    <polyline
                        fill="none"
                        stroke="red"
                        strokeWidth={2}
                        points={points.map((p) => `${scaleX(p.x)},${scaleY(p.y)}`).join(" ")}
                    />
                )}

                {/* Regions */}
                {regionsOfInterest.map((roi, index) => (
                    <RegionOfInterestSvg key={index} index={index} scaleX={scaleX} roi={roi} />
                ))}

                {/* Labels */}
                <text x={10} y={35} fontSize="12">delta Energy (eV)</text>
                <text x={GRAPH_WIDTH - 80} y={GRAPH_HEIGHT - 10} fontSize="12">
                    Energy (eV)
                </text>
            </svg>
        </Box>
    );
}

export default GraphV3;
