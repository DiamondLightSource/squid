import { ChemicalElement, allowedElements } from "../data/elements";
import { DetectionModeType, EdgeType, Holder } from "./initialTypes";

const smallSampleHolder: Holder = { name: "small", width: 4, height: 6 };

const mediumSampleHolder: Holder = {
  name: "medium",
  width: 6,
  height: 8,
};

const largeSampleHolder: Holder = {
  name: "large",
  width: 10,
  height: 10,
};

export const AVAILABLE_HOLDERS: Holder[] = [
  smallSampleHolder,
  mediumSampleHolder,
  largeSampleHolder,
];

export type ReadyRow = {
  element: ChemicalElement; //validate between 13 and 93 Z
  edge: EdgeType;
  detectionMode: DetectionModeType;
  sampleName: string;
  sampleComment: string;
  column_letter: string;
  row: number; // min 1
  repetitions: number; // min 1
};

export const defaultGeneratorSetup: GeneratorSetup = {
  defaultDetectionMode: "T",
  sampleNamePrefix: "sample",
  startingCount: 0,
  samplesNumber: 10,
  defaultRepetitionsNumber: 2,
  holder: smallSampleHolder,
  defaultElement: allowedElements[0],
};

export type GeneratorSetup = {
  defaultElement: ChemicalElement;
  defaultDetectionMode: DetectionModeType;
  sampleNamePrefix: string;
  startingCount: number;
  // no space for comment
  samplesNumber: number;
  defaultRepetitionsNumber: number;
  holder: Holder;
};

export function generateRows({
  defaultDetectionMode,
  sampleNamePrefix,
  startingCount,
  samplesNumber,
  defaultRepetitionsNumber,
  holder,
}: GeneratorSetup): ReadyRow[] {
  const names: string[] = autogenerateSampleNames(
    sampleNamePrefix,
    startingCount,
    samplesNumber
  );

  const rows: ReadyRow[] = names.map((n, i) => {
    const colNumber = Math.floor(i / holder.height) + 1;
    const rowNumber = (i % holder.height) + 1;
    const colName = toAlphabet(colNumber);

    const r: ReadyRow = {
      element: allowedElements[0],
      edge: "K",
      detectionMode: defaultDetectionMode,
      sampleName: n,
      sampleComment: "",
      column_letter: colName,
      row: rowNumber,
      repetitions: defaultRepetitionsNumber,
    };
    return r;
  });
  return rows;
}

// HELPER FUNCTIONS
// https://www.tutorialspoint.com/convert-number-to-alphabet-letter-javascript
export function toAlphabet(num: number): string {
  if (num < 1 || num > 26 || typeof num !== "number") {
    // todo error handling
    return "1";
  }
  const leveller = 64;
  // since actually A is represented by 65 and we want to represent it with one
  return String.fromCharCode(num + leveller);
}

export function autogenerateSampleNames(
  prefix: string,
  startingCount: number,
  samplesNumber: number
): string[] {
  const arr = new Array(samplesNumber).fill(prefix);
  return arr.map((p, i) => `${p}_${startingCount + i}`);
}

export function getCsvContent(table: ReadyRow[]): string {
  const headers: string[] = Object.getOwnPropertyNames(table[0]);
  console.log(headers)
  console.log(table[0])
  const valueRows = table.map((e) =>
    [
      e.element.symbol,
      e.detectionMode,
      e.edge,
      e.sampleName,
      e.sampleComment,
      e.column_letter,
      e.row,
      e.repetitions
    ].join(",")
  );
  const finalString = [headers, ...valueRows].join("\n");
  console.log(finalString)
  return finalString;
}
