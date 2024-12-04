"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { allowedEdges, allowedElements, qexafsParametersSchema } from "../../schemas/qexafs";
import { Typography } from "@mui/material";
import { useState } from "react";
import { updateQexafsParameters } from "../../actions/qexafs-actions";


const defaultData: ParamsSchema = {
  element: "",
  edge: "",
  edgeEnergy: 0,
  initialEnergy: 0,
  finalEnergy: 0,
  speedMDegPerSecond: 0,
  stepSize: 0
};

type ParamsSchema = z.infer<typeof qexafsParametersSchema>;

export function ParamsForm() {
  const [formData, setFormData] = useState<ParamsSchema>(defaultData);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const validated: ParamsSchema = qexafsParametersSchema.parse(formData);

      const { success, parameters } = await updateQexafsParameters(validated);

      console.log(success, parameters);

      if (success) {
        setFormData(defaultData); // Reset form
      }
    } catch (err) {
      if (err instanceof z.ZodError) {
        alert("Validation error: " + err.errors.map((e) => e.message).join("\n"));
      } else {
        alert("An unexpected error occurred");
      }
    }
  };

  return (

    <form onSubmit={handleSubmit}>
      <Typography variant="h6">QEXAFS Parameters</Typography>
      <label>
        Element:
        <select
          value={formData.element}
          onChange={(e) => setFormData({ ...formData, element: e.target.value })}
        >
          {allowedElements.map((element) => (
            <option key={element} value={element}>
              {element}
            </option>
          ))}
        </select>
      </label>

      <label>
        Edge:
        <select
          value={formData.edge}
          onChange={(e) => setFormData({ ...formData, edge: e.target.value })}
        >
          {allowedEdges.map((edge) => (
            <option key={edge} value={edge}>
              {edge}
            </option>
          ))}
        </select>
      </label>

      <label>
        Edge Energy (eV):
        <input
          type="number"
          placeholder="Edge Energy"
          value={formData.edgeEnergy}
          onChange={(e) =>
            setFormData({ ...formData, edgeEnergy: parseInt(e.target.value) })
          }
        />
      </label>

      <label>
        Initial Energy (eV):
        <input
          type="number"
          placeholder="Initial Energy"
          value={formData.initialEnergy}
          onChange={(e) =>
            setFormData({ ...formData, initialEnergy: parseInt(e.target.value) })
          }
        />
      </label>

      <label>
        Final Energy (eV):
        <input
          type="number"
          placeholder="Final Energy"
          value={formData.finalEnergy}
          onChange={(e) =>
            setFormData({ ...formData, finalEnergy: parseInt(e.target.value) })
          }
        />
      </label>

      <label>
        Speed (mDeg/s):
        <input
          type="number"
          placeholder="Speed (mDeg/s)"
          value={formData.speedMDegPerSecond}
          step="0.1"
          min="0.1"
          max="85100"
          onChange={(e) =>
            setFormData({
              ...formData,
              speedMDegPerSecond: parseFloat(e.target.value),
            })
          }
        />
      </label>

      <label>
        Step Size:
        <input
          type="number"
          placeholder="Step Size"
          value={formData.stepSize}
          onChange={(e) =>
            setFormData({ ...formData, stepSize: parseInt(e.target.value) })
          }
        />
      </label>

      <button type="submit">Submit</button>
    </form>
  );
}
