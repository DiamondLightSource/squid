"use client";
import React, { useState } from "react";
import { Box, Button, Slider, Stepper, Step, StepLabel, TextField, Typography, Table, TableHead, TableRow, TableCell, TableBody } from "@mui/material";
import { generateKArray2D } from "./utils";
import { K } from "./zodSchemas";

// Step Labels
const steps = ["Create Initial Object", "Vary Parameters", "Preview & Submit"];

export default function KFormStepper() {
  // Stepper state
  const [activeStep, setActiveStep] = useState(0);

  // Initial K object state
  const [formData, setFormData] = useState<Omit<K, "myParam" | "float">>({
    name: "",
  });

  // Ranges for varying myParam & float
  const [myParamRange, setMyParamRange] = useState([1, 10]); // Integer
  const [floatRange, setFloatRange] = useState([0.1, 1.0]); // Float

  // Generated table data
  const [generatedData, setGeneratedData] = useState<K[]>([]);

  // Handle form input change
  const handleChange = (field: keyof typeof formData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  // Step navigation
  const handleNext = () => {
    if (activeStep === 1) {
      // Generate data before preview step
      const data = generateKArray2D(
        formData,
        { min: myParamRange[0], max: myParamRange[1], step: 1 },
        { min: floatRange[0], max: floatRange[1], step: 0.1 }
      );
      setGeneratedData(data);
    }
    setActiveStep((prev) => prev + 1);
  };
  const handleBack = () => setActiveStep((prev) => prev - 1);

  // Handle form submit
  const handleSubmit = () => {
    console.log("Submitting data:", generatedData);
    alert("Submitted!");
  };

  return (
    <Box sx={{ width: "80%", margin: "auto", mt: 4, color: 'black' }}>
      <Stepper activeStep={activeStep}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      {/* Step 1: Create Initial K Object */}
      {activeStep === 0 && (
        <Box sx={{ mt: 4 }}>
          <Typography variant="h6">Step 1: Define Base Object</Typography>
          <TextField
            fullWidth
            label="Name"
            value={formData.name}
            onChange={(e) => handleChange("name", e.target.value)}
            sx={{ mt: 2 }}
          />
          <Button variant="contained" onClick={handleNext} sx={{ mt: 2 }}>
            Next
          </Button>
        </Box>
      )}

      {/* Step 2: Set Range for Variations */}
      {activeStep === 1 && (
        <Box sx={{ mt: 4 }}>
          <Typography variant="h6">Step 2: Vary Parameters</Typography>

          {/* myParam Slider (Integer) */}
          <Typography sx={{ mt: 2 }}>myParam Range: {myParamRange[0]} - {myParamRange[1]}</Typography>
          <Slider
            value={myParamRange}
            onChange={(_, newValue) => setMyParamRange(newValue as number[])}
            valueLabelDisplay="auto"
            step={1}
            min={0}
            max={20}
          />

          {/* float Slider (Float) */}
          <Typography sx={{ mt: 2 }}>float Range: {floatRange[0]} - {floatRange[1]}</Typography>
          <Slider
            value={floatRange}
            onChange={(_, newValue) => setFloatRange(newValue as number[])}
            valueLabelDisplay="auto"
            step={0.1}
            min={0.0}
            max={2.0}
          />

          <Box sx={{ mt: 2 }}>
            <Button onClick={handleBack}>Back</Button>
            <Button variant="contained" onClick={handleNext}>Next</Button>
          </Box>
        </Box>
      )}

      {/* Step 3: Preview Table & Submit */}
      {activeStep === 2 && (
        <Box sx={{ mt: 4 }}>
          <Typography variant="h6">Step 3: Preview Data</Typography>

          {/* Data Table */}
          <Table sx={{ mt: 2 }}>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>myParam</TableCell>
                <TableCell>float</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {generatedData.map((row, index) => (
                <TableRow key={index}>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.myParam}</TableCell>
                  <TableCell>{row.float}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <Box sx={{ mt: 2 }}>
            <Button onClick={handleBack}>Back</Button>
            <Button variant="contained" color="success" onClick={handleSubmit}>
              Submit
            </Button>
          </Box>
        </Box>
      )}
    </Box>
  );
}
