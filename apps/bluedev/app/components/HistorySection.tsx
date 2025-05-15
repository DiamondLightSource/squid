"use client";
import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

interface Props {
  history: { timestamp: string, json: string }[];
}

export default function HistorySection({ history }: Props) {
  return (
    <Box>
      <Typography variant="h6">History</Typography>
      <ul>
        {history.map((h, i) => (
          <li key={i}>
            <strong>{h.timestamp}:</strong> {h.json.substring(0, 120)}
          </li>
        ))}
      </ul>
    </Box>
  );
}
