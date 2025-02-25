import { DiffEditor } from "@monaco-editor/react";
import { Button, Grid, Input, InputLabel } from "@mui/material";
import Typography from "@mui/material/Typography";
import { XMLBuilder } from "fast-xml-parser";
import React, { useEffect, useState } from "react";
import {
  DetectorConfiguration, DetectorsSchema
} from "../../schemas/qexafs";
import { SingleDetectorParameters } from "./SingleDetectorParameters";
import { CheckBox } from "@mui/icons-material";

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

export type DetectorParametersFormProps = {
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

  const handleRemoveConfiguration = (index: number) => {
    const updatedConfigurations = formData.detectorConfiguration.filter(
      (_, i) => i !== index
    );
    setFormData({ ...formData, detectorConfiguration: updatedConfigurations });
  };

  const handleUpdateConfiguration = (index: number, key: any, value: any) => {
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
    <Grid container sx={{
      color: 'black',
      flexDirection: "column", gap: "0.125rem"

    }}>
      <Grid item xs={8}>

        <div style={{ width: '100%', backgroundColor: 'red', height: '100%' }}>

          <p> test</p>
        </div>
        <form
          onSubmit={(e) => handleSubmit(e)}
        >
          {/* <Typography variant="h5">Detector Parameters</Typography>
          <InputLabel>
            Validate:
            <CheckBox
              checked={formData.shouldValidate}
              onChange={(e) =>
                setFormData({ ...formData, shouldValidate: !formData.shouldValidate })
              }
            />
          </InputLabel> */}
          <Button type="submit">Submit</Button>
          <Typography variant="h6">Detector Configurations</Typography>
          <Button type="button" onClick={handleAddConfiguration}>
            Add Configuration
          </Button>
          <div style={{ width: '100%', backgroundColor: 'red', height: '100%' }}>

            <p> test</p>
          </div>
          {/* <Grid container>

            {formData.detectorConfiguration.map((config, index) => (
              <Grid item xs={4}>
                <SingleDetectorParameters
                  index={index}
                  config={config}
                  handleUpdateConfiguration={handleUpdateConfiguration}
                  handleRemoveConfiguration={handleRemoveConfiguration}
                />
              </Grid>
            ))}
          </Grid> */}


        </form>
      </Grid>
      {/* <Grid item xs={8}>
        <DiffEditor
          original={builder.build(initialData)}
          width="70vw"
          height="70vh"
          language="html"
          modified={builder.build(formData)}
        />
      </Grid> */}
    </Grid>
  );
}

export default DetectorParametersForm;
