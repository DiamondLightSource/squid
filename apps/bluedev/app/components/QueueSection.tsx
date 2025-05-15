"use client";
import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

interface Props {
    queue: string[];
    setQueue: (queue: string[]) => void;
    serverBusy: boolean;
    setServerBusy: (busy: boolean) => void;
}

export default function QueueSection({ queue, setQueue, serverBusy, setServerBusy }: Props) {
    const handleSendNext = () => {
        if (queue.length > 0 && !serverBusy) {
            const nextRequest = queue[0];
            console.log("Sending:", nextRequest);
            setQueue(queue.slice(1));
            setServerBusy(true);
            setTimeout(() => setServerBusy(false), 3000); // Mock server response
        }
    };

    return (
        <Box>
            <Typography variant="h6">Queue</Typography>
            <ul>
                {queue.map((q, i) => (
                    <li key={i}>{q.substring(0, 120)}</li>
                ))}
            </ul>
            <Button variant="contained" onClick={handleSendNext} disabled={serverBusy || queue.length === 0}>
                Send Next
            </Button>
        </Box>
    );
}
