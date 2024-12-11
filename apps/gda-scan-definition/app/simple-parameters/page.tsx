"use client";
import { Button } from "@mui/material";
import { useAction } from "next-safe-action/hooks";
import { getDetectors, updateDetectors } from "../actions/simple-actions";
import DetectorParametersForm from "../components/forms/DetectorParametersForm";

export default function SimpleParamsPage() {
  const { execute: executeGet, result: resultGet } = useAction(getDetectors);
  const { execute: executePost, result: resultPost } =
    useAction(updateDetectors);
  console.log(resultGet.data?.detectors);
  return (
    <div>
      <h1> Simple Parameters</h1>
      <Button onClick={() => executeGet()}>Fetch Detectors</Button>
      <DetectorParametersForm
        overrideDefaultValue={resultGet.data?.detectors}
        submitCallback={(data) => executePost(data)}
      />
    </div>
  );
}
