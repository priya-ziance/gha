import { Cell, CellProps, Column, ColumnProps, SelectionModes, Table, TableProps } from "@blueprintjs/table";

import './index.scss';

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
  const { className, columns, data, ...tableProps } = props;
  let customTableClass = 'gha__table';

  if (className) customTableClass += ` ${className}`;

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
    <Table className={customTableClass} {...tableProps}>
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
  selectionModes: SelectionModes.COLUMNS_AND_CELLS
}

export default CustomTable;
