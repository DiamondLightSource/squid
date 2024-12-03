"use client";

import {
  Box,
  Button,
  ButtonGroup,
  Grid,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import { TreeViewBaseItem } from "@mui/x-tree-view/models";
import { RichTreeView } from "@mui/x-tree-view/RichTreeView";
import { SyntheticEvent, useState } from "react";
import { getFiles, makeFile } from "../actions/filesystem-actions";

export enum FilePrefix {
  QEXEAFS = "QEXEAFS",
  Detector = "Detector",
  Sample = "Sample",
  Output = "Output",
}

const QEXEAFSParametersForm = () => <div>QEXEAFS Parameters Form</div>;
const DetectorParametersForm = () => <div>Detector Parameters Form</div>;
const SampleParametersForm = () => <div>Sample Parameters Form</div>;
const OutputParametersForm = () => <div>Output Parameters Form</div>;
const UnknownFileForm = () => <div>Unknown File Form</div>;

type ComponentMap = {
  [key in FilePrefix]: () => JSX.Element;
};

const componentMap: ComponentMap = {
  [FilePrefix.QEXEAFS]: QEXEAFSParametersForm,
  [FilePrefix.Detector]: DetectorParametersForm,
  [FilePrefix.Sample]: SampleParametersForm,
  [FilePrefix.Output]: OutputParametersForm,
};

export function getComponentForFilename(filename: string): () => JSX.Element {
  const match = filename.match(/^([A-Za-z]+)_Parameters\.xml$/);
  if (!match) return UnknownFileForm;

  const prefix = match[1] as FilePrefix;
  const r = componentMap[prefix];
  return r || UnknownFileForm;
}

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

export function BigMainComponent() {
  const [items, setItems] = useState<TreeViewBaseItem[]>([]);
  const [currentlyEditing, setCurrentlyEditing] =
    useState<TreeViewBaseItem | null>(null);

  const fetchItems = async () => {
    try {
      const response = await getFiles();
      console.log(response);
      if (!response || !response.data) {
        alert("No items found");
        return;
      }
      // NOTE: this slightly odd parsing needs to be to work with the server response
      const items: TreeViewBaseItem[] = await response.data.files;
      console.log(` response: ${JSON.stringify(response)}`);
      console.log(`items: ${items} with length: ${items.length}`);
      if (items == undefined || items.length === 0) {
        alert("No items found");
        return;
      }
      if (items["rejected"]) {
        alert("Error fetching items");
        return;
      }
      console.log(`items are correct ${items.length}`);
      setItems(items);
      // setItems(MUI_X_PRODUCTS);
    } catch (error) {
      // const reason = error.response?.data?.reason;
      alert(`Error fetching or parsing items ${error}`);
    }
  };

  const [lastSelectedItem, setLastSelectedItem] = useState<string | null>(null);

  const handleItemSelectionToggle = (
    event: React.SyntheticEvent,
    itemId: string,
    isSelected: boolean
  ) => {
    if (isSelected) {
      setLastSelectedItem(itemId);
    }
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={4}>
        <Typography>
          {lastSelectedItem == null
            ? "No item selection recorded"
            : `Last selected item: ${lastSelectedItem}`}
        </Typography>
        <ButtonGroup sx={{ border: "Highlight" }}>
          <Button
            onClick={async () => {
              await fetchItems();
            }}
          >
            Refresh
          </Button>
          <Button
            onClick={async () => {
              // setEditMode(true);
              const newFile: TreeViewBaseItem = {
                id: `${items.length + 1}`,
                label: "new item",
                children: [],
              };
              setItems([...items, newFile]);

              await makeFile({
                name: "testtwo",
                type: "txt",
              });
            }}
          >
            Add file
          </Button>
          <Button
            onClick={() => {
              // todo this is a known bug when too many layers
              const newFile: TreeViewBaseItem = {
                id: `layer-${items.length + 1}`,
                label: "new item",
                children: [],
              };
              const newFolder: TreeViewBaseItem = {
                id: `${items.length + 1}`,
                label: "new folder",
                children: [newFile],
              };
              setItems([...items, newFolder]);
            }}
          >
            Add folder
          </Button>
        </ButtonGroup>
        <h3>Items: {items.length}</h3>
        <RichTreeView
          items={items}
          isItemEditable
          onItemSelectionToggle={handleItemSelectionToggle}
          experimentalFeatures={{ labelEditing: true }}
        />
      </Grid>
      <Grid item xs={8}>
        <Box sx={{ minHeight: "80vh", bgcolor: "background.paper" }}>
          {lastSelectedItem == null ? (
            <Typography variant="h6" color="black">
              Not editing anything now
            </Typography>
          ) : (
            <Box>
              <Tabs
                value={items.indexOf(currentlyEditing)}
                onChange={(_: SyntheticEvent, value: any) => {
                  console.log("tab changed");
                  setCurrentlyEditing(value);
                }}
                variant="scrollable"
                scrollButtons="auto"
                aria-label="scrollable auto tabs example"
              >
                {items.map((item, index) => {

                  return (
                    <Tab key={index} label={item.label} onSelect={ } />
                  );
                  // todo here inside add Parsing component depending on the file name
                })}

              </Tabs>
              <Box id="editor-box">
                {
                  items.map((item, index) => {
                    return <CustomTabPanel value={items.indexOf(currentlyEditing)} index={index}>
                      {/* todo here render the buffer */}
                      {/* todo here render the relevant Form */}
                    </CustomTabPanel>
                  })}
              </Box>
            </Box>
          )}
        </Box>
      </Grid>
    </Grid>
  );
}
