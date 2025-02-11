export type JsonSchema = {
  type: string;
  properties: Record<string, any>;
  required?: string[];
};

export type UiSchema = {
  type: string;
  elements: {
    type: string;
    scope: string;
    label?: boolean;
  }[];
};

export function convertSchemaToUiSchema(schema: JsonSchema): UiSchema {
  const uiSchema: UiSchema = {
    type: 'VerticalLayout',
    elements: [],
  };

  // Iterate through each property in the schema
  Object.keys(schema.properties).forEach((property) => {
    const element = {
      type: 'Control',
      scope: `#/properties/${property}`,
      // Add `label: false` if required to hide labels for boolean fields or others
      // label: schema.properties[property].type === 'boolean' ? false : undefined,
      label: true,
    };

    // Add the control to the elements
    uiSchema.elements.push(element);
  });

  return uiSchema;
}

// Example usage
const schema = {
  type: 'object',
  properties: {
    name: {
      type: 'string',
      minLength: 1,
    },
    done: {
      type: 'boolean',
    },
    due_date: {
      type: 'string',
      format: 'date',
    },
    recurrence: {
      type: 'string',
      enum: ['Never', 'Daily', 'Weekly', 'Monthly'],
    },
  },
  required: ['name', 'due_date'],
};

const uischema = convertSchemaToUiSchema(schema);
console.log(JSON.stringify(uischema, null, 2));
