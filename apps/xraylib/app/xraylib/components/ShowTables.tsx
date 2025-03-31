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
import { AbsorptionEdgeResponseType, ElementPropertiesResponseType, EmissionDataResponseType } from "../../schemas/xraylibSchemas";
import React from 'react';
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
  const rowEvenBackgroundColor = "#f9f9f9";
  return (
    <div style={{ padding: "10px" }}>
      {/* Properties Table */}
      <Typography variant="h6" gutterBottom>
        Element Properties
      </Typography>
      <TableContainer component={Paper} style={{ marginBottom: "10px" }}>
        <Table size="small">
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
            {properties.map((property, i) => (
              <TableRow key={property.atomic_number} sx={{ backgroundColor: i % 2 === 0 ? rowEvenBackgroundColor : "white" }}>
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
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>
                <strong>IUPAC Symbol</strong>
              </TableCell>
              <TableCell>
                <strong>Absorption Edge eV</strong>
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
            {absorption.map((edge, i) => (
              <TableRow key={edge.id} sx={{ backgroundColor: i % 2 === 0 ? rowEvenBackgroundColor : "white" }}>
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
        <Table size="small">
          <TableHead>
            <TableRow>
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
            {transitions.map((transition, i) => (
              <TableRow key={transition.id} sx={{ backgroundColor: i % 2 === 0 ? rowEvenBackgroundColor : "white" }}>
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
