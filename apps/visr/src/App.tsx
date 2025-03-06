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
  const def = 'generic';
  const [backend, setBackend] = useState<'colors' | 'hdf' | 'generic'>(def);

  return (
    <>
      <h1>testing the fastapi ws for hdf readout</h1>

      <ButtonGroup>
        <Button onClick={() => setBackend('colors')}> use colors backend</Button>
        <Button onClick={() => setBackend('hdf')}>use hdf hardcoded backend</Button>
        <Button onClick={() => setBackend('generic')}>use generic backend</Button>
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


          </> : <p>error rendering - unknown backend</p>
      }
    </>
  );
}

export default App;
