import React, { useReducer } from "react";
import { DataGrid, GridColDef, GridRowModel } from "@mui/x-data-grid";
import { tableInitialState, tableReducer } from "./zodstate";

const columns: GridColDef[] = [
  { field: "name", headerName: "Name", editable: true },
  { field: "age", headerName: "Age", type: "number", editable: true },
  {
    field: "enumField",
    headerName: "Enum Field",
    editable: true,
    type: "singleSelect",
    valueOptions: ["Option1", "Option2", "Option3"],
  },
  { field: "customField", headerName: "Custom Field", editable: true },
];

const TableManager: React.FC = () => {
  const [state, dispatch] = useReducer(tableReducer, tableInitialState);

  const handleAddRows = (numRows: number) => {
    dispatch({ type: "ADD_ROWS", payload: numRows });
  };

  const handleRowEdit = (newRow: GridRowModel) => {
    dispatch({
      type: "UPDATE_ROW",
      payload: { id: newRow.id, updatedRow: newRow },
    });
    return newRow; // Required for DataGrid to reflect changes
  };

  const handleValidate = () => {
    dispatch({ type: "VALIDATE" });
  };

  return (
    <div>
      <button onClick={() => handleAddRows(5)}>Add 5 Rows</button>
      <button onClick={handleValidate}>Validate</button>

      <DataGrid
        rows={state.rows}
        columns={columns}
        processRowUpdate={handleRowEdit}
        // experimentalFeatures={{ newEditingApi: true }}
      />
    </div>
  );
};

export default TableManager;
