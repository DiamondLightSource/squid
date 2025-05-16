"use client";
import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Chip from "@mui/material/Chip";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";
import api from "../utils/api";

interface PackageInfo {
    name: string;
    version: string;
    location: string;
    is_dirty: boolean;
    source: string;
}

interface PythonEnvironment {
    installed_packages: PackageInfo[];
    scratch_enabled: boolean;
}

export default function PythonEnvironment() {
    const [envInfo, setEnvInfo] = useState<PythonEnvironment | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchEnvironment = async () => {
            try {
                const response = await api.get("/python_environment");
                setEnvInfo(response.data);
            } catch (err) {
                console.error("Error fetching Python environment:", err);
                setError("Failed to load Python environment data.");
            } finally {
                setLoading(false);
            }
        };

        fetchEnvironment();
    }, []);

    if (loading) return <CircularProgress sx={{ margin: 2 }} />;

    if (error) {
        return <Alert severity="error">{error}</Alert>;
    }

    return (
        <Box sx={{ padding: 2, backgroundColor: "#f9f9f9", borderRadius: 1 }}>
            <Typography variant="h6" gutterBottom>
                Python Environment
            </Typography>

            {/* Scratch Space Status */}
            <Alert severity={envInfo?.scratch_enabled ? "success" : "warning"} sx={{ marginBottom: 2 }}>
                {envInfo?.scratch_enabled ? "Scratch Space Enabled" : "Scratch Space Disabled"}
            </Alert>

            {/* Installed Packages */}
            <Typography variant="subtitle1" gutterBottom>
                Installed Packages ({envInfo?.installed_packages.length || 0})
            </Typography>
            <List dense sx={{ maxHeight: '50%', overflowY: 'scroll' }}>
                {envInfo?.installed_packages.map((pkg, index) => (
                    <ListItem key={index} sx={{ backgroundColor: pkg.is_dirty ? "#fce4ec" : "#e8f5e9", marginBottom: 1, borderRadius: 1 }}>
                        <ListItemText
                            primary={`${pkg.name} (${pkg.version})`}
                            secondary={`Location: ${pkg.location} | Source: ${pkg.source}`}
                        />
                        {pkg.is_dirty && <Chip label="Dirty" color="error" />}
                    </ListItem>
                ))}
            </List>
        </Box>
    );
}
