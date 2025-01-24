"use client";
import { createContext, useContext } from "react";
import { DetectorsSchema, OutputParametersSchema } from "../../schemas/qexafs";

// this checks that all the file exist and read them from the FS and parses into JSON
export type QexafsContext = {
  detectors: DetectorsSchema;
  output: OutputParametersSchema;
  // todo etc etc
};

// todo complete the action
export type QexafsAction = {};

const QexafsStateContext = createContext<QexafsContext | undefined>(undefined);

const QuexafsDispatchContext = createContext<QexafsAction | undefined>(
  undefined
);

// todo add a reducer

export const QexafsContextProvider: React.FC<{
  startingValue: QexafsContext;
  children: React.ReactNode;
}> = ({ startingValue, children }) => {
  return (
    <QexafsStateContext.Provider value={startingValue}>
        <QuexafsDispatchContext.Provider value={}
      {children}
    </QexafsStateContext.Provider>
  );
};

export const useConfigContext = () => {
  const context = useContext(ConfigContextContext);
  if (!context)
    throw new Error("useIDEState must be used within ConfigContextProvider");
  return context;
};
