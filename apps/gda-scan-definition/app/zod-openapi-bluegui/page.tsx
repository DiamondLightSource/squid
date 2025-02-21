"use client";
import { ApiOf, Zodios, ZodiosBodyByAlias, ZodiosEndpointDefinition, ZodiosInstance, ZodiosOptions, ZodiosResponseByPath } from "@zodios/core"
import { createApiClient } from "../experiment-api/blueapi"
import { useEffect, useState } from "react";

const apiOptions: ZodiosOptions = {};

const client = createApiClient("https://i22-blueapi.diamond.ac.uk", apiOptions);
// type BlueApi = ApiOf<typeof client>;
// type Devices = ZodiosResponseByPath<BlueApi, "get", "/devices">;
// type Plans = ZodiosBodyByAlias<BlueApi, "get_plans_plans_get">;

export default function ZodOpenapiBluegui() {
    const [devices, setDevices] = useState([]);
    const [plans, setPlans] = useState([]);

    console.log(client);

    useEffect(() => {

        const fetchData = async () => {
            const devices_response = await client.get_devices_devices_get()
            const devices = devices_response.devices;
            console.log(devices_response);
            setDevices(devices_response.devices);

            const plans_response = await client.get_plans_plans_get();
            const plans = plans_response.plans;
            console.log(plans);
            setPlans(plans);
        };

        fetchData().catch(console.error);

    }, [])

    const [search, setSearch] = useState("")
    const [found, setFound] = useState({});
    return <div>


        <p> get plan by name</p>
        <form onSubmit={async (e) => {
            e.preventDefault();
            const r = await client.get_device_by_name_devices__name__get(search);
            console.log(r);
            setFound(r);
        }}>
            <input type="text" id="nameQuery" onChange={e => {
                setSearch(e.target.value);
            }} />
            <label htmlFor="nameQuery">device name you're looking for</label>
            <button type="submit">submit</button>
        </form>
        <p>found: {found.name}, {found.protocols}</p>
        <p>list avialable plans</p>
        <div>
            <ul>

                {plans.map((d, i) => {
                    return <li key={`device-${i}`}>
                        <p>
                            {d.name}
                        </p>
                        <p>
                            {d.description}
                        </p>
                    </li>
                })}
            </ul>
        </div>
        <p>list avialable devices</p>
        <div>
            <ul>

                {devices.map((d, i) => {
                    return <li key={`device-${i}`}>
                        <p>
                            {d.name}
                        </p>
                        <p>
                            {d.protocols}
                        </p>
                    </li>
                })}
            </ul>
        </div>
        <p>show current worker state</p>
    </div>

}