// useSendRois.ts
import { useState } from "react";
import { Roi } from "../../schemas/roiSchemas";

export function useSendRois(apiUrl: string) {
    const [isLoading, setLoading] = useState(false);
    const [error, setError] = useState<null | string>(null);
    const [success, setSuccess] = useState(false);

    const sendRois = async (rois: Roi[]) => {
        setLoading(true);
        setError(null);
        setSuccess(false);

        try {
            const response = await fetch(apiUrl, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ rois }),
            });

            if (!response.ok) {
                throw new Error(`HTTP ${response.status}`);
            }

            setSuccess(true);
        } catch (err: any) {
            setError(err.message || "Failed to send ROIs");
        } finally {
            setLoading(false);
        }
    };

    return { sendRois, isLoading, error, success };
}
