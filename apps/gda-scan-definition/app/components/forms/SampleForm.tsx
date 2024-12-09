import { Typography } from "@mui/material";
import React, { useState } from "react";
import { z } from "zod";
import {
  motorPositionSchema,
  sampleParametersSchema,
} from "../../schemas/qexafs";
import { updateSampleParameters } from "../../actions/qexafs-actions";

const initialMotorPosition: MotorPosition = {
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
      const { success, parameters } = await updateSampleParameters(validated);
      console.log(success, parameters);
      if (success) {
        setFormData(initialFormData);
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

  const handleUpdateField = (path, value) => {
    setFormData((prev) => {
      const updated = { ...prev };
      path.reduce((obj, key, idx) => {
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

  const removeMotorPosition = (index) => {
    setFormData({
      ...formData,
      sampleParameterMotorPosition:
        formData.sampleParameterMotorPosition.filter((_, idx) => idx !== index),
    });
  };

  const handleMotorPositionChange = (index, field, value) => {
    const updatedMotors = [...formData.sampleParameterMotorPosition];
    updatedMotors[index][field] = value;
    setFormData({
      ...formData,
      sampleParameterMotorPosition: updatedMotors,
    });
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit(formData);
      }}
      style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
    >
      <Typography variant="h6">Sample Parameters</Typography>
      <label>
        Validate:
        <input
          type="checkbox"
          checked={formData.shouldValidate}
          onChange={(e) =>
            handleUpdateField(["shouldValidate"], e.target.checked)
          }
        />
      </label>
      <label>
        Name:
        <input
          type="text"
          value={formData.name}
          onChange={(e) => handleUpdateField(["name"], e.target.value)}
          required
        />
      </label>
      <label>
        Description 1:
        <input
          type="text"
          value={formData.description1}
          onChange={(e) => handleUpdateField(["description1"], e.target.value)}
          required
        />
      </label>
      <label>
        Description 2:
        <input
          type="text"
          value={formData.description2}
          onChange={(e) => handleUpdateField(["description2"], e.target.value)}
          required
        />
      </label>
      <label>
        Stage:
        <input
          type="text"
          value={formData.stage}
          onChange={(e) => handleUpdateField(["stage"], e.target.value)}
          required
        />
      </label>
      <label>
        Temperature Control:
        <input
          type="text"
          value={formData.temperaturecontrol}
          onChange={(e) =>
            handleUpdateField(["temperaturecontrol"], e.target.value)
          }
          required
        />
      </label>

      <h3>XY Theta Stage</h3>
      <label>
        X:
        <input
          type="number"
          value={formData.xythetastage.x}
          onChange={(e) =>
            handleUpdateField(["xythetastage", "x"], parseFloat(e.target.value))
          }
        />
      </label>
      <label>
        Y:
        <input
          type="number"
          value={formData.xythetastage.y}
          onChange={(e) =>
            handleUpdateField(["xythetastage", "y"], parseFloat(e.target.value))
          }
        />
      </label>
      <label>
        Theta:
        <input
          type="number"
          value={formData.xythetastage.theta}
          onChange={(e) =>
            handleUpdateField(
              ["xythetastage", "theta"],
              parseFloat(e.target.value)
            )
          }
        />
      </label>

      {/* Repeat similar structures for other stage schemas like ln2cryostage, furnace, etc. */}

      <h3>Motor Positions</h3>
      {formData.sampleParameterMotorPosition.map((motor, index) => (
        <div
          key={index}
          style={{ border: "1px solid #ccc", marginBottom: "1rem" }}
        >
          <label>
            Scannable Name:
            <input
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
          </label>
          <label>
            Description:
            <input
              type="text"
              value={motor.description}
              onChange={(e) =>
                handleMotorPositionChange(index, "description", e.target.value)
              }
            />
          </label>
          <label>
            Do Move:
            <input
              type="checkbox"
              checked={motor.doMove}
              onChange={(e) =>
                handleMotorPositionChange(index, "doMove", e.target.checked)
              }
            />
          </label>
          <label>
            Demand Position:
            <input
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
          </label>
          <button type="button" onClick={() => removeMotorPosition(index)}>
            Remove
          </button>
        </div>
      ))}
      <button type="button" onClick={addMotorPosition}>
        Add Motor Position
      </button>

      <button type="submit">Submit</button>
    </form>
  );
};

export default SampleParametersForm;
