"use client";
import Box from "@mui/material/Box";
import { SimpleTreeView } from "@mui/x-tree-view/SimpleTreeView";
import { TreeItem } from "@mui/x-tree-view/TreeItem";
import { signal, Signal, useSignal } from "@preact/signals-react";

import { TreeViewBaseItem } from "@mui/x-tree-view/models";
import { RichTreeView } from "@mui/x-tree-view/RichTreeView";
import { Button, ButtonGroup } from "@mui/material";
import { useState } from "react";
import { getFiles } from "../actions/filesystem-actions";

const MUI_X_PRODUCTS: TreeViewBaseItem[] = [
  {
    id: "grid",
    label: "Data Grid",
    children: [
      { id: "grid-community", label: "@mui/x-data-grid" },
      { id: "grid-pro", label: "@mui/x-data-grid-pro" },
      { id: "grid-premium", label: "@mui/x-data-grid-premium" },
    ],
  },
  {
    id: "pickers",
    label: "Date and Time Pickers",
    children: [
      { id: "pickers-community", label: "@mui/x-date-pickers" },
      { id: "pickers-pro", label: "@mui/x-date-pickers-pro" },
    ],
  },
  {
    id: "charts",
    label: "Charts",
    children: [{ id: "charts-community", label: "@mui/x-charts" }],
  },
  {
    id: "tree-view",
    label: "Tree View",
    children: [{ id: "tree-view-community", label: "@mui/x-tree-view" }],
  },
];

export function BasicRichTreeView() {
  return (
    <Box sx={{ minHeight: 352, minWidth: 250 }}>
      <RichTreeView items={MUI_X_PRODUCTS} />
    </Box>
  );
}

export function ExperimentTreeView() {
  return (
    <Box sx={{ minHeight: 352, minWidth: 250 }}>
      <SimpleTreeView>
        <TreeItem itemId="grid" label="Data Grid">
          <TreeItem itemId="grid-community" label="@mui/x-data-grid" />
          <TreeItem itemId="grid-pro" label="@mui/x-data-grid-pro" />
          <TreeItem itemId="grid-premium" label="@mui/x-data-grid-premium" />
        </TreeItem>
        <TreeItem itemId="pickers" label="Date and Time Pickers">
          <TreeItem itemId="pickers-community" label="@mui/x-date-pickers" />
          <TreeItem itemId="pickers-pro" label="@mui/x-date-pickers-pro" />
        </TreeItem>
        <TreeItem itemId="charts" label="Charts">
          <TreeItem itemId="charts-community" label="@mui/x-charts" />
        </TreeItem>
        <TreeItem itemId="tree-view" label="Tree View">
          <TreeItem itemId="tree-view-community" label="@mui/x-tree-view" />
        </TreeItem>
      </SimpleTreeView>
    </Box>
  );
}

export function FilesystemTreeView() {
  // const items: Signal<TreeViewBaseItem[]> = useSignal([] as TreeViewBaseItem[]);
  const [items, setItems] = useState<TreeViewBaseItem[]>([]);

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

  return (
    <Box sx={{ minHeight: 352, minWidth: 250 }}>
      <ButtonGroup>
        <Button
          onClick={async () => {
            // alert("changing the value");
            // items.value = MUI_X_PRODUCTS;
            // setItems(MUI_X_PRODUCTS);
            // alert(`changed the value ${items.length}`);
            await fetchItems();
          }}
        >
          refresh
        </Button>
      </ButtonGroup>
      <h3>Items: {items.length}</h3>
      {/* todo at the moment this breaks as the items is not defined from the server response */}
      <RichTreeView items={items} />
    </Box>
  );
}
