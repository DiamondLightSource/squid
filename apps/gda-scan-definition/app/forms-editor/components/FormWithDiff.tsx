import {
  materialCells,
  materialRenderers,
} from '@jsonforms/material-renderers';
import { JsonForms } from '@jsonforms/react';
import { ArrowLeft, ArrowRight } from '@mui/icons-material';
import {
  AppBar,
  Box,
  Button,
  Divider,
  Grid,
  Toolbar,
  Typography
} from '@mui/material';
import { XMLParser } from "fast-xml-parser";
import { useEffect, useState } from 'react';
import { selectFileWithFetch } from '../../clients/selectors';
import { formatXml } from '../../components/formatXml';
import GenericEditor from '../../components/GenericEditor';
import { useIDEDispatch, useIDEState } from '../../components/ideReducer';
import { formConfigsMap, FormFileDefinition } from '../../schemas/qexafs';
import { useConfigContext } from './ConfigContext';
import ConfigFilesDrawer from './ConfigFIlesDrawer';

function getLastSegment(s: string, root: string): string {
  return s.replace(root, '').replace(/^\//, ''); // Remove root and leading slash
}

const parser = new XMLParser();

const FormWithDiffViewer = () => {
  const [currentContent, setCurrentContent] = useState<string>('');
  const [newContent, setNewContent] = useState<string>('');
  const configState = useConfigContext();
  const dispatch = useIDEDispatch();
  const [formConfig, setFormConfig] = useState<FormFileDefinition>()
  const { activeTab, fileCache } = useIDEState();
  const [formData, setFormData] = useState<any>({});

  useEffect(() => {
    const fetchData = async () => {
      console.log('Active tab:', activeTab);
      console.log(`initial cache: ${fileCache}`)
      if (activeTab) {
        await selectFileWithFetch(dispatch, activeTab);
        console.log(`later cache: ${fileCache}`)
      }
    };
    fetchData();
  }, [activeTab]);


  useEffect(() => {
    if (activeTab) {
      const content = fileCache[activeTab];
      setCurrentContent(content);
      setNewContent(content);

      // NOTE This might be wrong
      const parsedResult = parser.parse(content.toString());
      console.log(`parsed result: ${Object.keys(parsedResult)}`);
      setFormData(parsedResult);

      const fileNameAsKey: string = getLastSegment(activeTab, configState.configUrl);
      const config = formConfigsMap[fileNameAsKey];
      if (!config) {
        window.alert('wrong file name');
      } else {
        console.log(`refreshed new config: ${config}`);
        setFormConfig(config);
      }
    }
  }, [fileCache]);


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
            Action Menu for beamline: {configState.beamlineIdentifier}
          </Typography>
          <ConfigFilesDrawer />
          <Button color="inherit" onClick={() => {
            const newContent = formatXml(currentContent);
            setNewContent(newContent);
          }}>
            Format xml
          </Button>
          <Button color="inherit" onClick={handleRevertChanges}>
            <ArrowLeft color='error' fontSize='large' />
            Revert Changes
          </Button>
          <Button color="inherit" onClick={handleSaveToDisk}>
            Save to Disk <ArrowRight color='success' fontSize='large' />
          </Button>
        </Toolbar>
      </AppBar>

      <Typography variant="h6">Now browsing: {activeTab} </Typography>
      <Box sx={{ flex: 1, display: 'flex', flexDirection: 'row', mt: 2 }}>
        {/* FORM */}
        <Grid container spacing={2} sx={{ width: '30%', p: 2 }}>
          {/* <Grid item xs={12}>
            <Button variant="contained" color="primary" fullWidth>
              Add Component
            </Button>
          </Grid> */}
          <Grid item xs={12} color={'primary'}  bgcolor='white' overflow="scroll">
            <JsonForms
              schema={formConfig?.schema}
              uischema={formConfig?.uiSchema}
              data={formData}
              renderers={materialRenderers}
              cells={materialCells}
              onChange={({ data }) => setFormData(data)}
            />
            <Button variant="contained" color="primary" fullWidth onClick={handleSaveToDisk}>
              Save
            </Button>
          </Grid>
        </Grid>

        <Divider orientation="vertical" flexItem />

        {/* DIFF VIEWER */}
        <Box sx={{ flex: 1, p: 2 }}>
          <GenericEditor oldText={currentContent} newText={newContent} />
        </Box>
      </Box>
    </Box>
  );
};

export default FormWithDiffViewer;
