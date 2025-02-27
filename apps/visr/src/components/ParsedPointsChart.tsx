import { useState } from 'react';
import { Stage } from 'react-konva';
import { Layer, ResponsiveContainer } from 'recharts';
import { useResponsiveStage } from '../hooks/userResponsiveStage';
import useWebSocket from '../hooks/useWebSocket';
import ColorRect from './ColorRect';
import { intensityClosure } from './OneColorCanvas';

type DataPoint = {
  r: number,
  g: number,
  b: number,
  total: number
}

type WsResponse = {
  points: DataPoint[]
}


function ParsedPointsChart() {
  const [data, setData] = useState<DataPoint[]>([]);

  const { stageSize, rectSize } = useResponsiveStage();
  function handleMessage(parsedData: WsResponse) {
    console.log(`parsed data: ${parsedData}`)
    setData((prevData) => {
      const newData = [...prevData, ...parsedData.points];
      return newData.slice(-50);
    });
  }

  const wsUrl = "ws://127.0.0.1:8002/ws/data";
  // const { connectionError } = useWebSocket(wsUrl, handleMessage);

  const getHex = intensityClosure('r');
  return (
    <div className="websocketed">
      <h3>recorded hdf Data streamed - only r for now</h3>
      {/* {connectionError && <p style={{ color: "red" }}>{connectionError}</p>} */}
      <ResponsiveContainer width="100%" height={400}>
        <Stage width={stageSize.width} height={stageSize.height}>
          <Layer>
            {data.map((intensity, index) => {
              const color = getHex(intensity.r);
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
      </ResponsiveContainer>
    </div>
  );
}

export default ParsedPointsChart;
