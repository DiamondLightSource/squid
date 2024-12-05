import Typography from "@mui/material/Typography";
import React, { useEffect, useState } from "react";
import { z } from "zod";
import { detectorConfigurationSchema, detectorParametersSchema } from "../../schemas/qexafs";
import { updateDetectorParameters } from "../../actions/qexafs-actions";
import { useIDEState } from "../ideState";
import { basePath } from "../../actions/basePath";
import { create } from "xmlbuilder2";

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

type DetectorConfiguration = z.infer<typeof detectorConfigurationSchema>;
type DetectorsSchema = z.infer<typeof detectorParametersSchema>;

const defaultFormData: DetectorsSchema = {
    shouldValidate: false,
    detectorConfiguration: [
        defaultDetectorConfig,
    ],
};
const filePath = `${basePath}/Detector_Parameters.xml`;

const DetectorParametersForm = () => {
    const { fileCache } = useIDEState();



    // todo use the parsed data from the backend instead
    const [formData, setFormData] = useState<DetectorsSchema>(defaultFormData);

    const handleSubmit = async (e: React.SyntheticEvent) => {
        console.log(formData);

        e.preventDefault();
        try {
            const validated: DetectorsSchema = detectorParametersSchema.parse(formData);

            // Connect to the backend here
            const { success, parameters } = await updateDetectorParameters(validated);
            console.log(success, parameters);
            if (success) {
                setFormData(defaultFormData);
            }

        } catch (err) {
            if (err instanceof z.ZodError) {
                alert("Validation error: " + err.errors.map((e) => e.message).join("\n"));
            } else {
                alert("An unexpected error occurred");
            }
        }
    };

    if (fileCache[filePath] === undefined) {
        return <div>Loading..., try refreshing the file tree</div>;
    }
    const fileContent: string = fileCache[filePath];
    // todo parse the xml content into json

    const parsed = create(fileContent).end({ format: "object" });
    console.log(`parsed: ${JSON.stringify(parsed)}`);
    const validationResult = detectorParametersSchema.safeParse(parsed["DetectorParameters"]);
    console.log(`validated: ${JSON.stringify(validationResult)}`);
    if (!validationResult.success) {
        console.error("Validation error:", validationResult.error.errors);
        return <div>Validation error, please check the console for details</div>;
    }

    useEffect(() => {
        setFormData(validationResult.data);
        // setFormData(parsed);
    }, [])

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

    return (
        <form
            onSubmit={(e) => {
                e.preventDefault();
                handleSubmit(formData);
            }}
        >
            <Typography variant="h6">Detector Parameters</Typography>
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

            <h3>Detector Configurations</h3>
            {formData.detectorConfiguration.map((config, index) => (
                <div key={index} style={{ marginBottom: "1rem", border: "1px solid #ccc", padding: "1rem" }}>
                    <label>
                        Description:
                        <input
                            type="text"
                            placeholder="Description"
                            value={config.description}
                            onChange={(e) =>
                                handleUpdateConfiguration(index, "description", e.target.value)
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
                                handleUpdateConfiguration(index, "detectorName", e.target.value)
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
                                handleUpdateConfiguration(index, "configFileName", e.target.value)
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
                                handleUpdateConfiguration(index, "scriptCommand", e.target.value)
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
    );
};

export default DetectorParametersForm;

