"use client";
import { Box, Button, Input, InputLabel, Typography } from "@mui/material";
import React, { useState } from "react";
import { z } from "zod";
import {
  motorPositionSchema,
  sampleParametersSchema,
} from "../../schemas/qexafs";
import { updateSampleParameters } from "../../actions/qexafs-actions";

export const initialMotorPosition: MotorPosition = {
  scannableName: "",
  description: "",
  doMove: false,
  demandPosition: 0,
};

const initialFormData: SampleParametersSchema = {
  shouldValidate: false,
  name: "",
  description1: "",
  description2: "",
  stage: "",
  temperaturecontrol: "",
  xythetastage: { x: 0, y: 0, theta: 0 },
  ln2cryostage: {
    height: 0,
    angle: 0,
    calibAngle: 0,
    calibHeight: 0,
    sampleNumberA: 0,
    sampleNumberB: 0,
    cylinderType: "",
    manual: false,
    editCalibration: false,
  },
  sxcryostage: {
    height: 0,
    rot: 0,
    calibHeight: 0,
    sampleNumber: 0,
    manual: false,
  },
  pulsetubecryostat: {
    temperature1: 0,
    temperature2: 0,
    pressure: 0,
    setPoint: 0,
    tolerance: 0,
    time: 0,
    controlFlag: false,
  },
  furnace: {
    temperature: 0,
    tolerance: 0,
    time: 0,
    controlFlag: false,
  },
  lakeshore: {
    temp0: 0,
    temp1: 0,
    temp2: 0,
    temp3: 0,
    tempSelect0: false,
    tempSelect1: false,
    tempSelect2: false,
    tempSelect3: false,
    setPointSet: 0,
    tolerance: 0,
    time: 0,
    controlFlag: false,
  },
  samplewheel: {
    demand: 0,
    filter: "",
    manual: false,
    wheelEnabled: false,
  },
  userstage: {
    axis2: 0,
    axis4: 0,
    axis5: 0,
    axis6: 0,
    axis7: 0,
    axis8: 0,
  },
  sampleParameterMotorPosition: [initialMotorPosition],
};

type MotorPosition = z.infer<typeof motorPositionSchema>;
type SampleParametersSchema = z.infer<typeof sampleParametersSchema>;

