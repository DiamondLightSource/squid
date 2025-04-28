import { Box, Typography, Grid } from "@mui/material";
import { VillageDefinition, villages } from "./technique";
import VillageCard from "./components/VillageCard";

export default function DaqLanding() {
    return (
        <Box sx={{ padding: 4 }}>
            <Typography variant="h2" sx={{ color: 'black', mb: 4 }}>
                science Villages
            </Typography>

            <Grid container spacing={3}>
                {villages.map((v: VillageDefinition, i) => (
                    <Grid item xs={12} sm={6} md={4} key={`village-card-${i}`}>
                        <VillageCard data={v} />
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
}
