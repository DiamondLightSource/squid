"use client";

import { RoiProvider } from "@repo/ui/roi-picker";
import { Box } from "@mui/material";
import MainApp from "./components/MainApp";
import './App.css';

const initialAxes = {
  xMin: -200,
  xMax: 1000,
  yMin: -200,
  yMax: 1000,
  xLabel: "Energy (eV)",
  yLabel: "Intensity (counts)",
};

const initialData = Array.from({ length: 1000 }, (_, i) => [Math.sin(i / 100) * 500 + 500]);

export default function App() {
  return (
    <RoiProvider defaultAxes={initialAxes} initialData={initialData}>
      <Box sx={{ p: 4 }}>
        <MainApp />
      </Box>
    </RoiProvider>
  );
}
