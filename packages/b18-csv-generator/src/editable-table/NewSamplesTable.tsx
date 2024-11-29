import React, { useEffect, useState } from "react";

import { Button, Input, Select, Stack } from "@chakra-ui/react";
import { ElementType } from "@diamondlightsource/periodic-table/elements";
import { PeriodicTable } from "@diamondlightsource/periodic-table/table";
import { downloadFile } from "@repo/utils/download-file";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  RowData,
  useReactTable,
} from "@tanstack/react-table";
import { ChemicalElement } from "../data/elements";
import {
  DETECTION_MODES,
  DetectionModeType,
  EDGES,
} from "../utils/initialTypes";
import { getCsvContent, ReadyRow } from "../utils/sampleHolderSize";
import { Filter } from "./Filter";
import { IndeterminateCheckbox } from "./IndeterminateCheckbox";
import { useSkipper } from "./useSkipper";

declare module "@tanstack/react-table" {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface TableMeta<TData extends RowData> {
    updateData: (rowIndex: number, columnId: string, value: unknown) => void;
  }
}

const nonEditableColumns: string[] = ["name", "select", "symbol"];

// Give our default column cell renderer editing superpowers!
const defaultColumn: Partial<ColumnDef<ReadyRow>> = {
  cell: ({ getValue, row: { index }, column: { id }, table }) => {
    const initialValue = getValue();
    // console.debug("col id: ", id);
    // We need to keep and update the state of the cell normally
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [value, setValue] = useState(initialValue);

    // When the input is blurred, we'll call our table meta's updateData function
    const onBlur = () => {
      table.options.meta?.updateData(index, id, value);
    };

    // If the initialValue is changed external, sync it up with our state
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
      setValue(initialValue);
    }, [initialValue]);

    if (nonEditableColumns.includes(id)) {
      return <p style={{ padding: 2, margin: 2 }}>{value as string}</p>;
    }
    if (id === "edge") {
      return (
        <Select
          value={value as string}
          id="defaultEdge"
          className="border rounded p-1"
          onChange={(e) => {
            setValue(e.target.value as string);
          }}
          minWidth={50}
          letterSpacing={3}
        >
          {EDGES.map((v, i) => {
            return (
              <option
                key={`edge-option-${i}`}
                value={v}
                style={{ margin: 4, padding: 2 }}
              >
                {v + "           "}
              </option>
            );
          })}
        </Select>
      );
    }

    if (id === "detectionMode") {
      return (
        <>
          <Select
            value={value as string}
            id="defaultSelectionMode"
            onChange={(e) => {
              setValue(e.target.value as DetectionModeType);
            }}
          >
            {DETECTION_MODES.map((v, i) => {
              return (
                <option key={`detection-mode-option-${i}`} value={v}>
                  {v}
                </option>
              );
            })}
          </Select>
        </>
      );
    }

    if (id === "repetitions" || id === "row") {
      return (
        <Input
          type="number"
          value={value as number}
          onChange={(e) => setValue(parseInt(e.target.value))}
          onBlur={onBlur}
        />
      );
    }
    if (id === "column_letter") {
      return (
        <Input
          type="text"
          value={value as string}
          minLength={1}
          maxLength={1}
          onChange={(e) => {
            const u = e.target.value.toUpperCase();
            setValue(u);
          }}
          onBlur={onBlur}
        />
      );
    }

    return (
      <Input
        type="text"
        value={value as string}
        onChange={(e) => setValue(e.target.value)}
        onBlur={onBlur}
      />
    );
  },
};

type NewSamplesTableProps = {
  rowsFromForm: ReadyRow[];
};

