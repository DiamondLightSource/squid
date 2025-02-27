import { useEffect, useRef, useState } from 'react';
import { Layer, Stage } from 'react-konva';
import ColorRect from './ColorRect';
import { useResponsiveStage } from '../hooks/userResponsiveStage';

type Colors = 'r' | 'g' | 'b' | 't';

type ColorEvent = {
    c: Colors,
    i: number
}

export const intensityClosure = (name: Colors) => {
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
    const [connectionError, setConnectionError] = useState<string | null>(null); // For error feedback
    const ws = useRef<WebSocket | null>(null);
    const reconnectAttempts = useRef(0); // Track reconnect attempts
    const reconnectTimeout = useRef<NodeJS.Timeout | null>(null);

    const { stageSize, rectSize } = useResponsiveStage();
    useEffect(() => {
        const connectWebSocket = () => {
            try {
                ws.current = new WebSocket("ws://127.0.0.1:8000/ws/colors");

                ws.current.onopen = () => {
                    console.log(`WebSocket connected for color: ${name}`);
                    reconnectAttempts.current = 0; // Reset reconnect attempts
                    setConnectionError(null); // Clear any previous errors
                };

                ws.current.onmessage = (event) => {
                    try {
                        const parsedData: ColorEvent = JSON.parse(event.data);
                        if (parsedData.c === name) {
                            setData((prevData) => {
                                const newData = [...prevData, parsedData.i];
                                return newData.slice(-50); // Keep only the last 50 data points
                            });
                        }
                    } catch (messageError) {
                        console.error("Failed to parse WebSocket message:", messageError);
                    }
                };

                ws.current.onerror = (event) => {
                    console.error("WebSocket error:", event);
                    setConnectionError(`WebSocket connection error for ${name}.`);
                };

                ws.current.onclose = (event) => {
                    console.warn("WebSocket closed:", event.reason);
                    setConnectionError(`Connection lost for ${name}. Reconnecting...`);
                    attemptReconnect();
                };
            } catch (connectionError) {
                console.error("Failed to establish WebSocket connection:", connectionError);
                setConnectionError(`Failed to establish WebSocket connection for ${name}.`);
                attemptReconnect();
            }
        };

        const attemptReconnect = () => {
            if (reconnectAttempts.current >= 5) {
                setConnectionError(`Unable to reconnect for ${name} after multiple attempts.`);
                return;
            }

            reconnectAttempts.current += 1;
            const delay = Math.min(1000 * 2 ** reconnectAttempts.current, 30000); // Exponential backoff (max 30 seconds)

            console.log(`Attempting to reconnect for ${name} in ${delay / 1000} seconds...`);
            reconnectTimeout.current = setTimeout(() => {
                connectWebSocket();
            }, delay);
        };

        // Start WebSocket connection
        connectWebSocket();

        // Cleanup on component unmount
        return () => {
            if (ws.current) {
                ws.current.close();
            }
            if (reconnectTimeout.current) {
                clearTimeout(reconnectTimeout.current);
            }
        };
    }, [name]); // Reconnect when the `name` changes

    const getHex = intensityClosure(name);

    return (
        <div id={name}>
            <div>On color {name}</div>
            {connectionError && <p style={{ color: "red" }}>{connectionError}</p>}
            <Stage width={stageSize.width} height={stageSize.height}>
                <Layer>
                    {data.map((intensity, index) => {
                        const color = getHex(intensity);
                        console.log("color: ", color, "intensity: ", intensity);
                        return (
                            <ColorRect
                                key={index}
                                color={color}
                                x={20 + (index % 10) * rectSize.spacing} // Example grid layout
                                y={20 + Math.floor(index / 10) * rectSize.spacing}
                                width={rectSize.width}
                                height={rectSize.height}
                            />
                        );
                    })}
                </Layer>
            </Stage>
        </div>
    );
}


