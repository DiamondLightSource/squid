"use client";
import React from "react";
import { RegionOfInterest } from "./RegionOfInterest";

type RoiProps = {
    index: number;
    scaleX: (energy: number) => number;
    roi: RegionOfInterest;
};

// todo need a big context to dispatch ROI changes
// todo add an option to change the color
export function RegionOfInterestSvg({ index, scaleX, roi }: RoiProps): React.JSX.Element {
    return <rect
        key={index}
        x={scaleX(roi.startingEnergyElectronVolts)}
        y={60}
        width={scaleX(roi.endEnergyElectronVolts) - scaleX(roi.startingEnergyElectronVolts)}
        height={100}
        fill="rgba(0, 0, 255, 0.2)"
        stroke="blue"
        strokeWidth={2}
        onClick={(e) => {
            e.preventDefault();
            alert(`ROI clicked: ${roi.startingEnergyElectronVolts} - ${roi.endEnergyElectronVolts}`);
        }}
        onContextMenu={() => alert(`ROI clicked: ${roi.startingEnergyElectronVolts} - ${roi.endEnergyElectronVolts}`)} />;
        
}

