import { DataGrid, GridColDef, GridRowsProp } from "@mui/x-data-grid";
import {
  randomCreatedDate,
  randomTraderName,
  randomUpdatedDate,
} from "@mui/x-data-grid-generator";

const columns = [
  {
    field: "name",
    headerName: "Element Name",
    width: 180,
    editable: true,
  },
  {
    field: "symbol",
    headerName: "Element Symbol",
    width: 150,
    editable: true,
  },
  {
    field: "edge",
    headerName: "Edge",
    width: 120,
    editable: true,
  },
  {
    field: "detectionMode",
    headerName: "Detection Mode",
    width: 150,
    editable: true,
  },
  {
    field: "sampleName",
    headerName: "Sample Name",
    type: "string",
    width: 180,
    editable: true,
  },
  {
    field: "sampleComment",
    headerName: "Comment",
    width: 200,
    editable: true,
  },
  {
    field: "repetitions",
    headerName: "Repetitions (integer)",
    type: "number",
    width: 180,
    editable: true,
  },
  {
    field: "row",
    headerName: "Row (integer)",
    type: "number",
    width: 150,
    editable: true,
  },
  {
    field: "column_letter",
    headerName: "Column Letter",
    width: 150,
    editable: true,
  },
];

const rows: GridRowsProp = [
  {
    id: 1,
    name: randomTraderName(),
    age: 25,
    dateCreated: randomCreatedDate(),
    lastLogin: randomUpdatedDate(),
  },
  {
    id: 2,
    name: randomTraderName(),
    age: 36,
    dateCreated: randomCreatedDate(),
    lastLogin: randomUpdatedDate(),
  },
  {
    id: 3,
    name: randomTraderName(),
    age: 19,
    dateCreated: randomCreatedDate(),
    lastLogin: randomUpdatedDate(),
  },
  {
    id: 4,
    name: randomTraderName(),
    age: 28,
    dateCreated: randomCreatedDate(),
    lastLogin: randomUpdatedDate(),
  },
  {
    id: 5,
    name: randomTraderName(),
    age: 23,
    dateCreated: randomCreatedDate(),
    lastLogin: randomUpdatedDate(),
  },
];

export default function SamplesLayoutGrid() {
  return (
    <div style={{ height: 300, width: "100%" }}>
      <DataGrid
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        rows={rows}
        columns={columns}
        pageSizeOptions={[5]}
        checkboxSelection
        disableRowSelectionOnClick
        sx={{ backgroundColor: "white" }}
        editMode="row"
      />
    </div>
  );
}
