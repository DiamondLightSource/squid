"use client";
import { createContext, useContext, useReducer } from "react";
import { DetectorsSchema, FullQexafsSchemaType, OutputParametersType } from "../../schemas/qexafs";
import { readDetectorParameters } from "../server-readxml";
import { readScanDefinition, updateScanDefinition } from "../actions";

// this checks that all the file exist and read them from the FS and parses into JSON
// todo complete the action
export type QexafsAction =
  | { type: "START_CONFIG_READ"; }
  | { type: "START_CONFIG_UPDATE"; }
  | { type: "CONFIG_READ_SUCCESS"; payload: FullQexafsSchemaType }
  | { type: "CONFIG_UPDATE_SUCCESS"; }
  | { type: "CONFIG_ERROR"; payload: string };

// todo can optimize by using partial

type QexafsState = {
  config?: FullQexafsSchemaType,
  isLoading: boolean
  error: string
}

export const initialState: QexafsState = {
  config: undefined,
  isLoading: false,
  error: "",
};

const QexafsStateContext = createContext<QexafsState>(initialState);

const QexafsDispatchContext = createContext<React.Dispatch<QexafsAction> | undefined>(
  undefined
);

const qexafsReducer = (state: QexafsState, action: QexafsAction) => {
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


export const QexafsContextProvider: React.FC<{
  startingValue: QexafsState;
  children: React.ReactNode;
}> = ({ startingValue, children }) => {
  const [state, dispatch] = useReducer(qexafsReducer, startingValue);
  return (
    <QexafsStateContext.Provider value={state}>
      <QexafsDispatchContext.Provider value={dispatch}>
        {children}
      </QexafsDispatchContext.Provider>

    </QexafsStateContext.Provider>
  );
};

export const useQexafsState = () => {
  const context = useContext(QexafsStateContext);
  if (!context)
    throw new Error("useIDEState must be used within ConfigContextProvider");
  return context;
};


export const useQexafsDispatch = () => {
  const context = useContext(QexafsDispatchContext);
  if (!context)
    throw new Error("useIDEState must be used within QexafsDispatchContext");
  return context;
};

export const startConfigRead = async (dispatch: React.Dispatch<QexafsAction>) => {
  dispatch({ type: "START_CONFIG_READ" });

  try {
    const response = await readScanDefinition();
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
  dispatch: React.Dispatch<QexafsAction>,
  newConfig: FullQexafsSchemaType
) => {
  dispatch({ type: "START_CONFIG_UPDATE" });

  try {
    const response = await updateScanDefinition(newConfig);
    if (response === undefined) {
      dispatch({ type: "CONFIG_ERROR", payload: "Error updating configuration" });
    } else {
      dispatch({ type: "CONFIG_UPDATE_SUCCESS" });
    }
  } catch (error) {
    dispatch({ type: "CONFIG_ERROR", payload: "Config server error" });
  }
};
