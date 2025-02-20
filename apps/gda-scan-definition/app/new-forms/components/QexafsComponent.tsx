"use client"
import React from "react";
import { useQexafsState, useQexafsDispatch, startConfigRead, startConfigUpdate } from "./QexafsContextProvider";

const QexafsComponent = () => {
    const { config, isLoading, error } = useQexafsState();
    const dispatch = useQexafsDispatch();

    const handleReadConfig = async () => {
        await startConfigRead(dispatch);
    };

    const handleUpdateConfig = async () => {
        if (!config) {
            alert("No existing configuration to update!");
            return;
        }

        // Prepare an updated configuration (this is just a placeholder, modify as needed)
        const updatedConfig = {
            ...config,
            updatedField: "Updated Value",
        };

        await startConfigUpdate(dispatch, updatedConfig);
    };

    return (
        <div>
            <h1>QEXAFS Configuration</h1>

            {isLoading && <p>Loading...</p>}
            {error && <p style={{ color: "red" }}>Error: {error}</p>}

            {config ? (
                <pre>{JSON.stringify(config, null, 2)}</pre>
            ) : (
                <p>No configuration available. Please fetch the configuration.</p>
            )}

            <div style={{ marginTop: "20px" }}>
                <button onClick={handleReadConfig} disabled={isLoading}>
                    Read Config
                </button>
                <button onClick={handleUpdateConfig} disabled={isLoading || !config}>
                    Update Config
                </button>
            </div>
        </div>
    );
};

export default QexafsComponent;

