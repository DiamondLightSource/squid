"use client";

import React from "react";
import { Box, Button } from "@mui/material";
import { ClientOnly, Roi, RoiGraph, RoiProvider, RoiTable, useRoiContext } from "@repo/ui/roi-picker";
import OldRoiPicker from '@repo/ui/old-roi-picker';


const data = [
    {
        name: 'Page A',
        uv: 4000,
        pv: 2400,
        amt: 2400,
    },
    {
        name: 'Page B',
        uv: 3000,
        pv: 1398,
        amt: 2210,
    },
    {
        name: 'Page C',
        uv: 2000,
        pv: 9800,
        amt: 2290,
    },
    {
        name: 'Page D',
        uv: 2780,
        pv: 3908,
        amt: 2000,
    },
    {
        name: 'Page E',
        uv: 1890,
        pv: 4800,
        amt: 2181,
    },
    {
        name: 'Page F',
        uv: 2390,
        pv: 3800,
        amt: 2500,
    },
    {
        name: 'Page G',
        uv: 3490,
        pv: 4300,
        amt: 2100,
    },
];

const initialAxes = {
    xMin: 0,
    xMax: 1000,
    yMin: 0,
    yMax: 1000,
    xLabel: "Energy (eV)",
    yLabel: "Intensity (counts)",
};

const initialData = Array.from({ length: 1000 }, (_, i) => [Math.sin(i / 100) * 500 + 500]);

export default function App() {
    const { addRoi, setData } = useRoiContext();

    const handleAddNewRoi = () => {
        const defaultRoi: Roi = {
            xStart: 100,
            xEnd: 300,
            yStart: 200,
            yEnd: 500,
            values: {
                exposure_ms: 50,
                gain: 1.0,
            },
        };
        console.log(`adding a new roi: ${defaultRoi}`)
        console.dir(defaultRoi);
        addRoi(defaultRoi);
    };

    return (
        <div>

            <OldRoiPicker data={data} />
            <RoiProvider defaultAxes={initialAxes} initialData={initialData}>
                <Box sx={{ p: 4 }}>
                    <Button variant="contained" onClick={handleAddNewRoi} sx={{ mb: 2 }}>
                        Add New ROI
                    </Button>

                    <ClientOnly>

                        <RoiGraph />
                        <RoiTable />
                    </ClientOnly>
                </Box>
            </RoiProvider>
        </div>
    );
}
