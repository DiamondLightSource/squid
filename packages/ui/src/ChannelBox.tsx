import { Box, Button, FormLabel, HStack, Input } from "@chakra-ui/react";
import React, { useState } from "react";

type ChannelBoxProps = {
  min: number;
  max: number;
  readChannel: string;
  writeChannel: string;
  name: string;
  unit: string;
  defaultStep: number;
};

function OldSchoolChannelBox({
  min,
  max,
  readChannel,
  writeChannel,
  name,
  unit,
  defaultStep,
}: ChannelBoxProps) {
  const [step, setStep] = useState<number>(defaultStep);

  return (
    <Box style={{ backgroundColor: "gray" }}>
      {/* top row */}
      <HStack>
        <p>{name}</p>
        <Button onClick={() => console.log("killing process: ", name)}>
          Kill
        </Button>
        <Button onClick={() => console.log("goto process: ", name)}>Go</Button>
      </HStack>

      {/* plus minus row  */}
      <HStack>
        <Button onClick={() => console.log("killing process: ", name)}>
          -
        </Button>
        {writeChannel}
        <Button onClick={() => console.log("killing process: ", name)}>
          +
        </Button>
      </HStack>

      {/* readout row */}
      <HStack>
        <p>moveIndicator</p>
        {readChannel}
        <p>alarm indicator</p>
      </HStack>

      {/* step size row */}
      <HStack>
        <Button onClick={() => console.log("killing process: ", name)}>
          More
        </Button>
        <Input
          type="number"
          value={step}
          onChange={(e) => setStep(parseInt(e.target.value))}
        />

        <Button onClick={() => console.log("stopping motor: ", name)}>
          STOP
        </Button>
      </HStack>
    </Box>
  );
}

/**
 *
 * can see the ranges
 * can see adjustment level fast
 * can color code when it is moving
 */
export function SkeuomorphicChannelBox({
  min,
  max,
  readChannel,
  writeChannel,
  name,
}: ChannelBoxProps) {
  const value = 1.0;
  const [desired, setDesired] = useState<number>();
  return (
    <Box style={{ background: "beige" }}>
      <p>{name}</p>
      <Box>
        <FormLabel htmlFor="readRange">Read value</FormLabel>
        <Input
          readOnly
          id="readRange"
          type="range"
          value={value}
          min={min}
          max={max}
        />
      </Box>
      <Box>
        <FormLabel htmlFor="readRange">Read value</FormLabel>
        <Input
          id="writeRange"
          type="range"
          value={value}
          min={min}
          max={max}
          onChange={(e) => setDesired(parseInt(e.target.value))}
        />
      </Box>
    </Box>
  );
}

// todo use websockets hook
function useWriteValue(channelId: string) {
  const [first, setfirst] = useState("");
}

export default OldSchoolChannelBox;
