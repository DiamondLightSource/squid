"use client";
import React from "react";
import { RegionOfInterest } from "./GraphV3";

type RoiProps = {
    index: number;
    scaleX: (energy: number) => number;
    roi: RegionOfInterest;
};
export function RegionOfInterestSvg({ index, scaleX, roi }: RoiProps): React.JSX.Element {
    return <rect
        key={index}
        x={scaleX(roi.startingEnergy)}
        y={60}
        width={scaleX(roi.endEnergy) - scaleX(roi.startingEnergy)}
        height={100}
        fill="rgba(0, 0, 255, 0.2)"
        stroke="blue"
        strokeWidth={2}
        onClick={(e) => {
            e.preventDefault();
            alert(`ROI clicked: ${roi.startingEnergy} - ${roi.endEnergy}`);
        }}
        onContextMenu={() => alert(`ROI clicked: ${roi.startingEnergy} - ${roi.endEnergy}`)} />;
}

