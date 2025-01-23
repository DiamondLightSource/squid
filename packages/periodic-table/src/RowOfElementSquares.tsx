import { ElementType } from "./elements";
import ElementSquare from "./ElementSquare";

function range(start: number, stop: number, step: number = 1) {
  const length = (stop - start) / step + 1;
  return Array.from({ length }, (_, i) => start + i * step);
}

type RowOfElementSquaresProps = {
  start: number;
  end: number;
  callback: (e: ElementType) => void;
};

export function RowOfElementSquares({
  start,
  end,
  callback,
}: RowOfElementSquaresProps) {
  const arr = range(start, end);
  const id = `row-starting-with-${start}`;
  return (
    <div id={id} key={id} style={{ display: "flex" }}>
      {arr.map((n, i) => (
        <ElementSquare key={i} atomicNumber={n} callback={callback} />
      ))}
    </div>
  );
}
