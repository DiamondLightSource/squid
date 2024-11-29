import React from 'react';
import { Grid, Button } from '@mui/material';
import { Devices, AddBox, Edit, Delete, Visibility } from '@mui/icons-material';

interface SidebarProps {
  plans: any[];
  devices: any[];
}

const Sidebar: React.FC<SidebarProps> = ({ plans, devices }) => {
  return (
    <Grid item xs={2}>
      <Button startIcon={<Devices />}>Devices</Button>
      <Button startIcon={<AddBox />}>Add Plan</Button>
      <Button startIcon={<Edit />}>Edit Plan</Button>
      <Button startIcon={<Delete />}>Delete Plan</Button>
      <Button startIcon={<Visibility />}>View Plan</Button>
    </Grid>
  );
};

export default Sidebar;
