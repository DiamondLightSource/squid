import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  outputParametersSchema,
  qexafsParametersSchema,
} from "../../schemas/qexafs";
import { Typography } from "@mui/material";


import React, { useState } from "react";
import { updateOutputParameters } from "../../actions/qexafs-actions";

const defaultOutputParams = {
  shouldValidate: false,
  asciiFileName: "",
  asciiDirectory: "",
  nexusDirectory: "",
  extraData: false,
  signalActive: false,
  metadataActive: false,
  beforeScriptName: "",
  afterScriptName: "",
  beforeFirstRepetition: "",
};

type OutputsSchema = z.infer<typeof outputParametersSchema>;

export const OutputParametersForm = () => {
  const [formData, setFormData] = useState<OutputsSchema>(defaultOutputParams);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const validated: OutputsSchema = outputParametersSchema.parse(formData);

      const { success, parameters } = await updateOutputParameters(validated);

      console.log(success, parameters);

      if (success) {
        setFormData(defaultOutputParams); // Reset form
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
    <form onSubmit={handleSubmit} >
            <Typography variant="h6">Output Parameters</Typography>
      <label>
        Validate:
        <input
          type="checkbox"
          checked={formData.shouldValidate}
          onChange={(e) =>
            setFormData({ ...formData, shouldValidate: e.target.checked })
          }
        />
      </label>

      <label>
        ASCII File Name:
        <input
          type="text"
          placeholder="ASCII File Name"
          value={formData.asciiFileName}
          onChange={(e) =>
            setFormData({ ...formData, asciiFileName: e.target.value })
          }
          required
        />
      </label>

      <label>
        ASCII Directory:
        <input
          type="text"
          placeholder="ASCII Directory"
          value={formData.asciiDirectory}
          onChange={(e) =>
            setFormData({ ...formData, asciiDirectory: e.target.value })
          }
          required
        />
      </label>

      <label>
        NeXus Directory:
        <input
          type="text"
          placeholder="NeXus Directory"
          value={formData.nexusDirectory}
          onChange={(e) =>
            setFormData({ ...formData, nexusDirectory: e.target.value })
          }
          required
        />
      </label>

      <label>
        Include Extra Data:
        <input
          type="checkbox"
          checked={formData.extraData}
          onChange={(e) =>
            setFormData({ ...formData, extraData: e.target.checked })
          }
        />
      </label>

      <label>
        Signal Active:
        <input
          type="checkbox"
          checked={formData.signalActive}
          onChange={(e) =>
            setFormData({ ...formData, signalActive: e.target.checked })
          }
        />
      </label>

      <label>
        Metadata Active:
        <input
          type="checkbox"
          checked={formData.metadataActive}
          onChange={(e) =>
            setFormData({ ...formData, metadataActive: e.target.checked })
          }
        />
      </label>

      <label>
        Before Script Name:
        <input
          type="text"
          placeholder="Before Script Name"
          value={formData.beforeScriptName}
          onChange={(e) =>
            setFormData({ ...formData, beforeScriptName: e.target.value })
          }
        />
      </label>

      <label>
        After Script Name:
        <input
          type="text"
          placeholder="After Script Name"
          value={formData.afterScriptName}
          onChange={(e) =>
            setFormData({ ...formData, afterScriptName: e.target.value })
          }
        />
      </label>

      <label>
        Before First Repetition:
        <input
          type="text"
          placeholder="Before First Repetition"
          value={formData.beforeFirstRepetition}
          onChange={(e) =>
            setFormData({ ...formData, beforeFirstRepetition: e.target.value })
          }
        />
      </label>

      <button type="submit">Submit</button>
    </form>
  );
};

export default OutputParametersForm;

