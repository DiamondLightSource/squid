"use client";

import React from "react";
import { Box, Typography } from "@mui/material";
import { RegionOfInterestSvg } from "./RegionOfInterestSvg";

export type RegionOfInterest = {
    startingEnergy: number;
    endEnergy: number;
    exposureMiliseconds: number;
    formulaForExposureTime: string;
};


type Point = {
    x: number, y: number
}
export type GraphV3Props = {
    regionsOfInterest: RegionOfInterest[];
    points: Point[]
};

const GRAPH_WIDTH = 600;
const GRAPH_HEIGHT = 400;
const ENERGY_MIN = 0;
const ENERGY_MAX = 10000; // Example range

function GraphV3({ regionsOfInterest, points }: GraphV3Props) {
    const scaleX = (energy: number) =>
        ((energy - ENERGY_MIN) / (ENERGY_MAX - ENERGY_MIN)) * GRAPH_WIDTH;

    return (
        <Box sx={{ border: "1px solid lightgray", p: 2 }}>
            <Typography variant="h6">Scan Definition Graph</Typography>
            {/* add a button for a new ROI */}

            <svg width={GRAPH_WIDTH} height={GRAPH_HEIGHT} style={{ backgroundColor: "#f9f9f9" }}>
                {/* Top axis */}
                <line x1={0} y1={40} x2={GRAPH_WIDTH} y2={40} stroke="black" />

                {/* Right axis */}
                <line x1={GRAPH_WIDTH - 40} y1={0} x2={GRAPH_WIDTH - 40} y2={GRAPH_HEIGHT} stroke="black" />

                {/* Graph Title */}
                <text x={GRAPH_WIDTH / 2} y={20} textAnchor="middle" fontSize="16" fontWeight="bold">
                    Regions of Interest
                </text>
                {/* todo add multipoint line to plot this based on points */}

                {/* Regions */}
                {regionsOfInterest.map((roi, index) => {
                    return <RegionOfInterestSvg index={index} scaleX={scaleX} roi={roi} />
                })}

                {/* Values along axis */}
                <text x={10} y={35} fontSize="12">Energy (eV)</text>
                <text x={GRAPH_WIDTH - 80} y={GRAPH_HEIGHT - 10} fontSize="12">
                    Exposure (ms)
                </text>
            </svg>
        </Box>
    );
}

export default GraphV3;


