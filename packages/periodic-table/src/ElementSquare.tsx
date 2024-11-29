import { Square } from "./Square";
import Element from "./Element";
import { MARGIN, SQUARE_SIZE } from "./constants";
import { ElementType } from "./elements";

type Props = {
  atomicNumber: number;
  callback: (e: ElementType) => void;
  size?: number;
  margin?: number;
};

function ElementSquare({
  atomicNumber,
  callback,
  size = SQUARE_SIZE,
  margin = MARGIN,
}: Props) {
  return (
    <Square key={`square-${atomicNumber}`} size={size} margin={margin}>
      <Element atomicNumber={atomicNumber} callback={callback} />
    </Square>
  );
}

export default ElementSquare;
