import { Box, Typography } from "@mui/material";
import Stages from "../components/Stages";




export default function PerElementScan() {
    return <Box>
        <Typography variant="h3">
            scan this element
            {/* todo consume from nextjs parametrized [filename] */}
        </Typography>
        {/* top thin panel */}
        <Stages />

        {/* left hand block - 2/3rds of width */}
        {/* top left quarter is past measurements list */}
        {/* top right quarter is a Box with live output component */}
        {/* bottom half is a graph component */}


        {/* rigth hand block  */}
        {/* plan parameters form inside a Box */}


    </Box>




}