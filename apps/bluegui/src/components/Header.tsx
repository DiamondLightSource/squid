import { Notifications } from '@mui/icons-material';
import { AppBar, Button, IconButton, Toolbar, Typography } from '@mui/material';
import React from 'react';
import Logo from './Logo';

interface HeaderProps {
  fetchPlans: () => void;
  fetchDevices: () => void;
  fetchWorkerStatus: () => void;
  handleStartTour: () => void;
}

const Header: React.FC<HeaderProps> = ({ handleStartTour }) => {
  const handleResetEnvironment = () => {
    // Reset environment logic
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6">BlueGUI</Typography>
        <Logo />
        <IconButton>
          <Notifications />
        </IconButton>
        <Button
          sx={{ color: 'white' }}
          onClick={handleStartTour}>Start Tour</Button>
        <Button
          sx={{ color: 'white' }} className='reset-environment' onClick={handleResetEnvironment}>Reset Environment</Button>
      </Toolbar>
    </AppBar >
  );
};

export default Header;
