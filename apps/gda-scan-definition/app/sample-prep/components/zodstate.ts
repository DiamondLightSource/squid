import { z } from "zod";

const EnumField = z.enum(["Option1", "Option2", "Option3"]);

const RowSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1),
  age: z.number().optional(),
  enumField: EnumField,
  customField: z.string().optional(),
});

const DataModelSchema = z.array(RowSchema);

export type Row = z.infer<typeof RowSchema>;

export type TableState = {
  rows: Row[];
  defaults: Partial<Row> & { incrementAge?: boolean };
};

export type TableAction =
  | { type: "ADD_ROWS"; payload: number }
  | { type: "UPDATE_ROW"; payload: { id: string; updatedRow: Partial<Row> } }
  | { type: "SET_DEFAULTS"; payload: Partial<Row> & { incrementAge?: boolean } }
  | { type: "VALIDATE" };

export const tableReducer = (state: TableState, action: TableAction): TableState => {
  switch (action.type) {
    case "ADD_ROWS": {
      const { rows, defaults } = state;
      const newRows = Array.from({ length: action.payload }, (_, i) => ({
        id: crypto.randomUUID(),
        name: defaults.name ?? "",
        age: defaults.incrementAge
          ? (defaults.age ?? 0) + i
          : (defaults.age ?? 0),
        enumField: defaults.enumField ?? "Option1",
        customField: defaults.customField ?? "",
      }));
      return { ...state, rows: [...rows, ...newRows] };
    }

    case "UPDATE_ROW": {
      const { id, updatedRow } = action.payload;
      const updatedRows = state.rows.map((row) =>
        row.id === id ? { ...row, ...updatedRow } : row
      );
      return { ...state, rows: updatedRows };
    }

    case "SET_DEFAULTS": {
      return { ...state, defaults: { ...state.defaults, ...action.payload } };
    }

    case "VALIDATE": {
      const validationResult = DataModelSchema.safeParse(state.rows);
      if (!validationResult.success) {
        console.error(validationResult.error);
        return state; // Keep the state unchanged if validation fails
      }
      return state; // Validation succeeded; no state change required
    }

    default:
      throw new Error("Unknown action type");
  }
};

export const tableInitialState: TableState = {
  rows: [],
  defaults: {
    name: "",
    age: 0,
    enumField: "Option1",
    customField: "",
    incrementAge: false,
  },
};
