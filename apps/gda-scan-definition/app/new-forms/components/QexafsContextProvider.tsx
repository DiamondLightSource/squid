"use client";
import { createContext, useContext, useReducer } from "react";
import { DetectorsSchema, FullQexafsSchemaType, OutputParametersType } from "../../schemas/qexafs";
import { readDetectorParameters } from "../server-readxml";
import { readScanDefinition } from "../actions";

// this checks that all the file exist and read them from the FS and parses into JSON
// todo complete the action
export type QexafsAction =
    | { type: "START_CONFIG_READ"; payload: FullQexafsSchemaType }
    | { type: "START_CONFIG_UPDATE"; payload: FullQexafsSchemaType };

// todo can optimize by using partial

const QexafsStateContext = createContext<FullQexafsSchemaType | undefined>(undefined);

const QexafsDispatchContext = createContext<QexafsAction | undefined>(
  undefined
);


const qexafsReducer = (state: FullQexafsSchemaType, action: QexafsAction) => {
  switch (action.type){
    case "START_CONFIG_READ":
      const r = await readScanDefinition();
      // todo fix the await part

      return action.payload;
    case "START_CONFIG_UPDATE":
      return action.payload;
    default:
      return state;
  }
};
// todo add a reducer


export const QexafsContextProvider: React.FC<{
  startingValue: FullQexafsSchemaType;
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

export const useQexafsConfigContext = () => {
  const context = useContext(QexafsStateContext);
  if (!context)
    throw new Error("useIDEState must be used within ConfigContextProvider");
  return context;
};


export const useQexafsDispatchContext = () => {
  const context = useContext(QexafsDispatchContext);
  if (!context)
    throw new Error("useIDEState must be used within QexafsDispatchContext");
  return context;
};
