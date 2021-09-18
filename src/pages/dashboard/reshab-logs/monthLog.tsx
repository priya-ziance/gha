import { Classes, Intent } from '@blueprintjs/core';
import { Tooltip2 } from '@blueprintjs/popover2';

import { Button, Dialog, Table } from '../../../components';

import * as helpers from '../../../utils/helpers';

import { MOCK_LOGS } from './mockData';

import './index.scss';

export interface MonthLogProps {
  isOpen: boolean;
  onClose?: () => void;
  onSave?: (dataUrl: string) => void
}


const MonthLog = (props: MonthLogProps) => {
  return (
    <Dialog
      icon='info-sign'
      onClose={props.onClose}
      title='Month Log'
      isOpen={props.isOpen}
      className='reshab-logs__month-log__dialog'
    >
      <>
        <div className={`${Classes.DIALOG_BODY} reshab-logs__month-log__dialog__body`}>
          <Table
            numRows={MOCK_LOGS.length}
            enableMinHeight
            columns={[
              {
                title: '',
                cellRenderer: (data) => (<p>{data.question.title}</p>),
                width: helpers.getTableWith(0.23)
              },
              ...Array.from({length: 31}, (_, i) => i + 1).map(index => {
                return {
                  title: `${index}`,
                  cellRenderer: (data: any) => (<p>{data.logs[index]}</p>),
                  width: helpers.getTableWith(0.037)
                }
              })
            ]}
            data={MOCK_LOGS}
            enableRowHeader={false}
            emptyTableMessage="No Logs Found"
            disablePagination
          />
        </div>
        <div className={Classes.DIALOG_FOOTER}>
          <div className={Classes.DIALOG_FOOTER_ACTIONS}>
            <Tooltip2 content='This button is hooked up to close the dialog.'>
              <Button onClick={props.onClose}>Close</Button>
            </Tooltip2>
          </div>
        </div>
      </>
    </Dialog>
  )
}

export default MonthLog;