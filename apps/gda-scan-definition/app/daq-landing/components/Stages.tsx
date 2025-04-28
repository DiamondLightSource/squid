import React, { createContext, useContext, useReducer } from "react";
import { Box, Button, Typography } from "@mui/material";

const stages = [
    "Choose Element",
    "Calibrate Detectors",
    "Calibrate Scan Parameters",
    "Collect Your Data",
];

type StageAction = { type: "NEXT" } | { type: "BACK" };

function stageReducer(state: number, action: StageAction) {
    switch (action.type) {
        case "NEXT":
            return Math.min(state + 1, stages.length - 1);
        case "BACK":
            return Math.max(state - 1, 0);
        default:
            return state;
    }
}

const StageContext = createContext<{
    stage: number;
    dispatch: React.Dispatch<StageAction>;
} | null>(null);

export function useStage() {
    const ctx = useContext(StageContext);
    if (!ctx) throw new Error("useStage must be used inside StageProvider");
    return ctx;
}

function Stages() {
    const [stage, dispatch] = useReducer(stageReducer, 0);

    return (
        <StageContext.Provider value={{ stage, dispatch }}>
            <Box sx={{ border: "1px solid lightgray", p: 2 }}>
                <Typography variant="h6">Stage: {stages[stage]}</Typography>
                <Box sx={{ mt: 2 }}>
                    <Button
                        variant="contained"
                        onClick={() => dispatch({ type: "BACK" })}
                        disabled={stage === 0}
                        sx={{ mr: 1 }}
                    >
                        Back
                    </Button>
                    <Button
                        variant="contained"
                        onClick={() => dispatch({ type: "NEXT" })}
                        disabled={stage === stages.length - 1}
                    >
                        Next
                    </Button>
                </Box>
            </Box>
        </StageContext.Provider>
    );
}

export default Stages;
