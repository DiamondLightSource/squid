import {
  AppBar,
  Box,
  Button,
  Divider,
  Grid,
  TextField,
  Toolbar,
  Typography
} from '@mui/material';
import { useState } from 'react';
import GenericEditor from '../../components/GenericEditor';
import { useIDEDispatch } from '../../components/oldIdeState';

// Example React component
const FormWithDiffViewer = () => {
  const [currentContent, setCurrentContent] = useState<string>('');
  const [newContent, setNewContent] = useState<string>('');
  const dispatch = useIDEDispatch();


  const handleRevertChanges = () => {
    setNewContent(currentContent);
  };

  const handleSaveToDisk = () => {

    console.log('Saving to disk:', newContent);
    dispatch({ type: "EDIT_TAB_CONTENT", payload: { id: '1', content: newContent } });
  };

  return (
    <Box sx={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* ACTION MENU */}
      <AppBar position="static" color="primary">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Action Menu
          </Typography>
          <Button color="inherit" onClick={handleSaveToDisk}>
            Save to Disk
          </Button>
          <Button color="inherit" onClick={handleRevertChanges}>
            Revert Changes
          </Button>
        </Toolbar>
      </AppBar>

      <Box sx={{ flex: 1, display: 'flex', flexDirection: 'row', mt: 2 }}>
        {/* FORM */}
        <Grid container spacing={2} sx={{ width: '30%', p: 2 }}>
          <Grid item xs={12}>
            <Button variant="contained" color="primary" fullWidth>
              Add Component
            </Button>
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Form Field 1"
              variant="outlined"
              fullWidth
              value={currentContent}
              onChange={(e) => setCurrentContent(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Form Field 2"
              variant="outlined"
              fullWidth
              value={newContent}
              onChange={(e) => setNewContent(e.target.value)}
            />
          </Grid>
        </Grid>

        <Divider orientation="vertical" flexItem />

        {/* DIFF VIEWER */}
        <Box sx={{ flex: 1, p: 2 }}>
          <GenericEditor />
        </Box>
      </Box>
    </Box>
  );
};

export default FormWithDiffViewer;
