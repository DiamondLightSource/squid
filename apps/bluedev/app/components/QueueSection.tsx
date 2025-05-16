"use client";
import React, { useEffect, useState, useCallback } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import axios from "axios";

interface Props {
    queue: string[];
    setQueue: (queue: string[]) => void;
    serverBusy: boolean;
    setServerBusy: (busy: boolean) => void;
}

interface TaskStatus {
    task_id: string;
    task: string;
    request_id: string;
    is_complete: boolean;
    is_pending: boolean;
    errors: string[];
}

export default function QueueSection({ queue, setQueue, serverBusy, setServerBusy }: Props) {
    const [taskStatuses, setTaskStatuses] = useState<Record<string, TaskStatus>>({});
    const [polling, setPolling] = useState(false);

    // 🕐 Poll for task status updates
    useEffect(() => {
        if (!polling) return;

        const interval = setInterval(async () => {
            try {
                const taskIds = Object.keys(taskStatuses);
                const updatedStatuses = { ...taskStatuses };

                for (const taskId of taskIds) {
                    const res = await axios.get(`/tasks/${taskId}`);
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
            const taskResponse = await axios.post("/api/tasks", JSON.parse(nextRequest), {
                headers: { "Content-Type": "application/json" },
            });

            const taskId = taskResponse.data.task_id;
            console.log("Task Created:", taskId);

            // 2️⃣ Send the task to the worker
            await axios.put("/api/worker/task", { task_id: taskId }, {
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

            {/* Task Statuses */}
            <Typography variant="h6">Active Tasks</Typography>
            <List dense>
                {Object.values(taskStatuses).map((status) => (
                    <ListItem key={status.task_id} sx={{ backgroundColor: status.is_complete ? "#d4edda" : "#f8d7da", marginBottom: 1 }}>
                        <ListItemText
                            primary={`${status.task_id} - ${status.is_complete ? "Complete" : status.is_pending ? "Pending" : "In Progress"}`}
                            secondary={
                                status.errors.length > 0
                                    ? `Errors: ${status.errors.join(", ")}`
                                    : status.task.substring(0, 120)
                            }
                        />
                    </ListItem>
                ))}
            </List>
        </Box>
    );
}
