import './App.css'
import Plot from './components/Plot'
import WebsocketChart from './components/WebsocketChart';
import ColorsChart from './components/ColorsChart';


import "./App.css";
import { useState, useEffect } from "react";
import { StateViewer } from './components/StateViewer';
import { ButtonGroup, Button, Stack } from '@chakra-ui/react';
import { DatasetShapeViewer } from './components/DatasetShapeViewer';
import ParsedPointsChart from './components/ParsedPointsChart';
import GenericPanel from './components/GenericPanel';
import { PossibleBackendsType } from './types';
import { Box } from '@mui/material';
import EpicsBackend from './components/EpicsBackend';
import { WebSocketDemo } from './components/DemoWebsocket';
import Live3DViewer from './components/Live3DViewer';

function App() {
  const [response, setResponse] = useState<string>('');
  useEffect(() => {
    const fetchHelloWorld = async () => {
      try {
        const res = await fetch('/api'); // Fetch the API endpoint
        const data = await res.json();  // Parse the response as JSON
        setResponse(data.message);      // Set the response state
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchHelloWorld();
  }, []);
  const def: PossibleBackendsType = 'epics';

  const [backend, setBackend] = useState<PossibleBackendsType>(def);

  return (
    <>
      <h1>testing the fastapi ws for hdf readout</h1>

      <ButtonGroup>
        <Button onClick={() => setBackend('colors')}> use colors backend</Button>
        <Button onClick={() => setBackend('hdf')}>use hdf hardcoded backend</Button>
        <Button onClick={() => setBackend('generic')}>use generic backend</Button>
        <Button onClick={() => setBackend('epics')}>use epics backend</Button>
      </ButtonGroup>
      {
        backend === 'colors' ?
          <>
            <Plot />
            <WebsocketChart />
            <ColorsChart />
          </>
          : backend === 'hdf' ? <>
            <Stack direction='row'>
              <DatasetShapeViewer />
              <StateViewer />
            </Stack>
            <ParsedPointsChart />
          </> : backend === 'generic' ? <>
            <p>generic backend</p>
            <GenericPanel />
          </> : backend === 'epics' ?
            <Box height='80vh' width='80vw' border='2px red solid'>
              epics backend
              {/* todo here a nice auto generated component */}
              {/* <EpicsBackend /> */}
              <Live3DViewer wsUrl="ws://localhost:3002/raster" />
              {/* <WebSocketDemo /> */}
            </Box>
            : <p>error rendering - unknown backend</p>
      }
    </>
  );
}

export default App;
