import { Box, Input } from "@chakra-ui/react";
import { ChemicalElement, allowedElements } from "../data/elements";

type ElementPickerProps = {
  callback: (e: ChemicalElement) => void;
};

function ElementPicker({ callback }: ElementPickerProps) {
  return (
    <Box>
      ElementPicker
      <Input type="number" id="atomic-number">
        Input the atomic number
      </Input>
      <Box>
        {allowedElements.map((e, i) => {
          return (
            <p id={`element-${i}`} onClick={() => callback(e)}>
              {e.symbol} - {e.name}
            </p>
          );
        })}
      </Box>
    </Box>
  );
}

export default ElementPicker;
