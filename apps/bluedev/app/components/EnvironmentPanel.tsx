"use client";
import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import CircularProgress from "@mui/material/CircularProgress";
import api from "../utils/api";

interface Props {
  setServerBusy: (busy: boolean) => void;
}

export default function EnvironmentPanel({ setServerBusy }: Props) {
  const [serverOk, setServerOk] = useState<boolean | null>(null);
  const [environment, setEnvironment] = useState<{ initialized: boolean; error_message: string | null } | null>(null);
  const [loading, setLoading] = useState(false);

  const checkServerStatus = async () => {
    try {
      setLoading(true);

      // 🔄 Check Health
      const healthRes = await api.get("/healthz");
      const isHealthy = healthRes.data.status === "ok";
      setServerOk(isHealthy);
      setServerBusy(!isHealthy);

      // 🔄 Check Environment Status
      const envRes = await api.get("/environment");
      setEnvironment(envRes.data);

    } catch (error) {
      console.error("Error checking server status:", error);
      setServerOk(false);
      setServerBusy(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Check server status on mount
    checkServerStatus();
  }, []);

  return (
    <Box sx={{ marginBottom: 2 }}>
      <Typography variant="h6">Server Status</Typography>

      {/* Status Button */}
      <Button variant="contained" color="primary" onClick={checkServerStatus} disabled={loading} sx={{ marginRight: 2 }}>
        {loading ? <CircularProgress size={20} color="inherit" /> : "Check Server Status"}
      </Button>

      {/* Health Status */}
      {serverOk !== null && (
        <Alert severity={serverOk ? "success" : "error"} sx={{ marginBottom: 2 }}>
          {serverOk ? "Server OK" : "Server Busy"}
        </Alert>
      )}

      {/* Environment Status */}
      {environment && (
        <Alert severity={environment.initialized ? "success" : "warning"}>
          {environment.initialized
            ? `Environment Ready (ID: ${environment.environment_id})`
            : `Environment Not Ready: ${environment.error_message || "Unknown error"}`
          }
        </Alert>
      )}
    </Box>
  );
}
