import React, { Suspense, useMemo, useState } from 'react';
import {
    materialCells,
    materialRenderers,
} from '@jsonforms/material-renderers';
import { JsonForms } from '@jsonforms/react';
import { Button } from '@mui/material';
import { usePlanByName } from '../hooks';

const prefixesToChange = ['dodal.', 'ophyd.', 'ophyd_async.', 'bluesky.'];


function modifySchemaTypes(schema: any): any {
    if (schema && schema.properties) {
        Object.keys(schema.properties).forEach((key) => {
            const property = schema.properties[key];
            // console.dir(property);

            // Check if the property is an object and has a type property
            if (typeof property === 'object') {
                // If the type exists and matches one of the prefixes, change it to string
                if (property.type && prefixesToChange.some(prefix => property.type.startsWith(prefix))) {
                    property.type = 'string';
                }

                // Recurse into nested properties if they are objects with properties
                if (property.properties) {
                    modifySchemaTypes(property);
                }

                // Handle nested items array (like in your 'detectors' property)
                if (property.items) {
                    Object.keys(property.items).forEach((item, i) => {
                        if (item.type && prefixesToChange.some(prefix => item.type.startsWith(prefix))) {
                            property.items[i].type = 'string';
                        }

                    })
                }
                // todo this would need to be added to baseline, devices, etc, etc not just detectors and otherwise it would fail
                if (property.detectors && property.detectors.items) {
                    Object.keys(property.detectors.items).forEach((item, i) => {
                        console.log(`item: ${item}`)
                        if (item.type && prefixesToChange.some(prefix => item.type.startsWith(prefix))) {
                            property.detectors.items.type = 'string';
                        }

                    })
                }
            }
        });
    }
    return schema;
}


const PlanForm = ({ planName }: { planName: string }) => {
    const { plan, loading, error } = usePlanByName(planName);

    // Derived State: Memoized JSON Schema
    const schema = useMemo(() => {
        const derivedSchema = plan?.schema;
        const finalSchema = modifySchemaTypes(derivedSchema);
        // console.dir(finalSchema);
        return finalSchema ?? {}
    }, [plan]);

    // console.log(`jsonschema: ${schema}`)
    // console.dir(schema);

    const [data, setData] = useState();
    const handleSubmit = ({ formData }: { formData: any }) => {
        console.log('Form submitted with:', formData);
    };

    const Fallback = () => <div>Loading...</div>;
    if (loading) return <p>Loading...</p>;
    if (error) return <p style={{ color: 'black' }}>Error: {error}</p>;
    if (!plan) return <p>No plan found.</p>;

    return (
        <div>
            <h2 style={{ color: 'black' }}>Run Plan: {plan.name}</h2>
            <Button variant="contained" color="primary" sx={{ mt: 2 }} onClick={
                () => {
                    handleSubmit(data)
                }
            }>
                Submit Plan
            </Button>
            <Suspense fallback={<Fallback />}>
                {/* <JsonForms
                    schema={schema}
                    // uischema={uischema}
                    data={data}
                    renderers={materialRenderers}
                    cells={materialCells}
                    onChange={({ data }) => setData(data)}
                /> */}
            </Suspense >

        </div>
    );
};

export default PlanForm;
