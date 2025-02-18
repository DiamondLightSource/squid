import React, { useEffect, useRef, useState } from 'react';
import { ResponsiveContainer, LineChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Line } from 'recharts';


type Dataset = {
    label: string,
    data: any[]
}

type Data = {
    labels: any[],
    datasets: Dataset[]

}
type DataPoint = {
    time: number;
    value: number;
};


const initialData: Data = { labels: [], datasets: [{ label: 'Real-Time Data', data: [] }] };

function WebsocketChart() {
    // const [data, setData] = useState<Data>(initialData);
    const [data, setData] = useState<DataPoint[]>([]);
    const ws = useRef<WebSocket | null>(null);

    useEffect(() => {
        // Establish WebSocket connection
        ws.current = new WebSocket('/ws');
        console.log(ws.current);
        ws.current.onmessage = (event) => {
            const parsedData = JSON.parse(event.data);
            setData(prevData => {
                const newData = [...prevData, { time: parsedData.time, value: parsedData.value }];
                return newData.slice(-50); // Keep only the last 50 data points
            });
            // const parsedData = JSON.parse(event.data);
            // setData(prevData => {

            //     const newLabels = [...prevData.labels, parsedData.time.toFixed(2)];
            //     const newDataset = {
            //         ...prevData.datasets[0],
            //         data: [...prevData.datasets[0].data, parsedData.value]
            //     };
            //     return { labels: newLabels.slice(-50), datasets: [newDataset] }; // Keep only the last 50 data points
            // });
        };

        // Cleanup WebSocket connection on component unmount
        return () => {
            if (ws.current) {
                ws.current.close();
            }
        };
    }, []);

    return (
        <div className="websocketed">
            <h3>Real-Time Data</h3>
            <ResponsiveContainer width="100%" height={400}>
                <LineChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" tickFormatter={(tick) => new Date(tick).toLocaleTimeString()} />
                    <YAxis />
                    <Tooltip labelFormatter={(label) => new Date(label).toLocaleTimeString()} />
                    <Legend />
                    <Line type="monotone" dataKey="value" stroke="#8884d8" dot={false} isAnimationActive={false} />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}

export default WebsocketChart;
