import { useState } from 'react';
import { Layer, Group, Stage, Star, Text } from 'react-konva';
import { useResponsiveStage } from '../hooks/userResponsiveStage';
import useWebSocket from '../hooks/useWebSocket';
import ColorRect from './ColorRect';
import { getHexColor, intensityClosure } from './OneColorCanvas';
import TestChart from './TestChart';
import { TestStars } from './TestStars';

type DataPoint = {
  r: number,
  g: number,
  b: number,
  total: number
}

function generateShapes() {
  return [...Array(10)].map((_, i) => ({
    id: i.toString(),
    x: Math.random() * window.innerWidth,
    y: Math.random() * window.innerHeight,
    rotation: Math.random() * 180,
    isDragging: false,
  }));
}
const INITIAL_STATE = generateShapes();



function ParsedPointsChart() {
  const [data, setData] = useState<DataPoint[]>([]);

  const [stars, setStars] = useState(INITIAL_STATE);

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

      {/* <ResponsiveContainer width='100%' height={400}>

        <Stage width={window.innerWidth} height={window.innerHeight}>
          <Layer>
            <Group>

              <Text text="Try to drag a star" />
              {stars.map((star) => (
                <Star
                  key={star.id}
                  id={star.id}
                  x={star.x}
                  y={star.y}
                  numPoints={5}
                  innerRadius={20}
                  outerRadius={40}
                  fill="#89b717"
                  opacity={0.8}
                  draggable
                  rotation={star.rotation}
                  shadowColor="black"
                  shadowBlur={10}
                  shadowOpacity={0.6}
                  shadowOffsetX={star.isDragging ? 10 : 5}
                  shadowOffsetY={star.isDragging ? 10 : 5}
                  scaleX={star.isDragging ? 1.2 : 1}
                  scaleY={star.isDragging ? 1.2 : 1}
                  onDragStart={handleDragStart}
                  onDragEnd={handleDragEnd}
                />
              ))}
            </Group>
          </Layer>
        </Stage>
      </ResponsiveContainer> */}
      {/* <TestStars />
      <TestChart /> */}
      <Stage width={stageSize.width} height={stageSize.height}>
        <Layer>
          <Group id='r-group'>
            {data.map((intensity, index) => {
              const getHex = intensityClosure('r');
              const color = getHex(intensity.r);
              const newColor = getHexColor('r', intensity.r);
              console.log("color: ", color, "intensity: ", intensity);
              // return <p key={`data-point-${index}`}> new data point {intensity.r}</p>
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
              const getHex = intensityClosure('g');
              const color = getHex(intensity.g);
              const newColor = getHexColor('g', intensity.g);
              console.log("color: ", color, "all itensities: ", intensity, " new color: ", newColor);
              // return <p key={`data-point-${index}`}> new data point {intensity.r}</p>
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
              const getHex = intensityClosure('b');
              const color = getHex(intensity.b);
              const newColor = getHexColor('b', intensity.b)
              console.log("color: ", color, "intensity: ", intensity);
              // return <p key={`data-point-${index}`}> new data point {intensity.r}</p>
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
              const getHex = intensityClosure('t');
              const color = getHex(intensity.total);
              console.log("color: ", color, "intensity: ", intensity);
              // return <p key={`data-point-${index}`}> new data point {intensity.r}</p>
              return (
                <ColorRect
                  key={index}
                  color={color}
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
