"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import { Roi, Axes, RoiContextType } from "./types";
import { checkDomainOfScale } from "recharts/types/util/ChartUtils";
import makeContiguousAlongX from "./makeContiguousAlongX";

const RoiContext = createContext<{
    axes: Axes;
    regions: Roi[];
    data: number[][];
    setData: (data: number[][]) => void;
    addRoi: (roi: Roi) => void;
    deleteRoi: (index: number) => void;
    updateRoi: (index: number, updatedRoi: Roi) => void;
    makeContiguousAlongX: (distance: number) => void;
} | null>(null)


export function useRoiContext() {
    const context = useContext(RoiContext);
    if (!context) throw new Error("useRoiContext must be used within RoiProvider");
    return context;
}



export function RoiProvider({
    children,
    defaultAxes,
    initialData,
}: {
    children: ReactNode;
    defaultAxes: Axes;
    initialData: number[][];
}) {
    const [axes, setAxes] = useState<Axes>(defaultAxes);
    const [regions, setRegions] = useState<Roi[]>([]);
    const [data, setData] = useState<number[][]>(initialData);

    const addRoi = (roi: Roi) => {
        console.log(`new roi: ${roi}`)
        console.log(`existing regions: ${regions}`)

        setRegions((prev) => [...prev, roi]);
    };

    const deleteRoi = (index: number) =>
        setRegions((prev) => prev.filter((_, i) => i !== index));

    const updateRoi = (index: number, updatedRoi: Roi) => {
        setRegions((prev) => prev.map((roi, i) => (i === index ? updatedRoi : roi)));
    };


    const contX = (distance: number) => {
        const newRegions = makeContiguousAlongX(distance, true, regions);
        setRegions(newRegions);
    };

    return (
        <RoiContext.Provider value={{ axes, regions, data, setData, addRoi, deleteRoi, updateRoi, makeContiguousAlongX: contX }}>
            {children}
        </RoiContext.Provider>
    );
}
