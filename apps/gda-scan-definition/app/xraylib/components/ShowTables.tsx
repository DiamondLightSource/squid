import {
  AbsorptionEdgeResponseType,
  ElementPropertiesResponseType,
  EmissionDataResponseType,
} from "../../schemas/xraylibSchemas";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
} from "@mui/material";
type ShowTablesProps = {
  properties: ElementPropertiesResponseType;
  absorption: AbsorptionEdgeResponseType;
  transitions: EmissionDataResponseType;
};

export function ShowTables({
  properties,
  absorption,
  transitions,
}: ShowTablesProps) {
  return (
    <div style={{ padding: "20px" }}>
      {/* Properties Table */}
      <Typography variant="h6" gutterBottom>
        Element Properties
      </Typography>
      <TableContainer component={Paper} style={{ marginBottom: "20px" }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <strong>Atomic Number</strong>
              </TableCell>
              <TableCell>
                <strong>Element</strong>
              </TableCell>
              <TableCell>
                <strong>Molar Mass</strong>
              </TableCell>
              <TableCell>
                <strong>Density</strong>
              </TableCell>
              <TableCell>
                <strong>Name</strong>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {properties.map((property) => (
              <TableRow key={property.atomic_number}>
                <TableCell>{property.atomic_number}</TableCell>
                <TableCell>{property.element}</TableCell>
                <TableCell>{property.molar_mass}</TableCell>
                <TableCell>{property.density}</TableCell>
                <TableCell>{property.name}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Absorption Edge Table */}
      <Typography variant="h6" gutterBottom>
        Absorption Edge Data
      </Typography>
      <TableContainer component={Paper} style={{ marginBottom: "20px" }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <strong>ID</strong>
              </TableCell>
              <TableCell>
                <strong>Element</strong>
              </TableCell>
              <TableCell>
                <strong>IUPAC Symbol</strong>
              </TableCell>
              <TableCell>
                <strong>Absorption Edge</strong>
              </TableCell>
              <TableCell>
                <strong>Fluorescence Yield</strong>
              </TableCell>
              <TableCell>
                <strong>Jump Ratio</strong>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {absorption.map((edge) => (
              <TableRow key={edge.id}>
                <TableCell>{edge.id}</TableCell>
                <TableCell>{edge.element}</TableCell>
                <TableCell>{edge.iupac_symbol}</TableCell>
                <TableCell>{edge.absorption_edge}</TableCell>
                <TableCell>{edge.fluorescence_yield}</TableCell>
                <TableCell>{edge.jump_ratio}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Transitions Table */}
      <Typography variant="h6" gutterBottom>
        X-Ray Transitions Data
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <strong>ID</strong>
              </TableCell>
              <TableCell>
                <strong>Element</strong>
              </TableCell>
              <TableCell>
                <strong>Initial Level</strong>
              </TableCell>
              <TableCell>
                <strong>Final Level</strong>
              </TableCell>
              <TableCell>
                <strong>Emission Energy</strong>
              </TableCell>
              <TableCell>
                <strong>Intensity</strong>
              </TableCell>
              <TableCell>
                <strong>IUPAC Symbol</strong>
              </TableCell>
              <TableCell>
                <strong>Siegbahn Symbol</strong>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {transitions.map((transition) => (
              <TableRow key={transition.id}>
                <TableCell>{transition.id}</TableCell>
                <TableCell>{transition.element}</TableCell>
                <TableCell>{transition.initial_level}</TableCell>
                <TableCell>{transition.final_level}</TableCell>
                <TableCell>{transition.emission_energy}</TableCell>
                <TableCell>{transition.intensity}</TableCell>
                <TableCell>{transition.iupac_symbol}</TableCell>
                <TableCell>{transition.siegbahn_symbol}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
