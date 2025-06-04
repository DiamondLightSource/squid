import { List, ListItem, ListItemText } from "@mui/material";

const FileList = ({ files, onSelect }: { files: any, onSelect: (f: any) => void }) => {
  return (
    <List>
      {files.map((file: any) => (
        <ListItem key={file} onClick={() => onSelect(file)}>
          <ListItemText primary={file} />
        </ListItem>
      ))}
    </List>
  );
};

export default FileList;
