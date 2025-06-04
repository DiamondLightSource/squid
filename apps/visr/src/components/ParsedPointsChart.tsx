import { useState } from 'react';
import { Group, Layer, Stage } from 'react-konva';
import { useResponsiveStage } from '../hooks/useResponsiveStage';
import useWebSocket from '../hooks/useWebSocket';
import ColorRect from './ColorRect';
import { getHexColor } from './OneColorCanvas';

type DataPoint = {
  r: number,
  g: number,
  b: number,
  total: number
}


type ParsedPointsChartProps = {
  url?: string
}

const wsUrl = "ws://127.0.0.1:8002/ws/data";

function ParsedPointsChart({ url = wsUrl  }: ParsedPointsChartProps) {
  const [data, setData] = useState<DataPoint[]>([]);
  const { stageSize, rectSize } = useResponsiveStage();

  function handleMessage(parsedData: number[][]) {
    console.log(`parsed data: ${parsedData}`)
    if (parsedData.length == 0) {
      // window.alert("resetting the visualization")
      setData([])
    }
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

    }
  }

  const { connectionError } = useWebSocket(url, handleMessage);


  return (
    <div className="websocketed">
      <h3>recorded hdf Data streamed</h3>
      {connectionError && <p style={{ color: "red" }}>{connectionError}</p>}
      {/* <div id="data-render">
        {data.map((intensity, index) => {
          const color = getHex(intensity.r);
          console.log("color: ", color, "intensity: ", intensity);
          return <p key={`data-point-${index}`}> new data point {intensity.r}</p>
        })}
      </div> */}

      {/* NOTE this is for debugging */}
      {/* <div>
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
      </div> */}

      {/* <TestStars />
      <TestChart /> */}
      <Stage width={stageSize.width} height={stageSize.height}>
        <Layer>
          <Group id='r-group'>
            {data.map((intensity, index) => {
              const newColor = getHexColor('r', intensity.r);
              return (
                <ColorRect
                  key={index}
                  color={newColor}
                  x={20 + (index % 10) * rectSize.spacing} // Example grid layout
                  y={20 + Math.floor(index / 10) * rectSize.spacing}
                  width={rectSize.width}
                  height={rectSize.height}
                />
              );
            })}
          </Group>
          <Group id='g-group'>
            {data.map((intensity, index) => {
              const newColor = getHexColor('g', intensity.g);
              return (
                <ColorRect
                  key={index}
                  color={newColor}
                  x={20 + (index % 10) * rectSize.spacing} // Example grid layout
                  y={320 + Math.floor(index / 10) * rectSize.spacing}
                  width={rectSize.width}
                  height={rectSize.height}
                />
              );
            })}
          </Group>
          <Group id='b-group'>
            {data.map((intensity, index) => {
              const newColor = getHexColor('b', intensity.b)
              return (
                <ColorRect
                  key={index}
                  color={newColor}
                  x={20 + (index % 10) * rectSize.spacing} // Example grid layout
                  y={620 + Math.floor(index / 10) * rectSize.spacing}
                  width={rectSize.width}
                  height={rectSize.height}
                />
              );
            })}
          </Group>
          <Group id='total-group'>
            {data.map((intensity, index) => {
              const newColor = getHexColor('all', intensity.total)
              return (
                <ColorRect
                  key={index}
                  color={newColor}
                  x={620 + (index % 10) * rectSize.spacing} // Example grid layout
                  y={320 + Math.floor(index / 10) * rectSize.spacing}
                  width={rectSize.width}
                  height={rectSize.height}
                />
              );
            })}
          </Group>
        </Layer>
      </Stage>


    </div>
  );
}

export default ParsedPointsChart;