import { useState } from 'react';
import { Group, Stage } from 'react-konva';
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

function ParsedPointsChart() {
  const [data, setData] = useState<DataPoint[]>([]);

  const { stageSize, rectSize } = useResponsiveStage();
  function handleMessage(parsedData: number[][]) {
    console.log(`parsed data: ${parsedData}`)
    if (parsedData) {
      const datapoints: DataPoint[] = parsedData.map(row => {
        const d: DataPoint = {
          r: row[0],
          g: row[1],
          b: row[2],
          total: row[3]
        };
        return d;
      })
      setData(datapoints);

      // setData((prevData) => {
      //   const newData = [...prevData, d];
      //   return newData.slice(-50);
      // });
    }
  }

  const wsUrl = "ws://127.0.0.1:8002/ws/data";
  const { connectionError } = useWebSocket(wsUrl, handleMessage);

  const getHex = intensityClosure('r');
  return (
    <div className="websocketed">
      <h3>recorded hdf Data streamed - only r for now</h3>
      {connectionError && <p style={{ color: "red" }}>{connectionError}</p>}
      {/* <div id="data-render">
        {data.map((intensity, index) => {
          const color = getHex(intensity.r);
          console.log("color: ", color, "intensity: ", intensity);
          return <p key={`data-point-${index}`}> new data point {intensity.r}</p>
        })}
      </div> */}

      <div>
        {data.map((thing, index) => {
          return <div id={`thing-${index}`}>
            <h4>something</h4>
            <ul>
              <li>{thing.r}</li>
              <li>{thing.b}</li>
              <li>{thing.b}</li>
              <li>{thing.total}</li>
            </ul>
          </div>
        })}
      </div>
    </div>
  );
}

export default ParsedPointsChart;

// <ResponsiveContainer width="100%" height={400}>
//   <Stage width={stageSize.width} height={stageSize.height}>
//     <Layer>
//       <Group id='r-group'>
//         {data.map((intensity, index) => {
//           const color = getHex(intensity.r);
//           console.log("color: ", color, "intensity: ", intensity);
//           return <p key={`data-point-${index}`}> new data point {intensity.r}</p>
//           return (
//             <ColorRect
//               key={index}
//               color={color}
//               x={20 + (index % 10) * rectSize.spacing} // Example grid layout
//               y={20 + Math.floor(index / 10) * rectSize.spacing}
//               width={rectSize.width}
//               height={rectSize.height}
//             />
//           );
//         })}
//       </Group>
//     </Layer>
//   </Stage>
// </ResponsiveContainer>
