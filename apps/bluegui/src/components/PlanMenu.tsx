import Select from "react-select";
import { Plan } from "../hooks/usePlans";

type PlansMenuProps = {
  selectedOption: any;
  setSelectedOption: any;
  setPlan: (c: Plan) => void;
  planMap: Map<string, Plan>;
  options: any;
};

export function PlansMenu({
  selectedOption,
  setSelectedOption,
  setPlan,
  planMap,
  options,
}: PlansMenuProps) {
  return (
    <div className="menu">
      <h3> Available Plans</h3>
      <Select
        defaultValue={selectedOption}
        onChange={(newValue) => {
          setSelectedOption(newValue);
          const c = planMap.get(newValue.value);
          if (c) {
            setPlan(c);
          }
        }}
        options={options}
      />
    </div>
  );
}
