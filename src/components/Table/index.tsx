import { useContext } from 'react';
import { Cell, CellProps, Column, ColumnProps, SelectionModes, Table, TableProps } from '@blueprintjs/table';

import ToastsContext from '../../contexts/toasts';

import './index.scss';

type dataType = {
  [key: string]: any
}

type columnType = {
  title?: string;
  cellRenderer: (data?: any) => JSX.Element;
  width?: number
}

interface CustomTableProps {
  data: string[] | dataType[]
  cellProps?: CellProps,
  columnProps?: ColumnProps,
  columns: columnType[]
}

const CustomTable = (props: TableProps & CustomTableProps) => {
  const { addToast } = useContext(ToastsContext)
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

  const columnWidths = columns.map(column => column.width);

  const onCopy = (success: boolean) => {
    if (success) {
      addToast({
        message: 'Copied!!!',
        intent: 'primary'
      })
    }
  }

  return (
    <Table onCopy={onCopy} columnWidths={columnWidths} className={customTableClass} {...tableProps}>
      {columns.map(column => {
        return (
          <Column name={column.title} cellRenderer={cellRenderer}/>
        );
      })}
    </Table>
  )
};

CustomTable.defaultProps = {
  enableGhostCells: true,
  minRowHeight: 600,
  numFrozenRows: 1,
  selectionModes: SelectionModes.COLUMNS_AND_CELLS
}

export default CustomTable;
