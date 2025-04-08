import { Box, Grid2, useTheme } from "@mui/material";
import { PvComponent, PvItem } from "./pv/PvComponent";
import { parseNumericPv } from "./pv/util";


const root = "BL01C-MO-PPMAC-01";

export function BeamlineStatsTabPanel() {
  const theme = useTheme();
  const bgColor = theme.palette.background.paper;
  return (
    <div>
      <Grid2 container spacing={2}>
        <Grid2 size={4} sx={{ bgcolor: bgColor }}>
          <PvComponent
            label="Y axis"
            pv={`ca://${root}:Y`}
            render={({ label, value }: PvItem) => {
              return (
                <Box>
                  <p>
                    <b>{label}:</b> {parseNumericPv(value, 2, 1e-9)}e+9
                  </p>
                </Box>
              );
            }}
          />
        </Grid2>
        <Grid2 size={4} sx={{ bgcolor: bgColor }}>
          <PvComponent
            label="x axis"
            pv={`ca://${root}:X`}
            render={({ label, value }: PvItem) => {
              return (
                <Box>
                  <p>
                    <b>{label}:</b> {parseNumericPv(value)}
                  </p>
                </Box>
              );
            }}
          />
        </Grid2>
        <Grid2 size={4} sx={{ bgcolor: bgColor }}>
          <PvComponent
            label="Z axis"
            pv={`ca://${root}:Z`}
            render={({ label, value }: PvItem) => {
              return (
                <Box>
                  <p>
                    <b>{label}:</b> {value?.toString().slice(7)}
                  </p>
                </Box>
              );
            }}
          />
        </Grid2>
      </Grid2>
    </div>
  );
}
