import { K } from "./zodSchemas";

export function generateKArray2D(
    baseK: Omit<K, "myParam" | "float">, // Base object without varying fields
    myParamRange: { min: number; max: number; step: number },
    floatRange: { min: number; max: number; step: number }
): K[] {
    return Array.from(
        { length: Math.floor((myParamRange.max - myParamRange.min) / myParamRange.step) + 1 },
        (_, i) => myParamRange.min + i * myParamRange.step
    ).flatMap((myParam) =>
        Array.from(
            { length: Math.floor((floatRange.max - floatRange.min) / floatRange.step) + 1 },
            (_, j) => floatRange.min + j * floatRange.step
        ).map((float) => ({
            ...baseK,
            myParam: Math.round(myParam), // Ensure integer value
            float: parseFloat(float.toFixed(6)), // Avoid floating point precision issues
        }))
    );
}
