import { FormControl, FormLabel, Input, Select } from "@chakra-ui/react";
import { DETECTION_MODES, DetectionModeType } from "../utils/initialTypes";
import { AVAILABLE_HOLDERS, GeneratorSetup } from "../utils/sampleHolderSize";

type FormProps = {
  value: GeneratorSetup;
  handler: (g: Partial<GeneratorSetup>) => void;
};

export default function Form({ value, handler }: FormProps) {
  return (
    <>
      <h2>Input values for your samples</h2>
      <FormControl>
        <h3>form area for defaults</h3>
        <div key="form-field-1">
          <FormLabel htmlFor="defaultSelectionMode">
            Default selection (T or F)
          </FormLabel>
          <Select
            value={value.defaultDetectionMode}
            id="defaultSelectionMode"
            onChange={(e) => {
              handler({
                defaultDetectionMode: e.target.value as DetectionModeType,
              });
            }}
          >
            {DETECTION_MODES.map((v, i) => {
              return (
                <option key={`detection-mode-option-${i}`} value={v}>
                  {v}
                </option>
              );
            })}
          </Select>
        </div>

        <div key="form-field-2">
          <FormLabel htmlFor="sampleNamePrefix">
            Sample Name prefix (between 0 and 5)
          </FormLabel>
          <Input
            id="sampleNamePrefix"
            type="text"
            minLength={0}
            maxLength={15}
            value={value.sampleNamePrefix}
            onChange={(e) => {
              handler({ sampleNamePrefix: e.target.value });
            }}
          />
        </div>

        <div key="form-field-3">
          <FormLabel htmlFor="startingCount">
            starting number for creating the new name
          </FormLabel>
          <Input
            id="startingCount"
            type="number"
            max={5}
            value={value.startingCount}
            onChange={(e) => {
              handler({ startingCount: parseInt(e.target.value) });
            }}
          />
        </div>

        <div key="form-field-4">
          <FormLabel htmlFor="samplesNumber">Total number of samples</FormLabel>
          <Input
            id="samplesNumber"
            type="number"
            max={50}
            value={value.samplesNumber}
            onChange={(e) => {
              handler({ samplesNumber: parseInt(e.target.value) });
            }}
          />
        </div>

        <div key="form-field-5">
          <FormLabel htmlFor="defaultRepetitionsNumber">
            Default repetitions number (min 1)
          </FormLabel>
          <Input
            id="defaultRepetitionsNumber"
            type="number"
            max={2}
            value={value.defaultRepetitionsNumber}
            onChange={(e) => {
              handler({ defaultRepetitionsNumber: parseInt(e.target.value) });
            }}
          />
        </div>
        <div key="form-field-6">
          <FormLabel htmlFor="holderSelection">Holder selection</FormLabel>
          <Select
            value={value.holder.name}
            id="holderSelection"
            onChange={(e) => {
              const n: number = parseInt(e.target.value);
              const newHolder = AVAILABLE_HOLDERS[n];
              // window.alert(newHolder.name);
              handler({
                holder: newHolder,
              });
            }}
          >
            {AVAILABLE_HOLDERS.map((v, i) => {
              return (
                <option key={`holder-option-${i}`} value={i.toString()}>
                  {v.name}
                </option>
              );
            })}
          </Select>
        </div>
      </FormControl>
    </>
  );
}
