// https://graphqleditor.com/blog/enums-are-still-bad/


// contact defined
// x motor name, y motor name

export const DETECTORS = ["xpress4odin", "xspress3"] as const;

export type DetectorType = (typeof DETECTORS)[number];

export const MONOCRYSTAL = ["Si111", "Si311"] as const;

export type MonocrystalType = (typeof MONOCRYSTAL)[number];

export type Offsets = {
  x_offset_mm: number;
  y_offset_mm: number;
  distance_x_mm: number;
  distance_y_mm: number;
};

// user defined
export const EDGES = ["K", "L", "M"] as const;

export type EdgeType = (typeof EDGES)[number];
export const DETECTION_MODES = ["T", "F"] as const;

export type DetectionModeType = (typeof DETECTION_MODES)[number];

export type Holder = {
  name: string
  width: number;
  height: number;
};

