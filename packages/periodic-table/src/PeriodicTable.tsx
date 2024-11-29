import ElementSquare from "./ElementSquare";
import { RowOfElementSquares } from "./RowOfElementSquares";
import { Rectangle } from "./Square";
import { MARGIN, SQUARE_SIZE } from "./constants";
import { ElementType } from "./elements";

type PeriodicTableProps = {
  callback: (element: ElementType) => void;
  squareSize?: number;
  margin?: number;
};

export function PeriodicTable({
  callback,
  squareSize = SQUARE_SIZE,
  margin = MARGIN,
}: PeriodicTableProps) {
  return (
    <div className="periodic-table" style={{ display: "inline-block" }}>
      <div style={{ display: "flex", flexDirection: "column" }}>
        {/* H He*/}
        <div className="period-1" style={{ display: "flex" }}>
          <ElementSquare atomicNumber={1} callback={callback} />
          <Rectangle
            height={squareSize}
            width={16.5 * squareSize + margin * 2 * 16}
            margin={margin}
          />
          <ElementSquare atomicNumber={2} callback={callback} />
        </div>

        {/* Li Be B C N O F Ne */}
        <div className="period-2" style={{ display: "flex" }}>
          <RowOfElementSquares start={3} end={4} callback={callback} />
          <Rectangle
            height={squareSize}
            width={10.5 * squareSize + margin * 2 * 10}
            margin={margin}
          />
          <RowOfElementSquares start={5} end={10} callback={callback} />
        </div>
        {/* Na towards Ar */}
        <div className="period-3" style={{ display: "flex" }}>
          <RowOfElementSquares start={11} end={12} callback={callback} />
          <Rectangle
            height={squareSize}
            width={10.5 * squareSize + margin * 2 * 10}
            margin={margin}
          />
          <RowOfElementSquares start={13} end={18} callback={callback} />
        </div>

        {/* d metals appear in period 4 */}
        <div className="period-4" style={{ display: "flex" }}>
          <RowOfElementSquares start={19} end={21} callback={callback} />
          <Rectangle
            height={squareSize}
            width={0.5 * squareSize}
            margin={margin}
          />
          <RowOfElementSquares start={22} end={36} callback={callback} />
        </div>

        {/* Rb --Ag-- I Xe */}
        <div className="period-5" style={{ display: "flex" }}>
          <RowOfElementSquares start={37} end={39} callback={callback} />
          <Rectangle
            height={squareSize}
            width={0.5 * squareSize}
            margin={margin}
          />
          <RowOfElementSquares start={40} end={54} callback={callback} />
        </div>

        {/* Cs Lanthanium --- Pt Au Hg -- Pb -- Rn */}
        <div className="period-6" style={{ display: "flex" }}>
          <RowOfElementSquares start={55} end={57} callback={callback} />
          <Rectangle
            height={squareSize}
            width={0.5 * squareSize}
            margin={margin}
          />
          <RowOfElementSquares start={72} end={86} callback={callback} />
        </div>
        {/* Fr Ra Ac and thehose behond 108, terminating with Oganesson */}
        <div className="period-7" style={{ display: "flex" }}>
          <RowOfElementSquares start={87} end={89} callback={callback} />
          <Rectangle
            height={squareSize}
            width={0.5 * squareSize}
            margin={margin}
          />
          <RowOfElementSquares start={104} end={118} callback={callback} />
        </div>
        <div style={{ height: 0.5 * SQUARE_SIZE }}></div>
        {/* lantanides */}
        <div className="period-8" style={{ display: "flex" }}>
          <Rectangle
            height={squareSize}
            width={3.5 * squareSize + 3 * 2 * margin}
            margin={margin}
          />
          <RowOfElementSquares start={58} end={71} callback={callback} />
        </div>
        {/* actinides */}
        <div className="period-9" style={{ display: "flex" }}>
          <Rectangle
            height={squareSize}
            width={3.5 * squareSize + 3 * 2 * margin}
            margin={margin}
          />
          <RowOfElementSquares start={90} end={103} callback={callback} />
        </div>
      </div>
    </div>
  );
}
