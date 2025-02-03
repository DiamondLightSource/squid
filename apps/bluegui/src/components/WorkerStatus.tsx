import React from 'react';
import { Typography, Grid } from '@mui/material';

interface WorkerStatusProps {
  status: string;
}

const WorkerStatus: React.FC<WorkerStatusProps> = ({ status }) => {
  const statusColor = status === 'idle' ? 'gray' : status === 'active' ? 'green' : 'red';
  const statusText = status === 'idle' ? 'Idle' : status === 'active' ? 'Active' : 'Error';

  return (
    <Grid container alignItems="center" spacing={1} className='worker-status'>
      <Grid item>
        <div style={{ width: '10px', height: '10px', backgroundColor: statusColor, borderRadius: '50%' }}></div>
      </Grid>
      <Grid item>
        <Typography>{statusText}</Typography>
      </Grid>
    </Grid>
  );
};

export default WorkerStatus;
