"use client";
import React, { useState } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import QueueSection from "./QueueSection";
import EnvironmentPanel from "./EnvironmentPanel";
import JsonForm from "./JsonForm";
import HistorySection from "./HistorySection";

export default function MainLayout() {
    const [queue, setQueue] = useState<string[]>([]);
    const [history, setHistory] = useState<{ timestamp: string, json: string }[]>([]);
    const [serverBusy, setServerBusy] = useState(false);

    return (
        <Box sx={{ padding: 2 }}>
            <Grid container spacing={2}>
                {/* Environment Status Panel */}
                <Grid item xs={12}>
                    <EnvironmentPanel setServerBusy={setServerBusy} />
                </Grid>

                {/* JSON Form */}
                <Grid item xs={12}>
                    <JsonForm setQueue={setQueue} setHistory={setHistory} serverBusy={serverBusy} />
                </Grid>

                {/* Queue Section */}
                <Grid item xs={6}>
                    <QueueSection queue={queue} setQueue={setQueue} serverBusy={serverBusy} setServerBusy={setServerBusy} />
                </Grid>

                {/* History Section */}
                <Grid item xs={6}>
                    <HistorySection history={history} queue={queue} setQueue={setQueue} />
                </Grid>
            </Grid>
        </Box>
    );
}
