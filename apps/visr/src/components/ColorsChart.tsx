import { useState } from 'react';
import { OneColorCanvas } from './OneColorCanvas';

function ColorsChart() {
    const [status, setStatus] = useState<'ready' | 'starting' | 'running' | 'finished' | 'unknown'>('ready');

    const handleStart = async () => {
        setStatus('starting');
        try {
            // const response = await fetch('/api/start', { method: 'POST' });
            setStatus('running');
            // if (response.ok) {
            //     setStatus('running');
            // } else {
            //     setStatus('unknown');
            // }
        } catch (error) {
            console.error('Error starting the process:', error);
            setStatus('unknown');
        }
    };

    return (
        <div className="websocketed">
            <h3>Colors Data</h3>
            {status === 'ready' && <button onClick={handleStart}>Start</button>}
            {(status === 'running' || status === 'finished') && (
                <div id="output" style={{ display: 'flex', flexDirection: 'row', width: window.innerWidth }}>
                    <OneColorCanvas name={'r'} />
                    <OneColorCanvas name={'g'} />
                    <OneColorCanvas name={'b'} />
                    {/* <OneColorCanvas name={'t'} /> */}
                </div>
            )}
        </div>
    );
}
export default ColorsChart;
