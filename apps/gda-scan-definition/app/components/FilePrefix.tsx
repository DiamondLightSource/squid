"use client";

import DetectorParametersForm from "./forms/DetectorParametersForm";
import OutputParametersForm from "./forms/OutputForm";
import { ParamsForm } from "./forms/ParamsForm";
import SampleParametersForm from "./forms/SampleForm";

export enum FilePrefix {
  QEXEAFS = "QEXAFS",
  Detector = "Detector",
  Sample = "Sample",
  Output = "Output",
}

const UnknownFileForm = () => <div>Unknown File Form</div>;

type ComponentMap = {
  [key in FilePrefix]: () => JSX.Element;
};

const componentMap: ComponentMap = {
  [FilePrefix.QEXEAFS]: ParamsForm,
  [FilePrefix.Detector]: DetectorParametersForm,
  [FilePrefix.Sample]: SampleParametersForm,
  [FilePrefix.Output]: OutputParametersForm,
};

export function getComponentForFilename(filename: string): () => JSX.Element {
  const match = filename.match(/^([A-Za-z]+)_Parameters\.xml$/);
  if (!match) return UnknownFileForm;

  const prefix = match[1] as FilePrefix;
  const r = componentMap[prefix];
  return r || UnknownFileForm;
}
