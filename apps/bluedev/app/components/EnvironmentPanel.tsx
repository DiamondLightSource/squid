"use client";
import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

interface Props {
  setServerBusy: (busy: boolean) => void;
}

export default function EnvironmentPanel({ setServerBusy }: Props) {
  const [serverOk, setServerOk] = useState(false);

  const checkServerStatus = async () => {
    // Mock server check
    const isOk = Math.random() > 0.2; // 80% chance of being OK
    setServerOk(isOk);
    setServerBusy(!isOk);
  };

  return (
    <Box sx={{ marginBottom: 2 }}>
      <Typography variant="h6">Server Status</Typography>
      <Button variant="contained" color="primary" onClick={checkServerStatus} sx={{ marginRight: 2 }}>
        Check Server Status
      </Button>
      <Button variant="outlined" color={serverOk ? "success" : "error"} disabled>
        {serverOk ? "Server OK" : "Server Busy"}
      </Button>
    </Box>
  );
}
