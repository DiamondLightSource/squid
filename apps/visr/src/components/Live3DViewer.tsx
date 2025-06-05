import { useEffect, useState, useRef } from 'react';
import ThreeDVisualization from './Visualization';

const initialStageState = {
    x: { value: 0 },
    y: { value: 0 },
    z: { value: 0 }
};

const Live3DViewer = ({ wsUrl }: { wsUrl: string }) => {
    const [stageState, setStageState] = useState(initialStageState);
    const wsRef = useRef<WebSocket | null>(null);

    useEffect(() => {
        const ws = new WebSocket(wsUrl);
        wsRef.current = ws;

        ws.onmessage = (event) => {
            try {
                const data = JSON.parse(event.data);
                if (['x', 'y', 'z'].includes(data.pv)) {
                    setStageState(prev => ({
                        ...prev,
                        [data.pv]: parseFloat(data.value)

                    }));
                }
            } catch (err) {
                console.error('Failed to parse message:', event.data, err);
            }
        };

        ws.onopen = () => console.log('WebSocket connected');
        ws.onerror = (e) => console.error('WebSocket error:', e);
        ws.onclose = () => console.log('WebSocket closed');

        return () => {
            ws.close();
        };
    }, [wsUrl]);

    return <div>
        <div>
            <h3> stage state:</h3>
            <span>{JSON.stringify(stageState, null, 2)}</span>
        </div>
        <ThreeDVisualization state={stageState} />
    </div>
};

export default Live3DViewer;
