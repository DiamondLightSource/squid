"use client";
import { Button } from "@mui/material";
import { useAction } from "next-safe-action/hooks";
import { getDetectors } from "../actions/simple-actions";
import DetectorParametersForm from "../components/forms/DetectorParametersForm";
// todo hard code the one form, and a simple context also defined here
// add also the simple action for fetching existing data, and overwriting it
// besides the form add a diff editor

export default function SimpleParamsPage() {
  const { execute, result } = useAction(getDetectors);
  return (
    <div>
      <h1> Simple Parameters</h1>
      <Button onClick={() => execute()}>Fetch Detectors</Button>
      <DetectorParametersForm overrideDefaultValue={result.data?.detectors} />
    </div>
  );
}
