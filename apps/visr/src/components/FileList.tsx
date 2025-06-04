import { List, ListItem, ListItemText } from "@mui/material";

const FileList = ({ files, onSelect }) => {
  return (
    <List>
      {files.map((file) => (
        <ListItem button key={file} onClick={() => onSelect(file)}>
          <ListItemText primary={file} />
        </ListItem>
      ))}
    </List>
  );
};

export default FileList;
