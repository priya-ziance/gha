import { useContext, useState } from 'react';
import { Cell, CellProps, Column, ColumnProps, IRegion, Regions, SelectionModes, Table, TableLoadingOption, TableProps } from '@blueprintjs/table';

import Pagination, { PaginationProps } from '../Pagination';

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
  data: string[] | dataType[];
  cellProps?: CellProps;
  columnProps?: ColumnProps;
  columns: columnType[];
  loading?: boolean
}

const CustomTable = (props: TableProps & CustomTableProps & PaginationProps) => {
  const [selectedRowRegions, setSelectedRowRegions] = useState<IRegion[] | undefined>(undefined);
  const [hoveringRowIndex, setHoveringRowIndex] = useState<number | null>(null);
  const { addToast } = useContext(ToastsContext)
  const { className, columns, data, loading, hasNextPage, hasPrevPage, onNextPage, onPrevPage, page, ...tableProps } = props;
  let customTableClass = 'gha__table__container';

  if (className) customTableClass += ` ${className}`;

  const cellRenderer = (rowIndex: number, columnIndex: number) => {
    let hoveringClass = '';

    if (hoveringRowIndex === rowIndex) {
      hoveringClass = 'gha__table__cell--hover'
    }

    return (
      <Cell className={`gha__table__cell ${hoveringClass}`}>
        <div
          onClick={() => {
            setSelectedRowRegions(
              [Regions.row(rowIndex)]
            )
          }}
          style={{
            paddingTop: 5,
            paddingBottom: 5
          }}
          onMouseEnter={() => setHoveringRowIndex(rowIndex)}
          onMouseLeave={() => setHoveringRowIndex(null)}
        >
        {
          columns[columnIndex].cellRenderer(data[rowIndex])
        }
        </div>
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
    <div className='gha__table'>
      <Table
        loadingOptions={loading ? [TableLoadingOption.CELLS] : undefined}
        onCopy={onCopy}
        columnWidths={columnWidths}
        className={customTableClass}
        selectedRegions={selectedRowRegions}
        {...tableProps}
      >
        {columns.map(column => {
          return (
            <Column name={column.title} cellRenderer={cellRenderer}/>
          );
        })}
      </Table>
      <div className='gha__table__pagination-container'>
        <Pagination
          hasNextPage={hasNextPage}
          hasPrevPage={hasPrevPage}
          onNextPage={onNextPage}
          onPrevPage={onPrevPage}
          page={page}
        />
      </div>
    </div>
  )
};

CustomTable.defaultProps = {
  defaultRowHeight: 40,
  enableGhostCells: true,
  numFrozenRows: 1,
  selectionModes: SelectionModes.ROWS_AND_CELLS
}

export default CustomTable;
