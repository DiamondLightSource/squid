import { Stage, Layer, Circle } from 'react-konva';

export type CanvasProps = {
    stageWidth?: number,
    stageHeight?: number,
    children: React.ReactNode
}

function Canvas({ stageWidth, stageHeight, children }: CanvasProps) {
    return (
        <Stage width={stageWidth ?? window.innerWidth} height={stageHeight ?? window.innerHeight}>
            <Layer>
                <Circle x={200} y={100} radius={50} fill="green" />
                {children}
            </Layer>
        </Stage>
    );
}

export default Canvas;