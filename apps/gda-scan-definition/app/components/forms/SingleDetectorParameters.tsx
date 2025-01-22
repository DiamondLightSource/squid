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
  return <div
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
        onChange={(e) => handleUpdateConfiguration(
          index,
          "description",
          e.target.value
        )}
        required />
    </label>

    <label>
      Detector Name:
      <input
        type="text"
        placeholder="Detector Name"
        value={config.detectorName || ""}
        onChange={(e) => handleUpdateConfiguration(
          index,
          "detectorName",
          e.target.value
        )} />
    </label>

    <label>
      Config File Name:
      <input
        type="text"
        placeholder="Config File Name"
        value={config.configFileName || ""}
        onChange={(e) => handleUpdateConfiguration(
          index,
          "configFileName",
          e.target.value
        )} />
    </label>

    <label>
      Script Command:
      <input
        type="text"
        placeholder="Script Command"
        value={config.scriptCommand || ""}
        onChange={(e) => handleUpdateConfiguration(
          index,
          "scriptCommand",
          e.target.value
        )} />
    </label>

    <label>
      Use Detector In Scan:
      <input
        type="checkbox"
        checked={config.useDetectorInScan}
        onChange={(e) => handleUpdateConfiguration(
          index,
          "useDetectorInScan",
          e.target.checked
        )} />
    </label>

    <label>
      Use Script Command:
      <input
        type="checkbox"
        checked={config.useScriptCommand}
        onChange={(e) => handleUpdateConfiguration(
          index,
          "useScriptCommand",
          e.target.checked
        )} />
    </label>

    <label>
      Use Config File:
      <input
        type="checkbox"
        checked={config.useConfigFile}
        onChange={(e) => handleUpdateConfiguration(
          index,
          "useConfigFile",
          e.target.checked
        )} />
    </label>

    <label>
      Always Use Detector In Scan:
      <input
        type="checkbox"
        checked={config.alwaysUseDetectorInScan || false}
        onChange={(e) => handleUpdateConfiguration(
          index,
          "alwaysUseDetectorInScan",
          e.target.checked
        )} />
    </label>

    <label>
      Extra Detector Name:
      <input
        type="text"
        placeholder="Extra Detector Name"
        value={config.extraDetectorName || ""}
        onChange={(e) => handleUpdateConfiguration(
          index,
          "extraDetectorName",
          e.target.value
        )} />
    </label>

    <button
      type="button"
      onClick={() => handleRemoveConfiguration(index)}
    >
      Remove Configuration
    </button>
  </div>;
}
