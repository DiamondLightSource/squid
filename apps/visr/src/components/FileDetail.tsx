import { Box, Typography, Paper, Table } from "@mui/material";

type FileDetailProps = {
  fileName: string;
  content: string[];
};

const FileDetail = ({ fileName, content }: FileDetailProps) => {
  if (!fileName) return <Typography>Select a file to view details.</Typography>;
  console.dir(content);

  return (
    <Paper sx={{ padding: 2, margin: 2 }}>
      <Typography variant="h6">{fileName}</Typography>
      <Typography variant="h6">Number of items: {content.length}</Typography>
      <Box sx={{ whiteSpace: "pre-wrap", marginTop: 2 }}>
        {content && content.map((item, index) => (
          <Typography key={index}>{item}</Typography>
        ))}
      </Box>
    </Paper>
  );
};

export default FileDetail;
