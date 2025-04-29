import { ElementType } from "@diamondlightsource/periodic-table/elements";
import { PeriodicTable } from "@diamondlightsource/periodic-table/table";
import { Slider, Typography } from "@mui/material";
import TableArea from "../components/TableArea";
import RoiTable from "../components/AnotherTable";


export default function S10ypage() {

    return <>
        <Typography variant="h2" sx={{ color: 'black' }}>Choose element</Typography>
        <TableArea />
        <RoiTable />
        <Slider></Slider>
        todo read out from the xraylib the energy ranges for each
        low energy to high energy
    </>
}