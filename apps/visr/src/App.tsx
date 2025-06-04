import { Button, ButtonGroup, Stack } from '@chakra-ui/react';
import { Box } from '@mui/material';
import { useState } from "react";
import './App.css';
import ColorsChart from './components/ColorsChart';
import { DatasetShapeViewer } from './components/DatasetShapeViewer';
import GenericPanel from './components/GenericPanel';
import Live3DViewer from './components/Live3DViewer';
import ParsedPointsChart from './components/ParsedPointsChart';
import Plot from './components/Plot';
import { StateViewer } from './components/StateViewer';
import WebsocketChart from './components/WebsocketChart';
import { PossibleBackendsType } from './types';

function App() {
  // const [response, setResponse] = useState<string>('');

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