export function NewSamplesTable({ rowsFromForm }: NewSamplesTableProps) {
  // const rerender = React.useReducer(() => ({}), {})[1];

  const columns = React.useMemo<ColumnDef<ReadyRow>[]>(
    () => [
      {
        id: "select",
        header: ({ table }) => (
          <IndeterminateCheckbox
            {...{
              checked: table.getIsAllRowsSelected(),
              indeterminate: table.getIsSomeRowsSelected(),
              onChange: table.getToggleAllRowsSelectedHandler(),
            }}
          />
        ),
        cell: ({ row }) => (
          <div className="px-1">
            <IndeterminateCheckbox
              {...{
                checked: row.getIsSelected(),
                disabled: !row.getCanSelect(),
                indeterminate: row.getIsSomeSelected(),
                onChange: row.getToggleSelectedHandler(),
              }}
            />
          </div>
        ),
      },
      {
        header: "Element choice",
        footer: (props) => props.column.id,
        columns: [
          {
            accessorFn: (row) => row.element.name,
            id: "name",
            header: () => "Element name",
            footer: (props) => props.column.id,
          },
          {
            accessorFn: (row) => row.element.symbol,
            id: "symbol",
            header: () => <span>Element symbol</span>,
            footer: (props) => props.column.id,
          },
        ],
      },
      {
        header: "Edge",
        footer: (props) => props.column.id,
        columns: [
          {
            accessorKey: "edge",
            header: () => <span style={{ minWidth: 40 }}>Edge</span>,
            footer: (props) => props.column.id,
          },
          {
            accessorKey: "detectionMode",
            header: () => <span>Detection Mode</span>,
            footer: (props) => props.column.id,
          },
        ],
      },
      {
        header: "Custom data",
        columns: [
          {
            accessorKey: "sampleName",
            header: "Sample Name",
            footer: (props) => props.column.id,
          },
          {
            accessorKey: "sampleComment",
            header: "Comment",
            footer: (props) => props.column.id,
          },
          {
            accessorKey: "repetitions",
            header: "Repetitions (integer)",
            footer: (props) => props.column.id,
          },
        ],
      },

      {
        header: "Position in the tray",
        footer: (props) => props.column.id,
        columns: [
          {
            accessorKey: "row",
            header: "Row (integer)",
            footer: (props) => props.column.id,
          },
          {
            header: "Column letter",
            accessorKey: "column_letter",
            footer: (props) => props.column.id,
          },
        ],
      },
    ],
    []
  );

  // const [data, setData] = React.useState(() => makeSampleData(100));
  // const refreshData = () => setData(() => makeSampleData(100));

  const [data, setData] = React.useState<ReadyRow[]>(rowsFromForm);
  useEffect(() => {
    setData(rowsFromForm);
  }, [rowsFromForm]);
  // const refreshData = () => setData(() => []);

  const [autoResetPageIndex, skipAutoResetPageIndex] = useSkipper();
  const [rowSelection, setRowSelection] = React.useState<
    Record<number, boolean>
  >({});

  const periodicTableCallback = (element: ElementType) => {
    console.debug("table callback: ", element);
    const e: ChemicalElement = {
      number: parseInt(element.Number),
      isotopes: [],
      symbol: element.Symbol,
      mass: parseFloat(element["Atomic Weight"]),
      name: element.Name,
    };
    console.debug("row selection: ", rowSelection);
    setData((data) => {
      const newData = data.map((row, index) => {
        if (rowSelection[index]) {
          row.element = e;
        }
        return row;
      });
      return newData;
    });
    setRowSelection({});
  };

  const table = useReactTable({
    data,
    columns,
    defaultColumn,
    enableRowSelection: true,
    state: {
      rowSelection,
    },
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    autoResetPageIndex,
    // Provide our updateData function to our table meta
    meta: {
      updateData: (rowIndex, columnId, value) => {
        console.debug("updating the data");
        // Skip page index reset until after next rerender
        skipAutoResetPageIndex();
        setData((old) =>
          old.map((row, index) => {
            if (index === rowIndex) {
              return {
                ...old[rowIndex]!,
                [columnId]: value,
              };
            }
            return row;
          })
        );
      },
    },
    debugTable: true,
  });

  return (
    <div className="p-2">
      <div className="h-2" />
      <div className="h-2">
        <p>
          to change element simply select a row and then click the wanted
          element
        </p>
      </div>

      <table>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <th key={header.id} colSpan={header.colSpan}>
                    {header.isPlaceholder ? null : (
                      <div>
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                        {header.column.getCanFilter() ?? (
                          <div>
                            <Filter column={header.column} table={table} />
                          </div>
                        )}
                      </div>
                    )}
                  </th>
                );
              })}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => {
            return (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => {
                  return (
                    <td key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="flex items-center gap-2 p-2">
        <Stack direction="row" justifyItems="center">
          <Button
            className="border rounded p-1"
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
          >
            {"<<"}
          </Button>
          <Button
            className="border rounded p-1"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            {"<"}
          </Button>
          <Button
            className="border rounded p-1"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            {">"}
          </Button>
          <Button
            className="border rounded p-1"
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
          >
            {">>"}
          </Button>
        </Stack>
        <span className="flex items-center gap-1">
          <div>Page</div>
          <strong>
            {table.getState().pagination.pageIndex + 1} of{" "}
            {table.getPageCount()}
          </strong>
        </span>
        <span className="flex items-center gap-1">
          | Go to page:
          <input
            type="number"
            defaultValue={table.getState().pagination.pageIndex + 1}
            onChange={(e) => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0;
              table.setPageIndex(page);
            }}
            className="border p-1 rounded w-16"
          />
        </span>
        <select
          value={table.getState().pagination.pageSize}
          onChange={(e) => {
            table.setPageSize(Number(e.target.value));
          }}
          style={{ margin: 4 }}
        >
          {[10, 20, 30, 40, 50].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
        <p>{table.getRowModel().rows.length} Rows</p>
        <Button
          onClick={() => {
            const s = getCsvContent(data);
            downloadFile({
              data: s,
              filename: "b18-data.csv",
              fileType: "text/csv",
            });
          }}
        >
          Download the table
        </Button>
      </div>
      <Stack direction="row">
        {/* <Box>
          <Button onClick={() => rerender()}>Force Rerender</Button>
        </Box>
        <Box>
          <Button onClick={() => refreshData()}>Refresh Data</Button>
        </Box> */}
      </Stack>
      <PeriodicTable callback={periodicTableCallback} />
    </div>
  );
}
