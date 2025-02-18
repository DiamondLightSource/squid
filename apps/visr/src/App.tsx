import './App.css'
import Plot from './components/Plot'
import WebsocketChart from './components/WebsocketChart';
import ColorsChart from './components/ColorsChart';


import "./App.css";
import { useState, useEffect } from "react";

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
  return (
    <>
      <h1>Vite + React</h1>
      <div><h3> hello response:</h3>
        <p>{response}</p>
      </div>
      <Plot />
      <WebsocketChart />
      <ColorsChart />
    </>
  );
}

export default App;
