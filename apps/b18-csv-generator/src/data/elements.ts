
import { elements } from "@diamondlightsource/periodic-table/elements";

export const allowedElements = elements.filter(
  (e) => parseInt(e.Number) >= 13 && parseInt(e.Number) <= 93
);
