
"use client";

import React, { useState, useRef, useEffect } from "react";
import { useRoiContext } from "./RoiContext";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import RoiContextMenu from "./RoiContextMenu";

export function XOnlyRoiGraph() {
    const { regions, axes, updateRoi } = useRoiContext();
    const graphRef = useRef<HTMLDivElement>(null);
    const [activeRoi, setActiveRoi] = useState<number | null>(null);
    const [initialPos, setInitialPos] = useState<number | null>(null);
    const [dragStartRoi, setDragStartRoi] = useState<any>(null);
    const [resizeMode, setResizeMode] = useState<"move" | "resize" | null>(null);
    const [resizeDirection, setResizeDirection] = useState<"left" | "right" | null>(null);
    const [contextMenu, setContextMenu] = useState<{ x: number, y: number, roiIndex: number } | null>(null);

    const EDGE_PADDING = 10; // Distance to trigger resizing

    const graphData = Array.from({ length: 1000 }, (_, i) => ({
        x: axes.xMin + ((axes.xMax - axes.xMin) / 1000) * i,
        y: Math.sin(i / 100) * 500 + 500,
    }));

    const pxToCoordX = (pxX: number) => {
        const graph = graphRef.current;
        if (!graph) return 0;

        const rect = graph.getBoundingClientRect();
        const x = axes.xMin + ((pxX - rect.left) / rect.width) * (axes.xMax - axes.xMin);

        return x;
    };

    // Determine cursor based on mouse position
    const getCursorStyle = (e: React.MouseEvent, roi: any) => {
        const x = pxToCoordX(e.clientX);

        const nearLeft = Math.abs(x - roi.xStart) < EDGE_PADDING;
        const nearRight = Math.abs(x - roi.xEnd) < EDGE_PADDING;

        if (nearLeft) return "ew-resize";
        if (nearRight) return "ew-resize";
        return "move";
    };

    // Handle mouse down for move or resize
    const handleMouseDown = (e: React.MouseEvent, index: number) => {
        e.preventDefault();
        const x = pxToCoordX(e.clientX);
        const roi = regions[index];

        const cursor = getCursorStyle(e, roi);
        setResizeMode(cursor === "ew-resize" ? "resize" : "move");
        setResizeDirection(cursor === "ew-resize" ? (Math.abs(x - roi.xStart) < EDGE_PADDING ? "left" : "right") : null);
        setActiveRoi(index);
        setInitialPos(x);
        setDragStartRoi({ ...roi });
    };

    // Handle mouse move
    const handleMouseMove = (e: MouseEvent) => {
        if (activeRoi === null || initialPos === null || !dragStartRoi || !resizeMode) return;

        const x = pxToCoordX(e.clientX);
        const dx = x - initialPos;
        const roi = dragStartRoi;

        let updatedRoi = { ...roi };

        if (resizeMode === "move") {
            // Move the whole ROI
            updatedRoi.xStart = roi.xStart + dx;
            updatedRoi.xEnd = roi.xEnd + dx;
        } else if (resizeMode === "resize") {
            // Resize the ROI
            if (resizeDirection === "left") {
                updatedRoi.xStart = Math.min(x, roi.xEnd);
            }
            if (resizeDirection === "right") {
                updatedRoi.xEnd = Math.max(x, roi.xStart);
            }
        }

        updateRoi(activeRoi, updatedRoi);
    };

    // Commit changes on mouse up
    const handleMouseUp = () => {
        setActiveRoi(null);
        setInitialPos(null);
        setDragStartRoi(null);
        setResizeMode(null);
        setResizeDirection(null);
    };

    // Attach global mouse move and mouse up listeners
    useEffect(() => {
        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("mouseup", handleMouseUp);
        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("mouseup", handleMouseUp);
        };
    }, [activeRoi, initialPos, dragStartRoi, resizeMode, resizeDirection]);

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

            {regions.map((roi, index) => (
                <div
                    key={index}
                    onContextMenu={(e) => handleRightClick(e, index)}
                    onMouseDown={(e) => handleMouseDown(e, index)}
                    onMouseMove={(e) => (e.currentTarget.style.cursor = getCursorStyle(e, roi))}
                    style={{
                        position: "absolute",
                        left: `${((roi.xStart - axes.xMin) / (axes.xMax - axes.xMin)) * 100}%`,
                        top: "3%",
                        width: `${((roi.xEnd - roi.xStart) / (axes.xMax - axes.xMin)) * 100}%`,
                        height: "85%",
                        backgroundColor: "rgba(0, 123, 255, 0.3)",
                        border: "1px solid blue",
                        zIndex: 10,
                    }}
                />
            ))}

            {contextMenu && (
                <RoiContextMenu x={contextMenu.x} y={contextMenu.y} roiIndex={contextMenu.roiIndex} onClose={closeContextMenu} />
            )}
        </div>
    );
}
