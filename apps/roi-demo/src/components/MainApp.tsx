"use client";

import { Button, Box } from "@mui/material";
import { useRoiContext, RoiGraph, RoiTable, Roi, XOnlyRoiGraph } from "@repo/ui/roi-picker";

export default function MainApp() {
    const { addRoi, regions, makeContiguousAlongX } = useRoiContext();

    const handleAddNewRoi = () => {
        console.log("handleAddNewRoi called");
        const defaultRoi: Roi = {
            xStart: 100,
            xEnd: 300,
            yStart: 300,
            yEnd: 600,
            values: {
                exposure_ms: 50,
                gain: 1.0,
            },
        };
        addRoi(defaultRoi);
    };

    return (
        <Box>
            <Button variant="contained" onClick={handleAddNewRoi} sx={{ mb: 2 }}>
                Add New ROI
            </Button>
            <Button onClick={e => {
                makeContiguousAlongX(10);
            }}> Make contiguous along x if within 10</Button>

            <label>(right click a rectangle to change)</label>

            {/* <pre>Regions: {JSON.stringify(regions, null, 2)}</pre> Check if regions update */}

            {/* <RoiGraph /> */}
            <RoiTable />
            <XOnlyRoiGraph />
        </Box >
    );
}
