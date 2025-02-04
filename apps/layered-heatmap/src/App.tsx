import { MockProvider } from "@h5web/app";
import {
  Annotation, DefaultInteractions, HeatmapVis,
  Overlay,
  Pan,
  ResetZoomButton,
  VisCanvas,
  Zoom,
  getDomain,
  mockValues,
} from "@h5web/lib";
import React from "react";
import "./App.css";

const twoD = mockValues.twoD();
const domain = getDomain(twoD.data);
function MyApp() {
  return (
    <>
      <h1>Vite + React</h1>
      <MockProvider>
        {/* <App sidebarOpen={false} /> */}

        <VisCanvas
          abscissaConfig={{ visDomain: [0, 3], showGrid: true }}
          ordinateConfig={{ visDomain: [50, 100] }}
        >
          <Zoom />
          <Pan />
          <ResetZoomButton />
          <Overlay
            style={{
              background:
                "linear-gradient(135deg, #444cf715 25%, transparent 25%) -20px 0/ 40px 40px, linear-gradient(225deg, #444cf715 25%, transparent 25%) -20px 0/ 40px 40px, linear-gradient(315deg, #444cf715 25%, transparent 25%) 0px 0/ 40px 40px, linear-gradient(45deg, #444cf715 25%, #e5e5f715 25%) 0px 0/ 40px 40px",
            }}
          >
            <div
              style={{ padding: "0 1rem", maxWidth: "60%", minWidth: "15em" }}
            >
              <p>
                This HTML overlay fills the canvas but lets pointer events
                through. Unlike <code>Annotation</code>, it is not affected by
                panning/zooming.
              </p>
              <p>
                By default, children of <code>Overlay</code> can overflow the
                bounds of the canvas. This can be changed with:{" "}
                <code>{`<Overlay style={{ overflow: 'hidden' }} />`}</code>
              </p>
              <HeatmapVis dataArray={twoD} domain={domain}>
                <DefaultInteractions />
                <Annotation x={10} y={16} style={{ color: "white" }}>
                  HTML annotation positioned at (10, 16)
                </Annotation>
                <Annotation
                  x={25}
                  y={10}
                  center
                  style={{ width: 180, color: "white", textAlign: "center" }}
                >
                  Another annotation, <strong>centred</strong> on (25, 10)
                </Annotation>
              </HeatmapVis>
            </div>
          </Overlay>
        </VisCanvas>
        {/* <HeatmapVis dataArray={twoD} domain={domain}>
          <DefaultInteractions />
          <Annotation x={10} y={16} style={{ color: "white" }}>
            HTML annotation positioned at (10, 16)
          </Annotation>
          <Annotation
            x={25}
            y={10}
            center
            style={{ width: 180, color: "white", textAlign: "center" }}
          >
            Another annotation, <strong>centred</strong> on (25, 10)
          </Annotation>
        </HeatmapVis> */}
      </MockProvider>
    </>
  );
}

export default MyApp;
