import { TriangleDownIcon, TriangleUpIcon } from "@chakra-ui/icons";
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionPanel,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  chakra,
} from "@chakra-ui/react";
import {
  ColumnDef,
  RowData,
  SortingState,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import ElementPicker from "./ElementPicker";
import { useEffect, useState } from "react";
import { ReadyRow } from "../utils/sampleHolderSize";
import { useSkipper } from "../editable-table/useSkipper";

// Give our default column cell renderer editing superpowers!
const defaultColumn: Partial<ColumnDef<ReadyRow>> = {
  cell: ({ getValue, row: { index }, column: { id }, table }) => {
    const initialValue = getValue();
    // We need to keep and update the state of the cell normally
    const [value, setValue] = useState(initialValue);

    // When the input is blurred, we'll call our table meta's updateData function
    const onBlur = () => {
      table.options.meta?.updateData(index, id, value);
    };

    // If the initialValue is changed external, sync it up with our state
    useEffect(() => {
      setValue(initialValue);
    }, [initialValue]);

    return (
      <input
        value={value as string}
        onChange={(e) => setValue(e.target.value)}
        onBlur={onBlur}
      />
    );
  },
};

declare module "@tanstack/react-table" {
  interface ColumnMeta<TData extends RowData, TValue> {
    isNumeric: boolean;
    editable?: boolean;
    element?: boolean;
  }
}

export type DataTableProps = {
  data: ReadyRow[];
  columns: ColumnDef<ReadyRow, any>[];
};

export function SamplesTable({ data: initialData, columns }: DataTableProps) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [data, setData] = useState<ReadyRow[]>(initialData);

  const [autoResetPageIndex, skipAutoResetPageIndex] = useSkipper();
  const table = useReactTable({
    columns,
    data,
    defaultColumn,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting,
    },
    autoResetPageIndex,
    debugTable: true,
    meta: {
      updateData: (rowIndex, columnId, value) => {
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
  });

  return (
    <Table>
      <Thead>
        {table.getHeaderGroups().map((headerGroup) => (
          <Tr key={headerGroup.id}>
            {headerGroup.headers.map((header) => {
              // see https://tanstack.com/table/v8/docs/api/core/column-def#meta to type this correctly
              const meta: any = header.column.columnDef.meta;
              return (
                <Th
                  key={header.id}
                  onClick={header.column.getToggleSortingHandler()}
                  isNumeric={meta?.isNumeric}
                >
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}

                  <chakra.span pl="4">
                    {header.column.getIsSorted() ? (
                      header.column.getIsSorted() === "desc" ? (
                        <TriangleDownIcon aria-label="sorted descending" />
                      ) : (
                        <TriangleUpIcon aria-label="sorted ascending" />
                      )
                    ) : null}
                  </chakra.span>
                </Th>
              );
            })}
          </Tr>
        ))}
      </Thead>
      <Tbody>
        {table.getRowModel().rows.map((row) => (
          <Tr key={row.id}>
            {row.getVisibleCells().map((cell) => {
              // see https://tanstack.com/table/v8/docs/api/core/column-def#meta to type this correctly
              const meta = cell.column.columnDef.meta;
              if (meta?.editable && meta.element) {
                return (
                  <Td key={cell.id} isNumeric={meta?.isNumeric}>
                    <>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                      <Accordion>
                        <AccordionButton>
                          edit
                          <AccordionIcon />
                        </AccordionButton>
                        <AccordionPanel pb={4}>
                          <ElementPicker
                            callback={() =>
                              console.debug("trying to change the element")
                            }
                          />
                        </AccordionPanel>
                      </Accordion>
                    </>
                  </Td>
                );
              }
              return (
                <Td key={cell.id} isNumeric={meta?.isNumeric}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </Td>
              );
            })}
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
}
