import { Box, Typography, Paper } from "@mui/material";
import { TreeItem, SimpleTreeView } from "@mui/x-tree-view";
import { useMemo } from "react";

type FileDetailProps = {
  fileName: string;
  content: Record<string, any>;
};

// Helper function to convert the object structure into a tree-friendly format
const buildTree = (item: any, index: number) => {
  const nodeLabel = item.name || `Item ${index}`;
  const nodeType = item.type || 'Unknown';
  console.log(item);

  const unique = `${nodeLabel}-${index}`;
  // If there are nested items, render them recursively
  return (
    <TreeItem key={unique} id={unique} itemId={unique} label={`${nodeLabel} (${nodeType})`}>
      {item.items && item.items.length > 0 && item.items.map((child, childIndex) => buildTree(child, childIndex))}
    </TreeItem>
  );
};

const FileDetail = ({ fileName, content }: FileDetailProps) => {
  if (!fileName) return <Typography>Select a file to view details.</Typography>;
  console.dir(content)
  const groups = content["groups"]
  if (groups) {
    console.log("groups: ", groups)
  } else {
    // window.alert("no groups")
  }

  // Only render the tree view if there is content
  return (
    <Paper sx={{ padding: 2, margin: 2 }}>
      <Typography variant="h6">{fileName}</Typography>
      <Typography variant="h6">Number of items: {groups ? groups.length : 0}</Typography>
      <Box sx={{ marginTop: 2 }}>
        <SimpleTreeView>
          {groups && Array.isArray(groups) ? groups.map((item, index) => buildTree(item, index)) : <p> not an aray</p>}
        </SimpleTreeView>
      </Box>
    </Paper>
  );
};

export default FileDetail;
