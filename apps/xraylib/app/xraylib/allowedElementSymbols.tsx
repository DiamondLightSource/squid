import { elements } from "@diamondlightsource/periodic-table/elements";

export const allowedElementSymbols = elements
  .filter((e) => {
    const n = parseInt(e.Number);
    return 1 <= n && n < 109;
  })
  .map((element) => element.Symbol) as [string, ...string[]];
