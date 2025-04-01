"use client";
import { createContext, useContext, useReducer } from "react";
import { LongSchemaType } from "../../schemas/long";
import { readXmlLongConfig, updateXmlLongConfig } from "../server-xml";

export type LongAction =
    | { type: "START_CONFIG_READ"; }
    | { type: "START_CONFIG_UPDATE"; }
    | { type: "CONFIG_READ_SUCCESS"; payload: LongSchemaType }
    | { type: "CONFIG_UPDATE_SUCCESS"; }
    | { type: "CONFIG_ERROR"; payload: string };

// todo can optimize by using partial

type LongState = {
    config?: LongSchemaType,
    isLoading: boolean
    error: string
}

export const initialState: LongState = {
    config: undefined,
    isLoading: false,
    error: "",
};

const LongStateContext = createContext<LongState>(initialState);

const LongDispatchContext = createContext<React.Dispatch<LongAction> | undefined>(
    undefined
);

const longReducer = (state: LongState, action: LongAction) => {
    switch (action.type) {
        case "START_CONFIG_READ":
            return {
                ...state,
                isLoading: true,
            };

        case "CONFIG_READ_SUCCESS":
            return {
                ...state,
                isLoading: false,
                config: action.payload,
            };

        case "START_CONFIG_UPDATE":
            return {
                ...state,
                isLoading: true,
            };



        case "CONFIG_UPDATE_SUCCESS":
            return {
                ...state,
                isLoading: false,
            };

        case "CONFIG_ERROR":
            return {
                ...state,
                isLoading: false,
                error: action.payload,
            };

        default:
            return state;
    }
};


export const LongContextProvider: React.FC<{
    startingValue: LongState;
    children: React.ReactNode;
}> = ({ startingValue, children }) => {
    const [state, dispatch] = useReducer(longReducer, startingValue);
    return (
        <LongStateContext.Provider value={state}>
            <LongDispatchContext.Provider value={dispatch}>
                {children}
            </LongDispatchContext.Provider>

        </LongStateContext.Provider>
    );
};

export const useLongState = () => {
    const context = useContext(LongStateContext);
    if (!context)
        throw new Error("useLongState must be used within LongContextProvider");
    return context;
};


export const useLongDispatch = () => {
    const context = useContext(LongDispatchContext);
    if (!context)
        throw new Error("useLongDispatch must be used within LongContextProvider");
    return context;
};

export const startConfigRead = async (dispatch: React.Dispatch<LongAction>) => {
    dispatch({ type: "START_CONFIG_READ" });

    console.log("trying to read remote data")
    try {
        const response = await readXmlLongConfig();
        // console.dir(response);
        if (response?.data?.success && response?.data?.data) {
            dispatch({ type: "CONFIG_READ_SUCCESS", payload: response.data?.data });
        } else {
            dispatch({ type: "CONFIG_ERROR", payload: `Error reading configuration: ${response}` });
        }
    } catch (error) {
        dispatch({ type: "CONFIG_ERROR", payload: "Config server error" });
    }
};

export const startConfigUpdate = async (
    dispatch: React.Dispatch<LongAction>,
    newConfig: LongSchemaType
) => {
    dispatch({ type: "START_CONFIG_UPDATE" });

    try {
        const response = await updateXmlLongConfig(newConfig);
        if (response === undefined) {
            dispatch({ type: "CONFIG_ERROR", payload: "Error updating configuration" });
        } else {
            dispatch({ type: "CONFIG_UPDATE_SUCCESS" });
        }
    } catch (error) {
        dispatch({ type: "CONFIG_ERROR", payload: "Config server error" });
    }
};
