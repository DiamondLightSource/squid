import Typography from "@mui/material/Typography";
import React, { useEffect, useState } from "react";
import { z } from "zod";
import { updateDetectorParameters } from "../../actions/qexafs-actions";
import {
  detectorConfigurationSchema,
  detectorParametersSchema,
} from "../../schemas/qexafs";
import { DiffEditor } from "@monaco-editor/react";
import { XMLBuilder, XMLParser } from "fast-xml-parser";

const builder = new XMLBuilder();
const defaultDetectorConfig: DetectorConfiguration = {
  description: "",
  detectorName: "",
  configFileName: "",
  scriptCommand: "",
  useDetectorInScan: false,
  useScriptCommand: false,
  useConfigFile: false,
  alwaysUseDetectorInScan: false,
  extraDetectorName: "",
};

export type DetectorConfiguration = z.infer<typeof detectorConfigurationSchema>;
export type DetectorsSchema = z.infer<typeof detectorParametersSchema>;

const defaultFormData: DetectorsSchema = {
  shouldValidate: false,
  detectorConfiguration: [defaultDetectorConfig],
};

type DetectorParametersFormProps = {
  overrideDefaultValue?: DetectorsSchema;
  submitCallback?: (data: DetectorsSchema) => void;
};

function DetectorParametersForm({
  overrideDefaultValue,
  submitCallback,
}: DetectorParametersFormProps) {
  const initialData = overrideDefaultValue || defaultFormData;

  const [formData, setFormData] = useState<DetectorsSchema>(initialData);

  console.log(`Form data: ${JSON.stringify(formData)}`);
  const handleSubmit = async (e: React.SyntheticEvent) => {
    console.log(formData);

    e.preventDefault();
    if (formData !== undefined && submitCallback !== undefined) {
      submitCallback(formData);
    }
    // try {
    //   const validated: DetectorsSchema =
    //     detectorParametersSchema.parse(formData);
    //   console.log(validated);
    //   console.log(JSON.stringify(validated));
    //   console.log(formData);

    //   // Connect to the backend here
    //   const { success, parameters } = await updateDetectorParameters(validated);
    //   console.log(success, parameters);
    //   if (success) {
    //     setFormData(defaultFormData);
    //   }
    // } catch (err) {
    //   if (err instanceof z.ZodError) {
    //     alert(
    //       "Validation error: " + err.errors.map((e) => e.message).join("\n")
    //     );
    //   } else {
    //     alert("An unexpected error occurred");
    //   }
    // }
  };

  const handleAddConfiguration = () => {
    setFormData({
      ...formData,
      detectorConfiguration: [
        ...formData.detectorConfiguration,
        defaultDetectorConfig,
      ],
    });
  };

  const handleRemoveConfiguration = (index) => {
    const updatedConfigurations = formData.detectorConfiguration.filter(
      (_, i) => i !== index
    );
    setFormData({ ...formData, detectorConfiguration: updatedConfigurations });
  };

  const handleUpdateConfiguration = (index, key, value) => {
    const updatedConfigurations = formData.detectorConfiguration.map(
      (config, i) => (i === index ? { ...config, [key]: value } : config)
    );
    setFormData({ ...formData, detectorConfiguration: updatedConfigurations });
  };

  // Sync formData with overrideDefaultValue when the prop changes
  useEffect(() => {
    if (overrideDefaultValue) {
      setFormData(overrideDefaultValue);
    }
  }, [overrideDefaultValue]);

  return (
    <div>
      <form
        onSubmit={(e) => handleSubmit(e)}
        style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
      >
        <Typography variant="h6">Detector Parameters</Typography>
        <label>
          Validate:
          <input
            type="checkbox"
            value={formData.shouldValidate.toString()}
            checked={formData.shouldValidate}
            onChange={(e) =>
              setFormData({ ...formData, shouldValidate: e.target.checked })
            }
          />
        </label>

        <h3>Detector Configurations</h3>
        {formData.detectorConfiguration.map((config, index) => (
          <div
            key={index}
            style={{
              marginBottom: "1rem",
              border: "1px solid #ccc",
              padding: "1rem",
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
            }}
          >
            <label>
              Description:
              <input
                type="text"
                placeholder="Description"
                value={config.description}
                onChange={(e) =>
                  handleUpdateConfiguration(
                    index,
                    "description",
                    e.target.value
                  )
                }
                required
              />
            </label>

            <label>
              Detector Name:
              <input
                type="text"
                placeholder="Detector Name"
                value={config.detectorName || ""}
                onChange={(e) =>
                  handleUpdateConfiguration(
                    index,
                    "detectorName",
                    e.target.value
                  )
                }
              />
            </label>

            <label>
              Config File Name:
              <input
                type="text"
                placeholder="Config File Name"
                value={config.configFileName || ""}
                onChange={(e) =>
                  handleUpdateConfiguration(
                    index,
                    "configFileName",
                    e.target.value
                  )
                }
              />
            </label>

            <label>
              Script Command:
              <input
                type="text"
                placeholder="Script Command"
                value={config.scriptCommand || ""}
                onChange={(e) =>
                  handleUpdateConfiguration(
                    index,
                    "scriptCommand",
                    e.target.value
                  )
                }
              />
            </label>

            <label>
              Use Detector In Scan:
              <input
                type="checkbox"
                checked={config.useDetectorInScan}
                onChange={(e) =>
                  handleUpdateConfiguration(
                    index,
                    "useDetectorInScan",
                    e.target.checked
                  )
                }
              />
            </label>

            <label>
              Use Script Command:
              <input
                type="checkbox"
                checked={config.useScriptCommand}
                onChange={(e) =>
                  handleUpdateConfiguration(
                    index,
                    "useScriptCommand",
                    e.target.checked
                  )
                }
              />
            </label>

            <label>
              Use Config File:
              <input
                type="checkbox"
                checked={config.useConfigFile}
                onChange={(e) =>
                  handleUpdateConfiguration(
                    index,
                    "useConfigFile",
                    e.target.checked
                  )
                }
              />
            </label>

            <label>
              Always Use Detector In Scan:
              <input
                type="checkbox"
                checked={config.alwaysUseDetectorInScan || false}
                onChange={(e) =>
                  handleUpdateConfiguration(
                    index,
                    "alwaysUseDetectorInScan",
                    e.target.checked
                  )
                }
              />
            </label>

            <label>
              Extra Detector Name:
              <input
                type="text"
                placeholder="Extra Detector Name"
                value={config.extraDetectorName || ""}
                onChange={(e) =>
                  handleUpdateConfiguration(
                    index,
                    "extraDetectorName",
                    e.target.value
                  )
                }
              />
            </label>

            <button
              type="button"
              onClick={() => handleRemoveConfiguration(index)}
            >
              Remove Configuration
            </button>
          </div>
        ))}

        <button type="button" onClick={handleAddConfiguration}>
          Add Configuration
        </button>
        <button type="submit">Submit</button>
      </form>
      <DiffEditor
        original={builder.build(initialData)}
        width="70vw"
        height="70vh"
        language="xml"
        modified={builder.build(formData)}
      />
    </div>
  );
}

export default DetectorParametersForm;
