"use client";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import React from "react";
import { TaskStatus } from "./TaskStatus";

export function TaskStatusComponent({ status }: { status: TaskStatus }): React.JSX.Element {
    return <ListItem key={status.task_id} sx={{ backgroundColor: status.is_complete ? "#d4edda" : "#f8d7da", marginBottom: 1 }}>
        <ListItemText
            primary={`${status.task_id} - ${status.is_complete ? "Complete" : status.is_pending ? "Pending" : "In Progress"}`}
            secondary={status.errors.length > 0
                ? `Errors: ${status.errors.join(", ")}`
                : status.task.substring(0, 120)} />
    </ListItem>;
}