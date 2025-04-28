import { ElementType } from "@diamondlightsource/periodic-table/elements";
import { PeriodicTable } from "@diamondlightsource/periodic-table/table";
import { Slider, Typography } from "@mui/material";


export default function S10ypage() {

    return <>
        <Typography variant="h2" sx={{ color: 'black' }}>Choose element</Typography>
        <PeriodicTable callback={() => window.alert("chosen")} />
        <Slider></Slider>
        low energy to high energy
    </>
}