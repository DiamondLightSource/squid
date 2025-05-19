"use client";

import { Button, Box } from "@mui/material";
import { useRoiContext, RoiGraph, RoiTable, Roi } from "@repo/ui/roi-picker";

export default function MainApp() {
    const { addRoi, regions } = useRoiContext();

    const handleAddNewRoi = () => {
        console.log("handleAddNewRoi called");
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
        addRoi(defaultRoi);
    };

    return (
        <Box>
            <Button variant="contained" onClick={handleAddNewRoi} sx={{ mb: 2 }}>
                Add New ROI
            </Button>

            {/* <pre>Regions: {JSON.stringify(regions, null, 2)}</pre> Check if regions update */}

            <RoiGraph />
            <RoiTable />
        </Box>
    );
}
