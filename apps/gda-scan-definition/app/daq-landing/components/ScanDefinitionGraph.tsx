"use client";
import React from "react";
import { Stage, Layer, Rect, Text } from "react-konva";
import { Box } from "@mui/material";

function ScanDefinitionGraph() {
  return (
    <Box>
      <Stage width={600} height={400}>
        <Layer>
          {/* Graph title */}
          <Text text="Scan Definition Graph" fontSize={24} x={10} y={10} />

          {/* Axes */}
          <Rect x={50} y={50} width={500} height={1} fill="black" /> {/* Top axis */}
          <Rect x={550} y={50} width={1} height={300} fill="black" /> {/* Right axis */}

          {/* Graph regions */}
          {/* Placeholder - regions of interest can be added dynamically */}
          <Rect x={100} y={100} width={100} height={50} fill="lightblue" draggable />
          <Rect x={250} y={200} width={150} height={70} fill="lightgreen" draggable />
        </Layer>
      </Stage>

      {/* Note: X-axis slider (select ranges) will be added separately */}
    </Box>
  );
}

export default ScanDefinitionGraph;
