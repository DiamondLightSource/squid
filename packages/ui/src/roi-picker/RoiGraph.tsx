"use client";

import React from "react";
import { useRoiContext } from "./RoiContext";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

export default function RoiGraph() {
    const { regions, axes, data } = useRoiContext();

    // Convert data to graph-friendly format
    const graphData = data.map((row, index) => ({
        x: axes.xMin + ((axes.xMax - axes.xMin) / data.length) * index,
        y: row[0], // Assuming 1D for now, adjust if 2D
    }));

    return (
        <div style={{ position: "relative" }}>
            <ResponsiveContainer width="100%" height={400}>
                <LineChart data={graphData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                    <CartesianGrid stroke="#ccc" />
                    <XAxis dataKey="x" label={{ value: axes.xLabel, position: "insideBottomRight", offset: -10 }} />
                    <YAxis label={{ value: axes.yLabel, angle: -90, position: "insideLeft" }} />
                    <Tooltip />
                    <Line type="monotone" dataKey="y" stroke="#8884d8" />
                </LineChart>
            </ResponsiveContainer>

            {/* Draw the ROI rectangles */}
            {regions.map((roi, index) => (
                <div
                    key={index}
                    style={{
                        position: "absolute",
                        left: `${((roi.xStart - axes.xMin) / (axes.xMax - axes.xMin)) * 100}%`,
                        top: `${((axes.yMax - roi.yStart) / (axes.yMax - axes.yMin)) * 100}%`,
                        width: `${((roi.xEnd - roi.xStart) / (axes.xMax - axes.xMin)) * 100}%`,
                        height: `${((roi.yEnd - roi.yStart) / (axes.yMax - axes.yMin)) * 100}%`,
                        backgroundColor: "rgba(0, 123, 255, 0.3)",
                        border: "1px solid blue",
                        cursor: "pointer",
                    }}
                />
            ))}
        </div>
    );
}
