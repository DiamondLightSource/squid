import { Grid, GridItem } from "@chakra-ui/react";

import React from "react";

type BaseLayoutProps = {
  navChild: React.ReactNode;
  topChild: React.ReactNode;
  bottomChild: React.ReactNode;
};

function Baselayout({ navChild, topChild, bottomChild }: BaseLayoutProps) {
  return (
    <div>
      <h2>Base layout here</h2>
      <Grid
        h="200px"
        templateRows="repeat(2, 1fr)"
        templateColumns="repeat(5, 1fr)"
        gap={4}
      >
        <GridItem rowSpan={2} colSpan={1} bg="tomato">
          {navChild}
        </GridItem>
        <GridItem colSpan={2} bg="papayawhip">
          {topChild}
        </GridItem>
        <GridItem colSpan={2} bg="papayawhip">
          {bottomChild}
        </GridItem>
        <GridItem colSpan={4} bg="tomato">
          <p>Some text here</p>
        </GridItem>
      </Grid>
    </div>
  );
}

export default Baselayout;
