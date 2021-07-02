import { Cell, CellProps, Column, ColumnProps, RegionCardinality, Table, TableProps } from "@blueprintjs/table";

type dataType = {
  [key: string]: any
}

type columnType = {
  title?: string;
  cellRenderer: (data?: any) => JSX.Element
}

interface CustomTableProps {
  data: string[] | dataType[]
  cellProps?: CellProps,
  columnProps?: ColumnProps,
  columns: columnType[]
}

const CustomTable = (props: TableProps & CustomTableProps) => {
  const { columns, data, ...tableProps } = props;

  const cellRenderer = (rowIndex: number, columnIndex: number) => {
    return (
      <Cell>
        {
          columns[columnIndex].cellRenderer(data[rowIndex])
        }
      </Cell>
    );
  };


  return (
    <Table {...tableProps}>
      {columns.map(column => {
        return (
          <Column name={column.title} cellRenderer={cellRenderer}/>
        );
      })}
    </Table>
  )
};

CustomTable.defaultProps = {
  numFrozenRows: 1,
  selectionModes: RegionCardinality.CELLS
}

export default CustomTable;
