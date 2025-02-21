"use client";
import React, { useState } from "react";
import {
    Container,
    Grid,
    Card,
    CardContent,
    Typography,
    TextField,
    Button,
    Select,
    MenuItem,
    InputLabel,
    FormControl,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
} from "@mui/material";

const IoTDashboard: React.FC = () => {
    const [search, setSearch] = useState("");
    const [selectedPlan, setSelectedPlan] = useState("");
    const [params, setParams] = useState({ param1: "", param2: "", param3: "" });

    const devices = [
        { id: 1001, name: "Sensor A", status: "Online", lastSeen: "5 sec ago" },
        { id: 1002, name: "Sensor B", status: "Offline", lastSeen: "3 min ago" },
        { id: 1003, name: "Actuator X", status: "Online", lastSeen: "10 sec ago" },
        { id: 1004, name: "Camera Y", status: "Online", lastSeen: "15 sec ago" },
    ];

    const plans = [
        "Temperature Calibration",
        "Humidity Sync",
        "Security Sweep",
        "Custom Data Capture",
    ];

    return (
        <Container>
            <Typography variant="h4" gutterBottom>
                IoT Dashboard
            </Typography>

            {/* Worker & Environment Info */}
            <Grid container spacing={2}>
                <Grid item xs={4}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6">Worker Status</Typography>
                            <Typography>Status: Active</Typography>
                            <Typography>Worker #42</Typography>
                            <Typography>CPU: 45%</Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={4}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6">Current Task</Typography>
                            <Typography>Processing Data</Typography>
                            <Typography>Task: Sensor Sync</Typography>
                            <Typography>Progress: 75%</Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={4}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6">Environment</Typography>
                            <Typography>Temperature: 22°C</Typography>
                            <Typography>Humidity: 60%</Typography>
                            <Typography>Pressure: 1013 hPa</Typography>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>

            {/* Search Devices */}
            <TextField
                label="Search Devices"
                variant="outlined"
                fullWidth
                margin="normal"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />

            {/* Active Devices Table */}
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell>Last Seen</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {devices
                            .filter((device) =>
                                device.name.toLowerCase().includes(search.toLowerCase())
                            )
                            .map((device) => (
                                <TableRow key={device.id}>
                                    <TableCell>{device.id}</TableCell>
                                    <TableCell>{device.name}</TableCell>
                                    <TableCell>{device.status}</TableCell>
                                    <TableCell>{device.lastSeen}</TableCell>
                                </TableRow>
                            ))}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* Plans & Parameter Submission */}
            <Grid container spacing={2} mt={2}>
                <Grid item xs={6}>
                    <FormControl fullWidth>
                        <InputLabel>Select Plan</InputLabel>
                        <Select
                            value={selectedPlan}
                            onChange={(e) => setSelectedPlan(e.target.value)}
                        >
                            {plans.map((plan, index) => (
                                <MenuItem key={index} value={plan}>
                                    {plan}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        label="Parameter 1"
                        fullWidth
                        value={params.param1}
                        onChange={(e) => setParams({ ...params, param1: e.target.value })}
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        label="Parameter 2"
                        fullWidth
                        value={params.param2}
                        onChange={(e) => setParams({ ...params, param2: e.target.value })}
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        label="Parameter 3"
                        fullWidth
                        value={params.param3}
                        onChange={(e) => setParams({ ...params, param3: e.target.value })}
                    />
                </Grid>
            </Grid>
            <Button variant="contained" color="primary" sx={{ mt: 2 }}>
                Submit Plan
            </Button>
        </Container>
    );
};

export default IoTDashboard;
