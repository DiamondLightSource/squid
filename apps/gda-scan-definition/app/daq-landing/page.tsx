

import { Box, Typography } from "@mui/material";
import { VillageDefinition, villages } from "./technique";
import VillageCard from "./components/VillageCard";



export default function DaqLanding() {

    return <>
        <Typography variant="h2" sx={{ color: 'black' }}>this for spectroscopy</Typography>
        {villages.map((v: VillageDefinition, i) => {
            return <Box key={`village-card-${i}`}><VillageCard data={v} /></Box>
        })}
    </>
}