const SampleParametersForm = () => {
  const [formData, setFormData] =
    useState<SampleParametersSchema>(initialFormData);

  const handleSubmit = async (e: React.SyntheticEvent) => {
    console.log(formData);

    e.preventDefault();
    try {
      const validated: SampleParametersSchema =
        sampleParametersSchema.parse(formData);

      // Connect to the backend here
      const result = await updateSampleParameters(validated);
      if (result && result.data) {
        const { success, parameters } = result.data;
        console.log(success, parameters);
        if (success) {
          setFormData(initialFormData);
        }
      }
    } catch (err) {
      if (err instanceof z.ZodError) {
        alert(
          "Validation error: " + err.errors.map((e) => e.message).join("\n")
        );
      } else {
        alert("An unexpected error occurred");
      }
    }
  };

  const handleUpdateField = (path: any[], value: string | number | boolean) => {
    setFormData((prev) => {
      const updated = { ...prev };
      path.reduce((obj: { [x: string]: any; }, key: string | number, idx: number) => {
        if (idx === path.length - 1) obj[key] = value;
        return obj[key];
      }, updated);
      return updated;
    });
  };

  const addMotorPosition = () => {
    setFormData({
      ...formData,
      sampleParameterMotorPosition: [
        ...formData.sampleParameterMotorPosition,
        { ...initialMotorPosition },
      ],
    });
  };

  const removeMotorPosition = (index: number) => {
    setFormData({
      ...formData,
      sampleParameterMotorPosition:
        formData.sampleParameterMotorPosition.filter((_, idx) => idx !== index),
    });
  };

  const handleMotorPositionChange = (index: number, field: string, value: string | number | boolean) => {
    const updatedMotors = [...formData.sampleParameterMotorPosition];
    // TODO fix indexing
    // updatedMotors[index][field] = value;
    setFormData({
      ...formData,
      sampleParameterMotorPosition: updatedMotors,
    });
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        alert("form handling disabled temporarily")
        // handleSubmit(formData);
      }}
      style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
    >
      <Typography variant="h6">Sample Parameters</Typography>
      <InputLabel>
        Validate:
        <Input
          type="checkbox"
          checked={formData.shouldValidate}
          onChange={(e) =>
            handleUpdateField(["shouldValidate"], e.target.checked)
          }
        />
      </InputLabel>
      <InputLabel>
        Name:
        <Input
          type="text"
          value={formData.name}
          onChange={(e) => handleUpdateField(["name"], e.target.value)}
          required
        />
      </InputLabel>
      <InputLabel>
        Description 1:
        <Input
          type="text"
          value={formData.description1}
          onChange={(e) => handleUpdateField(["description1"], e.target.value)}
          required
        />
      </InputLabel>
      <InputLabel>
        Description 2:
        <Input
          type="text"
          value={formData.description2}
          onChange={(e) => handleUpdateField(["description2"], e.target.value)}
          required
        />
      </InputLabel>
      <InputLabel>
        Stage:
        <Input
          type="text"
          value={formData.stage}
          onChange={(e) => handleUpdateField(["stage"], e.target.value)}
          required
        />
      </InputLabel>
      <InputLabel>
        Temperature Control:
        <Input
          type="text"
          value={formData.temperaturecontrol}
          onChange={(e) =>
            handleUpdateField(["temperaturecontrol"], e.target.value)
          }
          required
        />
      </InputLabel>

      <h3>XY Theta Stage</h3>
      <InputLabel>
        X:
        <Input
          type="number"
          value={formData.xythetastage.x}
          onChange={(e) =>
            handleUpdateField(["xythetastage", "x"], parseFloat(e.target.value))
          }
        />
      </InputLabel>
      <InputLabel>
        Y:
        <Input
          type="number"
          value={formData.xythetastage.y}
          onChange={(e) =>
            handleUpdateField(["xythetastage", "y"], parseFloat(e.target.value))
          }
        />
      </InputLabel>
      <InputLabel>
        Theta:
        <Input
          type="number"
          value={formData.xythetastage.theta}
          onChange={(e) =>
            handleUpdateField(
              ["xythetastage", "theta"],
              parseFloat(e.target.value)
            )
          }
        />
      </InputLabel>

      {/* Repeat similar structures for other stage schemas like ln2cryostage, furnace, etc. */}

      <Typography variant="h3">Motor Positions</Typography>
      {formData.sampleParameterMotorPosition.map((motor, index) => (
        <Box
          key={index}
          xx={{
            border: "1px solid #ccc",
            marginBottom: "1rem",
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
          }}
        >
          <InputLabel>
            Scannable Name:
            <Input
              type="text"
              value={motor.scannableName}
              onChange={(e) =>
                handleMotorPositionChange(
                  index,
                  "scannableName",
                  e.target.value
                )
              }
            />
          </InputLabel>
          <InputLabel>
            Description:
            <Input
              type="text"
              value={motor.description}
              onChange={(e) =>
                handleMotorPositionChange(index, "description", e.target.value)
              }
            />
          </InputLabel>
          <InputLabel>
            Do Move:
            <Input
              type="checkbox"
              checked={motor.doMove}
              onChange={(e) =>
                handleMotorPositionChange(index, "doMove", e.target.checked)
              }
            />
          </InputLabel>
          <InputLabel>
            Demand Position:
            <Input
              type="number"
              value={motor.demandPosition}
              onChange={(e) =>
                handleMotorPositionChange(
                  index,
                  "demandPosition",
                  parseFloat(e.target.value)
                )
              }
            />
          </InputLabel>
          <Button type="button" onClick={() => removeMotorPosition(index)}>
            Remove
          </Button>
        </Box>
      ))}
      <Button type="button" onClick={addMotorPosition}>
        Add Motor Position
      </Button >

      <Button type="submit">Submit</Button >
    </form>
  );
};

export default SampleParametersForm;
