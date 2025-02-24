"use client";
import React, { useEffect, useState } from "react";
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
import { TaskDetails, useCurrentTask, useDevices, useEnvironment, usePlans, useTaskById, useWorkerState } from "../hooks";
import PlanForm from "./PlanForm";
import { environmentStatusMapping, taskStatusEnumMapping, workerStatusMapping } from "./Icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Grade } from "@mui/icons-material";
import QueueManager from "./QueueManager";



function getTaskDisplay(task: TaskDetails | null) {
    if (!task) {
        return taskStatusEnumMapping.ERROR;
    }
    if (task.errors && task.errors.length !== 0) {
        return taskStatusEnumMapping.ERROR;
    }
    if (task.is_complete) {
        return taskStatusEnumMapping.COMPLETE
    }
    if (task.is_pending) {
        return taskStatusEnumMapping.PENDING
    }
    return taskStatusEnumMapping.RUNNING;

}

// const beamlineName = process.env.BEAMLINE;
const beamlineName = "i22";

const IoTDashboard: React.FC = () => {
    const [search, setSearch] = useState("");
    const [selectedPlan, setSelectedPlan] = useState({});

    const { state: workerState, loading: workerLoading } = useWorkerState();
    const { task, loading: taskLoading } = useCurrentTask();
    const { devices, loading: devicesLoading } = useDevices();
    console.dir(devices);
    const { plans, loading: plansLoading } = usePlans();
    // console.log(`plans: ${plans}`)
    // console.dir(plans)

    const { taskDetails, loading: taskDetailsLoading } = useTaskById(task ?? '');
    const { environment, loading: environmentLoading } = useEnvironment();

    // todo add worker status icons and together with env status and on the left
    // todo and add a guiding tour package
    // todo add active panel on the right with current task status and plan description etc
    // todo make devices panel max height and scroll


    const environmentStatusForDisplay = environmentStatusMapping(environment.initialized);
    const workerStateForDisplay = workerState ? workerStatusMapping[workerState] : workerStatusMapping.UNKNOWN;
    const taskStateForDisplay = getTaskDisplay(task);


    console.dir(task)
    console.dir(taskDetails)
    const lastTask = taskDetails;
    console.dir(workerState)

    return (
        <Container maxWidth='xl'>
            <Typography variant="h4" gutterBottom>
                {beamlineName} Athena
            </Typography>

            {/* Worker & Environment Info */}
            <Grid container spacing={2}>
                <Grid item xs={2}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6">Worker Status</Typography>
                            <Typography>Status: {workerState}</Typography>
                            <div style={{ color: workerStateForDisplay.color, display: 'flex', alignItems: 'center' }}>
                                <FontAwesomeIcon icon={workerStateForDisplay.icon} style={{ marginRight: 8 }} />
                                <span>{workerState}</span>
                            </div>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item xs={4}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6">Environment</Typography>
                            <div style={{ color: environmentStatusForDisplay.color, display: 'flex', alignItems: 'center', marginTop: 10 }}>
                                <FontAwesomeIcon icon={environmentStatusForDisplay.icon} style={{ marginRight: 8 }} />
                                <span>initalized: {environment.initialized ? 'YES' : 'NO'}</span>
                                <Typography>{environment.error_message ? `error: ${environment.error_message}` : ``}</Typography>
                            </div>
                            <p>Devices available: {devices.length}</p>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={4}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6">Current Task</Typography>
                            <Typography>{task ? task.name : 'no task'}</Typography>
                            {
                                taskDetails !== null &&
                                <>
                                    <Typography>Complete: {lastTask.is_complete ? 'YES' : 'NO'}</Typography>
                                    <Typography>Pending: {lastTask.is_pending ? 'YES' : 'NO'}</Typography>
                                    <div style={{ color: taskStateForDisplay.color, display: 'flex', alignItems: 'center' }}>
                                        <FontAwesomeIcon icon={taskStateForDisplay.icon} style={{ marginRight: 8 }} />
                                        <span>{lastTask.task && lastTask.task.name}</span>
                                    </div>
                                </>
                            }
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>

            <Grid container spacing={2}>


                <Grid item xs={6}>

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
                    <TableContainer component={Paper} sx={{ maxHeight: '50vh', overflowY: 'scroll' }}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Name</TableCell>
                                    <TableCell>Protocols</TableCell>
                                    {/* <TableCell>Last Seen</TableCell> */}
                                </TableRow>
                            </TableHead>
                            <TableBody sx={{ maxHeight: '50vh', overflowY: 'scroll' }}>
                                {devices
                                    .filter((device) => {

                                        const p = device.protocols.join(" ").toLowerCase();
                                        const n = device.name.toLowerCase();
                                        return [p, n].some(i => i.includes(search.toLowerCase()))
                                    }
                                    )
                                    .map((device) => (
                                        <TableRow key={device.id}>
                                            <TableCell>{device.name}</TableCell>
                                            <TableCell>{device.protocols.map(m => {
                                                return <span>{m} {" "}</span>
                                            })}</TableCell>
                                        </TableRow>
                                    ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>

                <Grid item xs={6}>

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
                                            {plan["name"]}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            <p>{selectedPlan.description ?? 'no description'}</p>
                        </Grid>
                        <Grid item xs={6}>
                            <QueueManager />
                            <PlanForm planName={selectedPlan.name} />
                        </Grid>
                    </Grid>
                </Grid >
            </Grid >
        </Container>
    );
};

export default IoTDashboard;
