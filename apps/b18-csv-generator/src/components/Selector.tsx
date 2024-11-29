import { useEffect, useState } from "react";
import {
  DETECTION_MODES,
  DETECTORS,
  DetectionModeType,
  EdgeType,
} from "../utils/initialTypes";
import { ReadyRow } from "../utils/sampleHolderSize";

// todo use this for partial updates
type SelectionHandler = {
  elementSelections: Element[];
  edgeSelections: EdgeType[];
};

type SelectorProps = {
  propRows: ReadyRow[];
};

function Selector({ propRows }: SelectorProps) {
  const [selection, _] = useState<SelectionHandler>();

  const [rows, setRows] = useState<ReadyRow[]>(propRows);

  useEffect(() => {
    // todo on selection approval change update the rows
  }, [selection, rows]);

  // const handleDeltaSelection = (e: React.ChangeEvent) => {
  //   setSelection(e.target.value);
  // };

  // todo add table headers
  return (
    <div>
      <h3>Your samples table</h3>
      <table>
        {rows.map((r, i) => {
          return (
            <tr>
              {/* // todo add adaptive changes here */}
              <td>{r.edge} </td>
              <td>
                <select
                  multiple
                  size={DETECTORS.length}
                  value={r.detectionMode}
                  onChange={(e) =>
                    setRows((rows) => {
                      const v = e.target.value;
                      // todo add alerts library
                      if (!DETECTION_MODES.includes(v as DetectionModeType)) return rows;
                      rows[i].detectionMode = v as DetectionModeType;
                      return rows;
                    })
                  }
                >
                  {DETECTORS.map((d) => (
                    <option value={d}>{d}</option>
                  ))}
                </select>
              </td>
              <td>{r.edge} </td>
              <td>{r.sampleComment} </td>
              <td>{r.edge} </td>
              <td>
                <input
                  type="text"
                  value={r.sampleComment}
                  onChange={(e) =>
                    setRows((rows) => {
                      rows[i].sampleComment = e.target.value;
                      return rows;
                    })
                  }
                />
              </td>
            </tr>
          );
        })}
      </table>
    </div>
  );
}

export default Selector;
