"use client";
import { PeriodicTable } from "@diamondlightsource/periodic-table/table";
import SamplesLayoutGrid from "./components/EditableGrid";
import { ElementType } from "@diamondlightsource/periodic-table/elements";
import { Table } from "@mui/material";
import TableManager from "./components/ZodGrid";

/*
todo 
- [ ] add column groups https://mui.com/x/react-data-grid/column-groups/
- [ ] add validation with Zod
- [ ] consider how are the actual rows created
- [ ] add a 3d visualisation of the sample holder, and position of the samples by name
- [ ] add SingleSelect for edge and detectionMode 'singleSelect' and `.valueOptions`
- [ ] from the start make it work with the generator
- [ ] hold a datamodel and allow downloading it as csv aiwth getCsvContent

*/
export default function SamplePrepPage() {
  return (
    <div>
      <h1>Sample prep</h1>
      <PeriodicTable
        callback={(e: ElementType) => {
          alert(`You clicked on ${e["Symbol"]}`);
        }}
      />
      <SamplesLayoutGrid />
      <TableManager />
    </div>
  );
}
