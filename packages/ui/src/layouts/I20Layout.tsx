import { Grid, GridItem } from "@chakra-ui/react";

import React from "react";

type I20LayoutProps = {
  navChild: React.ReactNode;
  topChild: React.ReactNode;
  bottomChild: React.ReactNode;
};

function I20layout({ navChild, topChild, bottomChild }: I20LayoutProps) {
  return (
    <div>
      <h2>I20 layout here</h2>
      <Grid
        h="200px"
        templateRows="repeat(4, 1fr)"
        templateColumns="repeat(2, 1fr)"
        gap={2}
      >
        <GridItem rowSpan={4} colSpan={2} bg="tomato">
          {navChild}
        </GridItem>
        <GridItem colSpan={3} bg="papayawhip">
          {topChild}
        </GridItem>
        <GridItem colSpan={1} bg="papayawhip">
          {bottomChild}
        </GridItem>
        <GridItem colSpan={4} bg="tomato">
          <p>Some text here</p>
        </GridItem>
      </Grid>
    </div>
  );
}

export default I20layout;
