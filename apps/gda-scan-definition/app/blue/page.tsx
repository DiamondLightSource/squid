"use client";
import { useState, useEffect } from "react";
import { blueapiClient } from "../clients/blueapi/client.gen";
import { getPlans } from "../clients/blueapi";
import { GetPlansPlansGetResponse, PlanResponse } from "../clients/blueapi";

export default function Blue() {

    const [plans, setPlans] = useState([]);
    useEffect(() => {

        const fetchData = async () => {

            console.log(`client: ${blueapiClient}`);
            console.dir(blueapiClient, { depth: null });

            const plans_response: PlanResponse = await blueapiClient.get();
            const plans = plans_response.plans;
            console.log(plans);
            setPlans(plans);
        };

        fetchData().catch(console.error);

    }, [])

    return <div>


        <p>list avialable plans</p>
        <div>
            <ul>

                {plans.map((p, i) => {
                    return <li key={`device-${i}`}>
                        <p>
                            {p.name}
                        </p>
                        <p>
                            {p.description}
                        </p>
                    </li>
                })}
            </ul>
        </div>

    </div>
}