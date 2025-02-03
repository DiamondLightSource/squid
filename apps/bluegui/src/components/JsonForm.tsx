import { useEffect, useState } from "react";
import { Plan } from "../hooks/usePlans";
import { PlansMenu } from "./PlanMenu";
import { SinglePlanDisplay } from "./SinglePlanDisplay";
import { Grid } from "@mui/material";

interface PlansResponse {
  plans: Plan[];
}

function JsonForm() {
  const [plans, setPlans] = useState<any[]>([]);
  const [currentPlan, setPlan] = useState<any>(null);
  const [selectedOption, setSelectedOption] = useState<Plan | undefined>();
  const [options, setOptions] = useState<any>({});
  const [planMap, setPlanMap] = useState<Map<string, Plan>>(new Map([]));

  useEffect(() => {
    fetch("/api/plans")
      .then(async (r: Response) => {
        const pr: PlansResponse = await r.json();
        setPlans(pr.plans);
        const entries: any[] = [];
        const pm: Map<string, string> = new Map();
        pr.plans.forEach((plan) => {
          pm.set(plan.name, plan);
          const entry = { value: plan.name, label: plan.name };
          entries.push(entry);
        });
        setPlanMap(pm);
        setOptions(entries);
      })
      .catch((e) => {
        console.error(e);
      });
  }, []);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "flex-start",
        justifyContent: "start",
      }}
    >
      <div id="plans-list" style={{ padding: "4px", margin: "4px" }}>
        <h2>i22 Bluesky Plans</h2>
        {plans.length == 0 ? (
          <p> No plans here!</p>
        ) : (
          <PlansMenu
            selectedOption={selectedOption}
            setSelectedOption={setSelectedOption}
            setPlan={setPlan}
            planMap={planMap}
            options={options}
          />
        )}
      </div>
      <div id="one-plan">
        {currentPlan !== null && (
          <div className="left">
            <SinglePlanDisplay currentPlan={currentPlan} />
          </div>
        )}
      </div>
    </div>
  );
}

export default JsonForm;
