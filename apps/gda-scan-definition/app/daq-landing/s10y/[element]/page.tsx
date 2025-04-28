"use client";
import { Box, Button, ButtonGroup, Grid, Menu, Typography } from "@mui/material";
import Link from "next/link";
import { useEffect, useState } from "react";
import GraphV3 from "../../components/GraphV3";
import { RegionOfInterest } from "../../components/RegionOfInterest";
import Stages from "../../components/Stages";
import { RegionOfInterestTable } from "../../components/RoiTable";
import NewROIDialog from "../../components/NewRoiDialog";
// import ScanDefinitionGraph from "../../components/ScanDefinitionGraph";
// import dynamic from "next/dynamic";

// const Canvas = dynamic(() => import("../../../../components/canvas"), { ssr: false });


const testRegion: RegionOfInterest = {
    startingEnergyElectronVolts: 10,
    endEnergyElectronVolts: 400,
    exposureMilisecondsPerPoint: 40,
    formulaForExposureTime: "",
    numberOfPointsOfExposure: 0
};

export default function PerElementScan({ params }: { params: Promise<{ element: string }> }) {

    const [rois, setRois] = useState<RegionOfInterest[]>([testRegion]);
    const [element, setElement] = useState<string | null>(null);

    useEffect(() => {
        async function load() {
            const { element } = await params;
            setElement(element);
        }
        load();
    }, [params]);


    const [dialogOpen, setDialogOpen] = useState(false);
    const [editTarget, setEditTarget] = useState<RegionOfInterest | null>(null);

    const handleAddClick = () => {
        setEditTarget(null); // no data -> adding new
        setDialogOpen(true);
    };

    const handleEditClick = (roi: RegionOfInterest) => {
        setEditTarget(roi); // load selected ROI into dialog
        setDialogOpen(true);
    };

    const handleSave = (newRoi: RegionOfInterest) => {
        if (editTarget) {
            console.log("Save edited ROI:", newRoi);
            const foundIndex = rois.findIndex(r => r == editTarget);
            if (foundIndex) {
                setRois(rs => {
                    rs[foundIndex] = newRoi;
                    return rs;
                })
            }
            // Replace the edited ROI in your list
        } else {
            console.log("Add new ROI:", newRoi);
            // Add new ROI to list
        }
        setDialogOpen(false);
    };
    return (
        <Box p={2}>
            <Typography variant="h3" gutterBottom>
                Scan this element {element}
            </Typography>
            <ButtonGroup>
                <Link href="../s10y">Go back</Link>
                <Button onClick={() => window.alert("trying to run a plan")}>RUN PLAN</Button>
            </ButtonGroup>

            <NewROIDialog
                open={dialogOpen}
                onClose={() => setDialogOpen(false)}
                onSubmit={handleSave}
                initialData={editTarget}
            />
            {/* Top thin panel */}
            <Stages value={1} />

            <Grid container spacing={2} sx={{ mt: 2 }}>
                {/* Left-hand block - 2/3 width */}
                <Grid item xs={12} md={8}>
                    <Grid container spacing={2}>
                        {/* Top: past measurements and live output */}
                        <Grid item xs={12} md={6}>
                            <Box sx={{ border: "1px solid lightgray", height: 200 }}>
                                {/* Past measurements list */}
                                Past Measurements
                            </Box>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Box sx={{ border: "1px solid lightgray", height: 200 }}>
                                {/* Live output component */}
                                Live Output
                            </Box>
                        </Grid>

                        {/* Bottom: graph */}
                        <Grid item xs={12}>
                            <Box sx={{ border: "1px solid lightgray", height: 400 }}>
                                {/* <NoKonvaGraph /> */}
                                <GraphV3 regionsOfInterest={rois} points={[
                                    // pre edge phase - keep y at 20
                                    { x: 109, y: 20 },
                                    { x: 509, y: 21 },
                                    { x: 809, y: 22 },
                                    // edge phase - sharp rise - small x and go y up

                                    // post edge phase
                                    { x: 1009, y: 76 },
                                    { x: 1109, y: 78 },
                                    { x: 1138, y: 80 },
                                    { x: 1140, y: 80 },
                                    { x: 1241, y: 81 },
                                    { x: 1342, y: 82 },
                                    { x: 1442, y: 82 },
                                    { x: 1541, y: 83 },
                                ]} addRoiCallback={r => setRois(rois => [...rois, r])}
                                    editRoiCallback={handleEditClick}
                                />
                            </Box>
                        </Grid>
                    </Grid>
                </Grid>

                {/* Right-hand block */}
                <Grid item xs={12} md={4}>
                    <Box sx={{ border: "1px solid lightgray", height: "100%" }}>
                        {/* Plan parameters form */}
                        <Typography variant="h4">
                            Plan Parameters Form
                        </Typography>
                        <RegionOfInterestTable regions={rois}
                            editRoiCallback={handleEditClick}
                        />
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );
}
