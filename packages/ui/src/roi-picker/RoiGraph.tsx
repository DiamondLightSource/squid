"use client";

import React, { useState, useRef, useEffect } from "react";
import { useRoiContext } from "./RoiContext";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import RoiContextMenu from "./RoiContextMenu";

export default function RoiGraph() {
    const { regions, axes, updateRoi } = useRoiContext();
    const graphRef = useRef<HTMLDivElement>(null);
    const [activeRoi, setActiveRoi] = useState<number | null>(null);
    const [initialPos, setInitialPos] = useState<{ x: number, y: number } | null>(null);
    const [dragStartRoi, setDragStartRoi] = useState<any>(null);
    const [contextMenu, setContextMenu] = useState<{ x: number, y: number, roiIndex: number } | null>(null);

    // Convert data to graph-friendly format
    const graphData = Array.from({ length: 1000 }, (_, i) => ({
        x: axes.xMin + ((axes.xMax - axes.xMin) / 1000) * i,
        y: Math.sin(i / 100) * 500 + 500,
    }));

    const pxToCoord = (pxX: number, pxY: number) => {
        const graph = graphRef.current;
        if (!graph) return { x: 0, y: 0 };

        const rect = graph.getBoundingClientRect();
        const x = axes.xMin + ((pxX - rect.left) / rect.width) * (axes.xMax - axes.xMin);
        const y = axes.yMax - ((pxY - rect.top) / rect.height) * (axes.yMax - axes.yMin);

        return { x, y };
    };

    // Handle start of drag
    const handleMouseDown = (e: React.MouseEvent, index: number) => {
        e.preventDefault();
        const { x, y } = pxToCoord(e.clientX, e.clientY);
        setActiveRoi(index);
        setInitialPos({ x, y });
        setDragStartRoi({ ...regions[index] });
    };

    // Handle mouse move during drag
    const handleMouseMove = (e: MouseEvent) => {
        if (activeRoi === null || !initialPos || !dragStartRoi) return;

        const { x, y } = pxToCoord(e.clientX, e.clientY);
        const dx = x - initialPos.x;
        const dy = y - initialPos.y;

        const updatedRoi = {
            ...dragStartRoi,
            xStart: dragStartRoi.xStart + dx,
            xEnd: dragStartRoi.xEnd + dx,
            yStart: dragStartRoi.yStart + dy,
            yEnd: dragStartRoi.yEnd + dy,
        };

        // Update the position visually (optimistic)
        updateRoi(activeRoi, updatedRoi);
    };

    // Commit changes on mouse up
    const handleMouseUp = () => {
        setActiveRoi(null);
        setInitialPos(null);
        setDragStartRoi(null);
    };

    // Attach global mouse move and mouse up listeners
    useEffect(() => {
        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("mouseup", handleMouseUp);
        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("mouseup", handleMouseUp);
        };
    }, [activeRoi, initialPos, dragStartRoi]);

    // Handle right click to open context menu
    const handleRightClick = (event: React.MouseEvent, index: number) => {
        event.preventDefault();
        setContextMenu({
            x: event.clientX,
            y: event.clientY,
            roiIndex: index,
        });
    };

    const closeContextMenu = () => setContextMenu(null);

    return (
        <div ref={graphRef} style={{ position: "relative" }}>
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
                    onContextMenu={(e) => handleRightClick(e, index)}
                    onMouseDown={(e) => handleMouseDown(e, index)}
                    style={{
                        position: "absolute",
                        left: `${((roi.xStart - axes.xMin) / (axes.xMax - axes.xMin)) * 100}%`,
                        top: `${((axes.yMax - roi.yStart) / (axes.yMax - axes.yMin)) * 100}%`,
                        width: `${((roi.xEnd - roi.xStart) / (axes.xMax - axes.xMin)) * 100}%`,
                        height: `${((roi.yEnd - roi.yStart) / (axes.yMax - axes.yMin)) * 100}%`,
                        backgroundColor: "rgba(0, 123, 255, 0.3)",
                        border: "1px solid blue",
                        cursor: "move",
                        zIndex: 10,
                    }}
                />
            ))}

            {/* Show Context Menu if active */}
            {contextMenu && (
                <RoiContextMenu
                    x={contextMenu.x}
                    y={contextMenu.y}
                    roiIndex={contextMenu.roiIndex}
                    onClose={closeContextMenu}
                />
            )}
        </div>
    );
}
