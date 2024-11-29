import { describe, expect, it } from "vitest";
import { mockData } from "../components/mockData";
import {
  autogenerateSampleNames,
  defaultGeneratorSetup,
  generateRows,
  toAlphabet,
} from "./sampleHolderSize";

describe("generate rows", () => {
  it("normal case", () => {
    const r = generateRows(defaultGeneratorSetup);
    console.debug(r);
    expect(r).toEqual(mockData);
  });
});

describe("auto sample names", () => {
  it("normal case", () => {
    const r = autogenerateSampleNames("test", 1, 4);
    expect(r).toMatchObject(["test_1", "test_2", "test_3", "test_4"]);
  });
});

describe("to number", () => {
  it("letter A", () => {
    const r = toAlphabet(1);
    expect(r).toBe("A");
  });
  it("letter T", () => {
    const r = toAlphabet(25);
    expect(r).toBe("Y");
  });
});
