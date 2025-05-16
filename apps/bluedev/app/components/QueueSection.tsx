"use client";
import React, { useEffect, useState, useCallback, useRef } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import api from "../utils/api";
import { TaskStatus } from "./TaskStatus";
import { TaskStatusComponent } from "./TaskStatusComponent";

interface Props {
    queue: string[];
    setQueue: (queue: string[]) => void;
    serverBusy: boolean;
    setServerBusy: (busy: boolean) => void;
}

export default function QueueSection({ queue, setQueue, serverBusy, setServerBusy }: Props) {
    const [taskStatuses, setTaskStatuses] = useState<Record<string, TaskStatus>>({});
    const [polling, setPolling] = useState(false);
    const [pollTimes, setPollTimes] = useState<number[]>([]); // Store poll times
    const runAllRef = useRef(false);

    // 🕐 Poll for task status updates
    useEffect(() => {
        if (!polling) return;

        const interval = setInterval(async () => {
            try {
                const taskIds = Object.keys(taskStatuses);
                const updatedStatuses = { ...taskStatuses };

                for (const taskId of taskIds) {
                    const res = await api.get(`/tasks/${taskId}`);
                    const status = res.data as TaskStatus;
                    updatedStatuses[taskId] = status;

                    // ✅ Remove completed tasks from the queue
                    if (status.is_complete) {
                        delete updatedStatuses[taskId];
                    }
                }

                setTaskStatuses(updatedStatuses);
            } catch (error) {
                console.error("Error fetching task status:", error);
            }
        }, 3000); // Poll every 3 seconds

        return () => clearInterval(interval);
    }, [taskStatuses, polling]);

    // 📦 Send the next task
    const handleSendNext = useCallback(async () => {
        if (queue.length === 0 || serverBusy) return;

        const nextRequest = queue[0];
        setServerBusy(true);

        try {
            // 1️⃣ Create a new task
            const taskResponse = await api.post("/tasks", JSON.parse(nextRequest), {
                headers: { "Content-Type": "application/json" },
            });

            const taskId = taskResponse.data.task_id;
            console.log("Task Created:", taskId);

            // 2️⃣ Send the task to the worker
            await api.put("/worker/task", { task_id: taskId }, {
                headers: { "Content-Type": "application/json" },
            });

            console.log("Task Assigned:", taskId);

            // 3️⃣ Add the task to the status tracking
            setTaskStatuses((prev) => ({
                ...prev,
                [taskId]: {
                    task_id: taskId,
                    task: nextRequest,
                    request_id: "",
                    is_complete: false,
                    is_pending: true,
                    errors: [],
                },
            }));

            // 4️⃣ Remove the task from the queue
            setQueue(queue.slice(1));

            // ✅ Start polling for status updates if not already running
            if (!polling) setPolling(true);

        } catch (error) {
            console.error("Error processing task:", error);
            alert("Failed to process the task. Check server status.");
        } finally {
            setServerBusy(false);
        }
    }, [queue, serverBusy, setQueue, setServerBusy, polling]);

    // 🔄 Run All Tasks
    const handleRunAll = useCallback(async () => {
        if (queue.length === 0 || serverBusy) return;

        runAllRef.current = true;
        setServerBusy(true);

        try {
            while (queue.length > 0 && runAllRef.current) {
                const nextRequest = queue[0];

                // Create the task
                const taskResponse = await api.post("/tasks", JSON.parse(nextRequest), {
                    headers: { "Content-Type": "application/json" },
                });

                const taskId = taskResponse.data.task_id;
                console.log("Task Created:", taskId);

                // Assign the task to the worker
                await api.put("/worker/task", { task_id: taskId }, {
                    headers: { "Content-Type": "application/json" },
                });

                console.log("Task Assigned:", taskId);

                // Add the task to the status tracking
                setTaskStatuses((prev) => ({
                    ...prev,
                    [taskId]: {
                        task_id: taskId,
                        task: nextRequest,
                        request_id: "",
                        is_complete: false,
                        is_pending: true,
                        errors: [],
                    },
                }));

                // Wait for task completion
                let isComplete = false;
                while (!isComplete) {
                    const res = await api.get(`/tasks/${taskId}`);
                    const status = res.data as TaskStatus;
                    isComplete = status.is_complete;

                    // Update task status
                    setTaskStatuses((prev) => ({
                        ...prev,
                        [taskId]: status,
                    }));

                    // Prevent tight polling loop
                    if (!isComplete) await new Promise((r) => setTimeout(r, 1000));
                }

                // Remove the task from the queue
                setQueue((prev) => prev.slice(1));
            }
        } catch (error) {
            console.error("Error running all tasks:", error);
            alert("Failed to run all tasks. Check server status.");
        } finally {
            setServerBusy(false);
            runAllRef.current = false;
        }
    }, [queue, serverBusy, setQueue, setServerBusy]);

    return (
        <Box>
            <Typography variant="h6">Queue</Typography>

            {/* Task Queue */}
            <List dense>
                {queue.map((q, i) => (
                    <ListItem key={i}>
                        <ListItemText primary={q.substring(0, 120)} />
                    </ListItem>
                ))}
            </List>

            <Button
                variant="contained"
                onClick={handleSendNext}
                disabled={serverBusy || queue.length === 0}
                sx={{ marginBottom: 2 }}
            >
                Send Next
            </Button>

            <Button
                variant="outlined"
                color="secondary"
                onClick={handleRunAll}
                disabled={serverBusy || queue.length === 0}
                sx={{ marginBottom: 2 }}
            >
                Run All
            </Button>

            {/* Task Statuses */}
            <Typography variant="h6">Active Tasks</Typography>
            <List dense>
                {Object.values(taskStatuses).map((status) => (
                    <TaskStatusComponent status={status} />
                ))}
            </List>
        </Box>
    );
}



