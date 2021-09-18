import { useContext, useMemo, useState } from 'react';
import { Cell, CellProps, Column, ColumnProps, IRegion, Regions, SelectionModes, Table, TableLoadingOption, TableProps } from '@blueprintjs/table';

import Pagination, { PaginationProps } from '../Pagination';

import ToastsContext from '../../contexts/toasts';

import * as constants from '../../utils/constants';

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
  disablePagination?: boolean;
  emptyTableMessage?: string;
  loading?: boolean;
  enableMinHeight?: boolean;
}


const CustomTable = (props: TableProps & CustomTableProps & PaginationProps) => {
  const [selectedRowRegions, setSelectedRowRegions] = useState<IRegion[] | undefined>(undefined);
  const [hoveringRowIndex, setHoveringRowIndex] = useState<number | null>(null);
  const { addToast } = useContext(ToastsContext)
  const { className, columns, data, disablePagination, emptyTableMessage, enableMinHeight, loading, hasNextPage, hasPrevPage, onNextPage, onPrevPage, page, ...tableProps } = props;
  let customTableClass = 'gha__table__container';

  if (className) customTableClass += ` ${className}`;

  if (enableMinHeight) customTableClass += ' gha__table__container--min-height';

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
    )
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

  const isTableEmpty = !loading && data.length === 0;

  return (
    <div className='gha__table' style={{ maxWidth: constants.TABLE_WIDTH }}>
      {!isTableEmpty ?
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
        :
        <h4>
          {emptyTableMessage}
        </h4>
      }

      {!disablePagination &&
        <div className='gha__table__pagination-container'>
          <Pagination
            hasNextPage={hasNextPage}
            hasPrevPage={hasPrevPage}
            onNextPage={onNextPage}
            onPrevPage={onPrevPage}
            page={page}
          />
        </div>
      }
    </div>
  )
};

CustomTable.defaultProps = {
  defaultRowHeight: 40,
  numFrozenRows: 1,
  selectionModes: SelectionModes.ROWS_AND_CELLS
}

export default CustomTable;
