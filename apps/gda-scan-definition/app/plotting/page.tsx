"use client";
import "@h5web/app/dist/styles.css";

import { assertNonNull, enableBigIntSerialization } from "@h5web/app";

import React from "react";
import { App, MockProvider } from "@h5web/app";
import dynamic from "next/dynamic";

// Dynamically import the `App` and `MockProvider` components from @h5web/app
const DynamicApp = dynamic(() => import("@h5web/app").then((mod) => mod.App), {
  ssr: false,
});
const DynamicMockProvider = dynamic(
  () => import("@h5web/app").then((mod) => mod.MockProvider),
  { ssr: false }
);

// Dynamically import the enableBigIntSerialization function
const enableBigIntSerialization = async () => {
  const { enableBigIntSerialization: enable } = await import("@h5web/app");
  enable();
};
export default function PlottingPage() {
  React.useEffect(() => {
    // Call enableBigIntSerialization on the client only
    enableBigIntSerialization();
  }, []);

  return (
    <div>
      <h1>here testing plotting with h5wb</h1>
      <div style={{ height: "100vh" }}>
        {/* <MockProvider>
          <App />
        </MockProvider> */}
        <DynamicMockProvider>
          <DynamicApp />
        </DynamicMockProvider>
      </div>
    </div>
  );
}
