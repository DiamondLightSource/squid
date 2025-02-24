import React, { useMemo, useState } from 'react';
import {
    materialCells,
    materialRenderers,
} from '@jsonforms/material-renderers';
import { JsonForms } from '@jsonforms/react';
import { Button } from '@mui/material';
import { usePlanByName } from '../hooks';

function modifySchemaTypes(schema: any): any {
    if (schema && schema.properties) {
        Object.keys(schema.properties).forEach((key) => {
            const property = schema.properties[key];
            // Check if the type starts with 'dodal.' or 'ophyd.'
            if (typeof property === 'object' && property.type &&
                (property.type.startsWith('dodal.') || property.type.startsWith('ophyd.') || property.type.startsWith('bluesky.'))) {
                property.type = 'string';
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
        console.dir(finalSchema);
        return finalSchema ?? {}
    }, [plan]);

    console.log(`jsonschema: ${schema}`)
    console.dir(schema);

    const [data, setData] = useState();
    const handleSubmit = ({ formData }: { formData: any }) => {
        console.log('Form submitted with:', formData);
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p style={{ color: 'black' }}>Error: {error}</p>;
    if (!plan) return <p>No plan found.</p>;

    return (
        <div>
            <h2 style={{ color: 'black' }}>Run Plan: {plan.name}</h2>
            <p>{plan.description}</p>
            <JsonForms
                schema={schema}
                // uischema={uischema}
                data={data}
                renderers={materialRenderers}
                cells={materialCells}
                onChange={({ data }) => setData(data)}
            />
            <Button variant="contained" color="primary" sx={{ mt: 2 }} onClick={
                () => {
                    handleSubmit(data)
                }
            }>
                Submit Plan
            </Button>
        </div>
    );
};

export default PlanForm;
