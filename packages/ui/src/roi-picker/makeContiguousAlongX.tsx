import { Roi } from "./types";

const makeContiguousAlongX = (distance: number, preferFirst: boolean, regions: Roi[]): Roi[] => {
    // Sort regions by xStart to ensure left-to-right processing
    const sortedRegions = [...regions].sort((a, b) => a.xStart - b.xStart);

    const updatedRegions = sortedRegions.map((roi) => ({ ...roi }));

    for (let i = 0; i < updatedRegions.length - 1; i++) {
        const current = updatedRegions[i];
        const next = updatedRegions[i + 1];

        const gap = next.xStart - current.xEnd;

        // Check if the regions are within the snapping distance
        if (gap <= distance) {
            if (preferFirst) {
                // Move the second region to start where the first ends
                updatedRegions[i + 1] = {
                    ...next,
                    xStart: current.xEnd,
                };
            } else {
                // Move the first region to end where the second starts
                updatedRegions[i] = {
                    ...current,
                    xEnd: next.xStart,
                };
            }
        }
    }

    return updatedRegions;
};

export default makeContiguousAlongX;
