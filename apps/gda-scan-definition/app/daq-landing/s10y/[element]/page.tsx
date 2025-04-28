"use client";
import { Box, Grid, Typography } from "@mui/material";
import Link from "next/link";
import Stages from "../../components/Stages";
import NoKonvaGraph from "../../components/NoKonvaGraph";
import GraphV3, { RegionOfInterest } from "../../components/GraphV3";
// import ScanDefinitionGraph from "../../components/ScanDefinitionGraph";
// import dynamic from "next/dynamic";

// const Canvas = dynamic(() => import("../../../../components/canvas"), { ssr: false });


const testRegion: RegionOfInterest = {
    startingEnergy: 10,
    endEnergy: 400,
    exposureMiliseconds: 40,
    formulaForExposureTime: ""
};

export default async function PerElementScan({ params }: { params: Promise<{ element: string }> }) {
    const { element } = await params;
    return (
        <Box p={2}>
            <Typography variant="h3" gutterBottom>
                Scan this element {element}
            </Typography>
            <Link href="..">Go back</Link>

            {/* Top thin panel */}
            <Stages />

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
                                <GraphV3 regionsOfInterest={[testRegion]} points={[
                                    { x: 10, y: 30 },
                                    { x: 50, y: 30 },
                                    { x: 70, y: 40 },
                                    { x: 900, y: 70 },
                                    { x: 110, y: 190 },
                                ]} />
                                {/* <Canvas stageHeight={300} stageWidth={300}> */}
                                {/* <ScanDefinitionGraph /> */}
                                {/* </Canvas> */}
                            </Box>
                        </Grid>
                    </Grid>
                </Grid>

                {/* Right-hand block */}
                <Grid item xs={12} md={4}>
                    <Box sx={{ border: "1px solid lightgray", height: "100%" }}>
                        {/* Plan parameters form */}
                        Plan Parameters Form
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );
}
