import { useState } from "react";
import { Container, Grid, Paper, CircularProgress, Typography } from "@mui/material";
import { useFiles } from "../hooks/useFiles";
import { useFileDetail } from "../hooks/useFileDetail";
import FileDetail from "./FileDetail";
import FileList from "./FileList";
import useWebSocket from "../hooks/useWebSocket";
import ParsedPointsChart from "./ParsedPointsChart";

const wsUrl = "ws://127.0.0.1:8002/ws/democlient/demo";

function GenericPanel() {
    const { files, loading: filesLoading, error: filesError } = useFiles();
    const [selectedFile, setSelectedFile] = useState<string | null>(null);
    const { detail, loading: detailLoading, error: detailError } = useFileDetail(selectedFile);

    return (
        <Container maxWidth="lg" sx={{ marginTop: 4 }}>
            <Grid container spacing={2}>
                {/* Sidebar */}
                <Grid item xs={3}>
                    <Paper sx={{ padding: 2 }}>
                        {filesLoading ? (
                            <CircularProgress />
                        ) : filesError ? (
                            <Typography color="error">{filesError}</Typography>
                        ) : (
                            <FileList files={files} onSelect={setSelectedFile} />
                        )}
                    </Paper>
                </Grid>

                {/* Main Detail View */}
                <Grid item xs={2}>
                    <Paper sx={{ padding: 2 }}>
                        {detailLoading ? (
                            <CircularProgress />
                        ) : detailError ? (
                            <Typography color="error">{detailError}</Typography>
                        ) : (
                            <FileDetail fileName={selectedFile} content={detail} />
                        )}
                    </Paper>
                </Grid>
                <Grid item xs={7}>
                    <Paper sx={{ padding: 2 }}>
                        <div id="data-render">
                            <ParsedPointsChart url={`ws://127.0.0.1:8002/ws/democlient/demo/${selectedFile}`} />
                        </div>
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    );
}

export default GenericPanel;
