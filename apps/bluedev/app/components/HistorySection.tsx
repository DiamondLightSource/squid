"use client";
import React, { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemSecondaryAction from "@mui/material/ListItemSecondaryAction";
import IconButton from "@mui/material/IconButton";
import ReplayIcon from "@mui/icons-material/Replay";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import Tooltip from "@mui/material/Tooltip";
import Snackbar from "@mui/material/Snackbar";

interface Props {
  history: { timestamp: string; json: string }[];
  setQueue: (queue: string[]) => void;
  queue: string[];
}

export default function HistorySection({ history, setQueue, queue }: Props) {
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handleReQueue = (json: string) => {
    setQueue([...queue, json]);
  };

  const handleCopy = (json: string) => {
    navigator.clipboard.writeText(json);
    setSnackbarOpen(true);
  };

  return (
    <Box>
      <Typography variant="h6">History</Typography>
      <List dense>
        {history.map((h, i) => (
          <ListItem key={i} sx={{ backgroundColor: "#f9f9f9", marginBottom: 1, borderRadius: 1, minWidth: 180 }}>
            <ListItemText
              primary={<strong>{h.timestamp}</strong>}
              secondary={h.json.substring(0, 120)}
            />
            <ListItemSecondaryAction>
              <Tooltip title="Re-queue">
                <IconButton edge="end" aria-label="requeue" onClick={() => handleReQueue(h.json)}>
                  <ReplayIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="Copy JSON">
                <IconButton edge="end" aria-label="copy" onClick={() => handleCopy(h.json)}>
                  <ContentCopyIcon />
                </IconButton>
              </Tooltip>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>

      {/* Snackbar for Copy Confirmation */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={2000}
        onClose={() => setSnackbarOpen(false)}
        message="JSON copied to clipboard"
      />
    </Box>
  );
}
