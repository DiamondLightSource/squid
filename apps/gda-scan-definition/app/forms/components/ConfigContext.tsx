"use client";
import { createContext, useContext } from "react";


export type ConfigContext = {
    beamlineIdentifier: string;
    configUrl: string;
}

const ConfigContextContext = createContext<ConfigContext | undefined>(undefined);

/**
 * TODO in the future this will query a remote server
 * @param param0 
 * @returns 
 */
export const ConfigContextProvider: React.FC<{ startingValue: ConfigContext, children: React.ReactNode }> = ({
    startingValue,
    children,
}) => {

    return (
        <ConfigContextContext.Provider value={startingValue}>
            {children}
        </ConfigContextContext.Provider>
    );
};


export const useConfigContext = () => {
    const context = useContext(ConfigContextContext);
    if (!context) throw new Error("useIDEState must be used within ConfigContextProvider");
    return context;
};
