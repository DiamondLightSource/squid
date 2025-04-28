import { Box, Typography, Table, TableHead, TableRow, TableCell, TableBody } from "@mui/material";
import { RegionOfInterest } from "./RegionOfInterest";

export function RegionOfInterestTable({ regions }: { regions: RegionOfInterest[] }) {
    return (
        <Box sx={{ mt: 4 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
                Regions of Interest
            </Typography>

            <Table size="small">
                <TableHead>
                    <TableRow>
                        <TableCell>Start Energy (eV)</TableCell>
                        <TableCell>End Energy (eV)</TableCell>
                        <TableCell>Exposure (ms)</TableCell>
                        <TableCell>Formula</TableCell>
                        <TableCell>Number of Points</TableCell>
                    </TableRow>
                </TableHead>

                <TableBody>
                    {regions.map((roi, idx) => (
                        <TableRow key={idx}>
                            <TableCell>{roi.startingEnergyElectronVolts}</TableCell>
                            <TableCell>{roi.endEnergyElectronVolts}</TableCell>
                            <TableCell>{roi.exposureMilisecondsPerPoint}</TableCell>
                            <TableCell>{roi.formulaForExposureTime || "-"}</TableCell>
                            <TableCell>{roi.numberOfPointsOfExposure}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Box>
    );
}
