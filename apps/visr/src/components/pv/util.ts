import { DType } from "@diamondlightsource/cs-web-lib";
export type RawValue = DType | "not connected" | undefined;

export function forceString(value: RawValue | string | number): string {
  let displayValue: string;
  if (value != "not connected" && value != undefined) {
    const stringVal =
      typeof (value as DType)["getStringValue"] === "function"
        ? (value as DType).getStringValue()
        : value;
    displayValue = stringVal ? stringVal.toString() : "undefined";
  } else if (value === "not connected") {
    displayValue = "not connected";
  } else {
    displayValue = "undefined";
  }
  return displayValue;
}

export function parseNumericPv(
  value: string | number | DType | undefined,
  decimals?: number,
  scaleFactor?: number
) {
  const decimalsToUse = decimals ? decimals : 2;
  const scaleFactorToUse = scaleFactor ? scaleFactor : 1;
  if (value === undefined) {
    return "undefined";
  }
  if (typeof (value as DType)["getStringValue"] === "function") {
    const numValue = (value as DType).getDoubleValue();
    if (numValue === undefined) {
      return "undefined";
    } else {
      return (numValue * scaleFactorToUse).toFixed(decimalsToUse);
    }
  } else {
    return value.toString();
  }
}

function intArrayToString(arrValue: number[]) {
  return String.fromCharCode.apply(null, arrValue);
}

export function pvIntArrayToString(value: RawValue): string {
  if (value === undefined) {
    return "undefined";
  } else if (value === "not connected") {
    return "not connected";
  } else {
    const arrValue = value.getArrayValue();
    if (arrValue === undefined) {
      return "undefined";
    } else {
      return intArrayToString(arrValue as unknown as number[]);
    }
  }
}
