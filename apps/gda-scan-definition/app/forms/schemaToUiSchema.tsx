
export type JsonSchema = {
  type: string;
  properties: Record<string, any>;
  required: string[];
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

  // Recursive helper to handle nested properties
  function processProperties(schema: JsonSchema, parentPath = '#/properties'): any {
    const elements: any[] = [];

    Object.keys(schema.properties || {}).forEach((property) => {
      const propertySchema = schema.properties[property];

      // Check if the property is a nested object (with its own properties)
      if (propertySchema.type === 'object' && propertySchema.properties) {
        // Create a nested layout for the object
        const nestedUiSchema = {
          type: 'Group',
          label: property,
          elements: processProperties(propertySchema, `${parentPath}/${property}`), // Recursively process nested properties
        };
        elements.push(nestedUiSchema);
      } else if (propertySchema.type === 'array' && propertySchema.items && propertySchema.items.type === 'object') {

        // Handle arrays of objects (nested schemas in arrays)
        const nestedArrayUiSchema = {
          type: 'Control',
          scope: `${parentPath}/${property}`,
          options: {
            detail: {
              type: 'VerticalLayout',
              elements: processProperties(propertySchema.items, `${parentPath}/${property}/items`),
            },
          },
        };
        console.log(`trying to render array: ${property}, with ${nestedArrayUiSchema.type}, ${nestedArrayUiSchema.scope}`);
        elements.push(nestedArrayUiSchema);
      } else {
        // Add a control element for simple types
        const controlElement = {
          type: 'Control',
          scope: `${parentPath}/${property}`,
          label: propertySchema.type === 'boolean' ? false : property, // Optional: Hide labels for boolean fields
        };
        elements.push(controlElement);
      }
    });

    console.log(`elements: ${elements}`);
    console.dir(elements, {depth: null});
    return elements;
  }

  // Process the root schema
  uiSchema.elements = processProperties(schema);

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
