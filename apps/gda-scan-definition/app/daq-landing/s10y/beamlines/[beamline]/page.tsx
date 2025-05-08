import { ElementType } from "@diamondlightsource/periodic-table/elements";
import { PeriodicTable } from "@diamondlightsource/periodic-table/table";
import { Slider, Typography } from "@mui/material";
import RoiTable from "../../../components/AnotherTable";
import TableArea from "../../../components/TableArea";

export default function BeamlinePage({ params }: Record<string, string>) {

    const { beamline } = params;

    return <div>beamline page {beamline}
        <Typography variant="h2" sx={{ color: 'black' }}>Choose element</Typography>
        <TableArea beamline={beamline} />
        {/* <RoiTable /> */}
        <Slider></Slider>
        todo read out from the xraylib the energy ranges for each low energy to high energy
    </div>
}