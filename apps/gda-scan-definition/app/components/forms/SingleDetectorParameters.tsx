import { Check } from "@mui/icons-material";
import { Accordion, AccordionDetails, AccordionSummary, Checkbox } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import React from "react";

type SingleDetectorParametersProps = {
  index: number;
  config: {
    description: string;
    useDetectorInScan: boolean;
    useScriptCommand: boolean;
    useConfigFile: boolean;
    detectorName?: string | undefined;
    configFileName?: string | undefined;
    scriptCommand?: string | undefined;
    alwaysUseDetectorInScan?: boolean | undefined;
    extraDetectorName?: string | undefined;
  };
  handleUpdateConfiguration: (index: any, key: any, value: any) => void;
  handleRemoveConfiguration: (index: any) => void;
};

export function SingleDetectorParameters({ index, config, handleUpdateConfiguration, handleRemoveConfiguration }: SingleDetectorParametersProps): React.JSX.Element {

  return <Accordion

    key={index}
    sx={{
      marginBottom: "1rem",
      border: "1px solid #ccc",
      padding: "0.5rem",
      display: "flex",
      flexDirection: "column",
      gap: "1rem",
      minWidth: 'fit-content'
    }}
  >
    <AccordionSummary>
      <InputLabel>
        Detector Name:
        <Input
          type="text"
          placeholder="Detector Name"
          value={config.detectorName || ""}
          onChange={(e) => handleUpdateConfiguration(
            index,
            "detectorName",
            e.target.value
          )} />
      </InputLabel>

    </AccordionSummary>
    <AccordionDetails sx={{ minWidth: 'fit-content' }}>

      <InputLabel>
        Description:
        <Input
          type="text"
          placeholder="Description"
          value={config.description}
          onChange={(e) => handleUpdateConfiguration(
            index,
            "description",
            e.target.value
          )}
          required />
      </InputLabel>

      <InputLabel sx={{ minWidth: '1rem' }}>
        Config File Name:
        <Input
          type="text"
          placeholder="Config File Name"
          value={config.configFileName || ""}
          onChange={(e) => handleUpdateConfiguration(
            index,
            "configFileName",
            e.target.value
          )} />
      </InputLabel>

      <InputLabel>
        Script Command:
        <Input
          type="text"
          placeholder="Script Command"
          value={config.scriptCommand || ""}
          onChange={(e) => handleUpdateConfiguration(
            index,
            "scriptCommand",
            e.target.value
          )} />
      </InputLabel>

      <InputLabel>
        Use Detector In Scan:
        <Checkbox
          checked={config.useDetectorInScan}
          onChange={(e) => handleUpdateConfiguration(
            index,
            "useDetectorInScan",
            e.target.checked
          )} />
      </InputLabel>

      <InputLabel>
        Use Script Command:
        <Checkbox
          checked={config.useScriptCommand}
          onChange={(e) => handleUpdateConfiguration(
            index,
            "useScriptCommand",
            e.target.checked
          )} />
      </InputLabel>

      <InputLabel>
        Use Config File:
        <Checkbox
          checked={config.useConfigFile}
          onChange={(e) => handleUpdateConfiguration(
            index,
            "useConfigFile",
            e.target.checked
          )} />
      </InputLabel>

      <InputLabel>
        Always Use Detector In Scan:
        <Checkbox
          checked={config.alwaysUseDetectorInScan || false}
          onChange={(e) => handleUpdateConfiguration(
            index,
            "alwaysUseDetectorInScan",
            e.target.checked
          )} />
      </InputLabel>

      <InputLabel>
        Extra Detector Name:
        <Input
          type="text"
          placeholder="Extra Detector Name"
          value={config.extraDetectorName || ""}
          onChange={(e) => handleUpdateConfiguration(
            index,
            "extraDetectorName",
            e.target.value
          )} />
      </InputLabel>

      <Button
        type="button"
        onClick={() => handleRemoveConfiguration(index)}
      >
        Remove Configuration
      </Button>

    </AccordionDetails>
  </Accordion>
}
