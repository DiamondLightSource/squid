import { DiffEditor } from "@monaco-editor/react";
import { Grid } from "@mui/material";
import Typography from "@mui/material/Typography";
import { XMLBuilder } from "fast-xml-parser";
import React, { useEffect, useState } from "react";
import {
  DetectorConfiguration, DetectorsSchema
} from "../../schemas/qexafs";
import { SingleDetectorParameters } from "./SingleDetectorParameters";

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
    <Grid container>
      <Grid item xs={4}>
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
          <Grid container>

            {formData.detectorConfiguration.map((config, index) => (
              <SingleDetectorParameters
                index={index}
                config={config}
                handleUpdateConfiguration={handleUpdateConfiguration}
                handleRemoveConfiguration={handleRemoveConfiguration}
              />
            ))}
          </Grid>

          <button type="button" onClick={handleAddConfiguration}>
            Add Configuration
          </button>
          <button type="submit">Submit</button>
        </form>
      </Grid>
      <Grid item xs={8}>
        <DiffEditor
          original={builder.build(initialData)}
          width="70vw"
          height="70vh"
          language="html"
          modified={builder.build(formData)}
        />
      </Grid>
    </Grid>
  );
}

export default DetectorParametersForm;
