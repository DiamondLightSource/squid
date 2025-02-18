import React from 'react';
import { Rect } from 'react-konva';

interface ColorRectProps {
    x?: number;
    y?: number;
    width?: number;
    height?: number;
    color?: string;
    shadowBlur?: number;
    key?: React.Key;
}

const ColorRect: React.FC<ColorRectProps> = ({
    x = 0,
    y = 0,
    width = 50,
    height = 50,
    color = '#000000',
    shadowBlur = 5,
    key
}) => {
    return (
        <Rect
            x={x}
            y={y}
            width={width}
            height={height}
            fill={color}
            shadowBlur={shadowBlur}
            key={key}
        />
    );
};

export default ColorRect;
