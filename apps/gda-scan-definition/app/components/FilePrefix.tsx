"use client";

import { ParamsEdition } from "./ParamsEdition";

export enum FilePrefix {
  QEXEAFS = "QEXEAFS",
  Detector = "Detector",
  Sample = "Sample",
  Output = "Output",
}

const DetectorParametersForm = () => <div>Detector Parameters Form</div>;
const SampleParametersForm = () => <div>Sample Parameters Form</div>;
const OutputParametersForm = () => <div>Output Parameters Form</div>;
const UnknownFileForm = () => <div>Unknown File Form</div>;

type ComponentMap = {
  [key in FilePrefix]: () => JSX.Element;
};

const componentMap: ComponentMap = {
  [FilePrefix.QEXEAFS]: ParamsEdition,
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
