import { useEffect, useRef, useState } from 'react';
import { Layer, Rect, Stage } from 'react-konva';
import ColorRect from './ColorRect';
import { useResponsiveStage } from '../hooks/userResponsiveStage';

type Colors = 'r' | 'g' | 'b' | 't';

type ColorEvent = {
    c: Colors,
    i: number
}

const intensityClosure = (name: Colors) => {
    let getHex = (intensity: number) => "#000000";
    switch (name) {
        case 'r':
            getHex = (intensity: number) => `#${intensity.toString(16)}0000`;
            break;
        case 'g':
            getHex = (intensity: number) => `#00${intensity.toString(16).padStart(2, '0')}00`;
            break;
        case 'b':
            getHex = (intensity: number) => `#0000${intensity.toString(16).padStart(2, '0')}`;
            break;
        case 't':
            getHex = (intensity: number) => {
                const hexIntensity = intensity.toString(16).padStart(2, '0');
                return `#${hexIntensity}${hexIntensity}${hexIntensity}`;
            }
            break;
        default:
            getHex = (intensity: number) => "#000000";
            break;
    }
    return getHex;
};


interface OneColorCanvasProps {
    name: Colors,
}

export function OneColorCanvas({ name }: OneColorCanvasProps) {
    const [data, setData] = useState<number[]>([]);
    const ws = useRef<WebSocket | null>(null);

    const { stageSize, rectSize } = useResponsiveStage();
    useEffect(() => {
        // Establish WebSocket connection
        ws.current = new WebSocket('/ws/colors');
        // console.log(name, ws.current);
        ws.current.onmessage = (event) => {
            const parsedData: ColorEvent = JSON.parse(event.data);
            if (parsedData.c == name) {
                setData(prevData => {
                    const newData = [...prevData, parsedData.i];
                    return newData.slice(-50);
                });
            }
        };

        // Cleanup WebSocket connection on component unmount
        return () => {
            if (ws.current) {
                ws.current.close();
            }
        };
    }, []);
    const getHex = intensityClosure(name);


    return (
        <div id={name}>
            <div>On color {name}</div>
            {/* <p>data length: {data.length}</p> */}
            <Stage width={stageSize.width} height={stageSize.height}>
                <Layer>
                    {data.map((intensity, index) => {
                        const color = getHex(intensity);
                        console.log('color: ', color, " intensity :", intensity);
                        return <ColorRect
                            key={index}
                            color={color}
                            x={20 + (index % 10) * rectSize.spacing} // Example layout
                            y={20 + Math.floor(index / 10) * rectSize.spacing}
                            width={rectSize.width}
                            height={rectSize.height}
                        />
                    })}
                </Layer>
            </Stage>
        </div>
    )
}


function ColorsChart() {
    const [status, setStatus] = useState<'ready' | 'starting' | 'running' | 'finished' | 'unknown'>('ready');

    const handleStart = async () => {
        setStatus('starting');
        try {
            const response = await fetch('/api/start', { method: 'POST' });
            setStatus('running');
            // if (response.ok) {
            //     setStatus('running');
            // } else {
            //     setStatus('unknown');
            // }
        } catch (error) {
            console.error('Error starting the process:', error);
            setStatus('unknown');
        }
    };

    return (
        <div className="websocketed">
            <h3>Colors Data</h3>
            {status === 'ready' && <button onClick={handleStart}>Start</button>}
            {(status === 'running' || status === 'finished') && (
                <div id="output" style={{ display: 'flex', flexDirection: 'row', width: window.innerWidth }}>
                    <OneColorCanvas name={'r'} />
                    <OneColorCanvas name={'g'} />
                    <OneColorCanvas name={'b'} />
                    {/* <OneColorCanvas name={'t'} /> */}
                </div>
            )}
        </div>
    );
}
export default ColorsChart;
