"use client";

import Editor from "@monaco-editor/react";

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
      console.log(`items are correct ${items.length}`);
      setItems(items);
      // setItems(MUI_X_PRODUCTS);
    } catch (error) {
      // const reason = error.response?.data?.reason;
      alert(`Error fetching or parsing items ${error}`);
    }
  };

  const addFolder = () => {
    // this is a known bug when too many layers
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
  };
  const addFile = async () => {
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
          <Button onClick={addFile}>Add file</Button>
          <Button onClick={addFolder}>Add folder</Button>
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
        <EditorBox lastSelectedItem={lastSelectedItem} items={items} />
      </Grid>
    </Grid>
  );
}

interface EditorBoxProps {
  lastSelectedItem: string | null;
  items: TreeViewBaseItem[];
}

function EditorBox({ lastSelectedItem, items }: EditorBoxProps) {
  if (lastSelectedItem == null) {
    return (
      <Box sx={{ minHeight: "80vh", bgcolor: "background.paper" }}>
        <Typography variant="h6" color="black">
          Not editing anything now
        </Typography>
      </Box>
    );
  }
  return (
    <Box sx={{ minHeight: "80vh", bgcolor: "background.paper" }}>
      <Tabs
        value={0}
        onChange={(_: SyntheticEvent, value: any) => {
          console.log("tab changed");
          // setCurrentlyEditing(value);
        }}
        variant="scrollable"
        scrollButtons="auto"
        aria-label="scrollable auto tabs example"
      >
        {items.map((item, index) => {
          return <Tab key={index} label={item.label} />;
          // add on select
        })}
      </Tabs>
      <Box id="editor-box">
        {items.map((item, index) => {
          return (
            <CustomTabPanel key={index} value={0} index={index}>
              <input type="textarea" value={item.label} />
              <Editor
                height="90vh"
                defaultLanguage="javascript"
                defaultValue="// some comment"
              />
              ;
            </CustomTabPanel>
          );
        })}
      </Box>
    </Box>
  );
}
