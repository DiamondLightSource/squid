"use client";
import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

interface Props {
    setQueue: (queue: string[]) => void;
    serverBusy: boolean;
}

export default function JsonForm({ setQueue, serverBusy }: Props) {
    const [jsonString, setJsonString] = useState("");

    const handleSubmit = () => {
        try {
            JSON.parse(jsonString);
            setQueue((q: any) => [...q, jsonString]);
            // todo add to history only after
            setJsonString("");
        } catch (err) {
            alert("Invalid JSON");
        }
    };

    return (
        <Box sx={{ marginBottom: 2 }}>
            <TextField
                label="JSON Parameters"
                multiline
                minRows={4}
                value={jsonString}
                onChange={(e) => setJsonString(e.target.value)}
                fullWidth
                sx={{ marginBottom: 2 }}
            />
            <Button variant="contained" onClick={handleSubmit} disabled={serverBusy}>
                Add to queue
            </Button>
        </Box>
    );
}
