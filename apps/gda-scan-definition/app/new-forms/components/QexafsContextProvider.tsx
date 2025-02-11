"use client";
import { createContext, useContext, useReducer } from "react";
import { DetectorsSchema, OutputParametersType } from "../../schemas/qexafs";

// this checks that all the file exist and read them from the FS and parses into JSON
export type QexafsContext = {
  detectors: DetectorsSchema;
  output: OutputParametersType;
  // todo etc etc
};

// todo complete the action
export type QexafsAction = {};

const QexafsStateContext = createContext<QexafsContext | undefined>(undefined);

const QexafsDispatchContext = createContext<QexafsAction | undefined>(
  undefined
);

const qexafsReducer = (state: QexafsContext, action: QexafsAction) => {
  switch (action) {
    default:
      return state;
  }
};
// todo add a reducer


export const QexafsContextProvider: React.FC<{
  startingValue: QexafsContext;
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
