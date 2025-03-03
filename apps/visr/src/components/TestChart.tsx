import React from "react";
import { Stage, Layer, Group, Rect } from "react-konva";

function TestChart() {
    return (
        <Stage width={500} height={500}>
            <Layer>
                <Group>
                    <Rect x={50} y={50} width={100} height={100} fill="red" />
                    <Rect x={200} y={50} width={100} height={100} fill="blue" />
                </Group>
            </Layer>
        </Stage>
    );
}

export default TestChart;
