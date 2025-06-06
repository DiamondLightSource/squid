import { DetectorType, MonocrystalType, Offsets } from "./initialTypes";
import { usePathname } from 'next/navigation'

export type ExternalSetup = {
  xMotorName: string;
  yMotorName: string;
  detector: DetectorType;
  monocrystal: MonocrystalType;
  offsets: Offsets; 
};

import {
  compressToEncodedURIComponent,
  decompressFromEncodedURIComponent,
} from "lz-string";

export function getShareableLink(data: ExternalSetup): string {
  // Assuming `data` is your form data object
  const jsonData = JSON.stringify(data);
  const compressedData = compressToEncodedURIComponent(jsonData);

  const path = usePathname();
  const shareableUrl = `${path}?data=${compressedData}`;
  return shareableUrl;
}

export function getDecompressedData(): ExternalSetup | undefined {
  const params = new URLSearchParams(window.location.search);
  const compressedData = params.get("data");
  if (!compressedData) return; // Handle error or empty case appropriately

  const jsonData = decompressFromEncodedURIComponent(compressedData);
  if (!jsonData) return; // Handle error or decompression failure

  return JSON.parse(jsonData);
}

// old variant without compression
// function serialize(data: ExternalSetup): string {
//   return Object.keys(data)
//     .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`)
//     .join("&");
// }

// function parseQueryString(): ExternalSetup {
//   const params = new URLSearchParams(window.location.search);
//   const data: Partial<ExternalSetup> = {};
//   params.forEach((value, key) => {
//     data[key] = value;
//   });
//   return data as ExternalSetup;
// }
