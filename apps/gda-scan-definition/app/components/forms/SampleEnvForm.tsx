import React from "react";
import { Typography, InputLabel, Input } from "@mui/material";

interface Props {
    title: string;
    formData: Record<string, any>; // Generic object for any structure
    onUpdate: (keyPath: string[], value: any) => void;
}

const StageForm: React.FC<Props> = ({ title, formData, onUpdate }) => {
    return (
        <div>
            <Typography variant="h5" sx={{ color: "black", marginBottom: 2 }}>
                {title}
            </Typography>
            {Object.entries(formData).map(([key, value]) => (
                <InputLabel key={key}>
                    {key}:
                    <Input
                        type={typeof value === "boolean" ? "checkbox" : "number"}
                        checked={typeof value === "boolean" ? value : undefined}
                        value={typeof value === "boolean" ? undefined : value}
                        onChange={(e) =>
                            onUpdate(
                                [title.toLowerCase().replace(/\s/g, ""), key],
                                typeof value === "boolean"
                                    ? e.target.checked
                                    : parseFloat(e.target.value)
                            )
                        }
                    />
                </InputLabel>
            ))}
        </div>
    );
};

export default StageForm;
