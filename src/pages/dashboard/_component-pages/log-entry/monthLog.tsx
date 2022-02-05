import { useEffect, useState } from 'react';
import { Classes, Intent, Spinner } from '@blueprintjs/core';
import { Tooltip2 } from '@blueprintjs/popover2';
import get from 'lodash/get';
import sortBy from 'lodash/sortBy';

import { Button, Dialog, Table } from '../../../../components';

import * as helpers from '../../../../utils/helpers';

import api from '../../../../api';

import { ILogModel } from '../../../../types';

import './index.scss';
import moment from 'moment';

export interface MonthLogProps {
  isOpen: boolean;
  onClose?: () => void;
  onSave?: (dataUrl: string) => void;
  date: Date;
  type: string;
  clientId: string;
  handleLogClick?: (log: ILogModel) => void
}


const MonthLog = (props: MonthLogProps) => {
  const [loading, setLoading] = useState(false);
  const [logs, setLogs] = useState<ILogModel[] | []>([]);

  const { isOpen, clientId, date, handleLogClick, type } = props;

  useEffect(() => {
    (async () => {
      if (clientId && isOpen) {
        setLoading(true)

        try {
          if (date) {
            setLogs(
              await api.logs.getLogsForPeriod(
                moment(date).format('YYYY-MM-DD'),
                clientId,
                {
                  params: { type }
                }
              )
            )
          }
        } catch(e) {}

        setLoading(false)
        }
    })()
  }, [clientId, date, type, isOpen])

  /**
   * Trying to get the logs in the shape below
   * {
      question: 'Was the reshab service provided:',
      logs: {
        1: 'Y',
        2: 'N',
        3: 'Y',
        4: 'N',
        5: 'Y',
        6: 'Y'
      }
    }
   * @param logs 
   * @returns 
   */
  const formatLogs = (logs: ILogModel[]) => {
    const questions: any[] = []
    let formattedLogs: any[] = []

    if (logs) {
      formattedLogs = sortBy(
        logs,
        a => moment(a.createdAt).milliseconds()
      )

      formattedLogs.forEach((log: ILogModel) => {
        if (Array.isArray(log.questions) && log.questions.length) {
          log.questions.forEach((quest: any) => {
            const dayOfMonth = log.createdAt.date()

            if (questions[quest.id]) {
              questions[quest.id].logs[dayOfMonth] = {
                value: quest.selectedAnswers[0],
                log
              }
            } else {
              questions[quest.id] = {
                question: quest.questionValue,
                logs: {
                  [dayOfMonth]: {
                    value: quest.selectedAnswers[0],
                    log
                  }
                }
              }
            }
          })
        }
      })
    }

    return Object.values(questions);
  }

  const formattedLogs = formatLogs(logs);

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
          {loading ?
            <Spinner />
            :
            <Table
              numRows={formattedLogs.length}
              enableMinHeight
              columns={[
                {
                  title: '',
                  cellRenderer: (data: any) => (<p>{get(data, 'question', '')}</p>),
                  width: helpers.getTableWith(0.23)
                },
                ...Array.from({length: 31}, (_, i) => i + 1).map(index => {
                  return {
                    title: `${index}`,
                    cellRenderer: (data: any) => {
                      return (
                        <p
                          onClick={() => {
                            if (handleLogClick) {
                              handleLogClick(data.logs[index].log)
                            }
                          }}
                        >
                          {data.logs[index]?.value}
                        </p>
                      )
                    },
                    width: helpers.getTableWith(0.039)
                  }
                })
              ]}
              data={formattedLogs}
              enableRowHeader={false}
              emptyTableMessage="No Logs Found"
              disablePagination
            />
          }
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