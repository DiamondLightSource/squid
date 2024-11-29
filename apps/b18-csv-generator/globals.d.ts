import '@tanstack/react-table' //or vue, svelte, solid, etc.
import { RowData } from '@tanstack/react-table'

declare module '@tanstack/react-table' {
  interface ColumnMeta<TData extends RowData, TValue> {
    foo: string
  }
}
// see https://tanstack.com/table/v8/docs/api/core/column-def#meta to type this correctly
