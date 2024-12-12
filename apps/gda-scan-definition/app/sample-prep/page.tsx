"use client";
import { ElementType } from "@diamondlightsource/periodic-table/elements";
import { PeriodicTable } from "@diamondlightsource/periodic-table/table";
import SamplesLayoutGrid from "./components/EditableGrid";
import TableManager from "./components/ZodGrid";

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
