import { useContext, useEffect, useState } from "react";
import { Classes } from '@blueprintjs/core';

import {
  Col,
  Dialog,
  H4,
  Table
} from "../../../components"; 

import Instruction from '../../../models/instruction';

import ClientContext from '../../../contexts/client';

import api from '../../../api';

import URLS from '../../../utils/urls';
import * as helpers from '../../../utils/helpers';

import {
  actionColumn,
  activeColumn,
  dateColumn,
  descriptionColumn,
} from './helpers';

interface InstructionsDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onEditInstruction: (instructin: Instruction) => void
}

const PAGE_SIZE = 10;

const InstructionsDialog = (props: InstructionsDialogProps) => {
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false)
  const [instructions, setInstructions] = useState<Instruction[] | []>([]);

  const { id: clientId } = useContext(ClientContext);
  
  const { isOpen, onClose, onEditInstruction } = props;

  const hasNextPage = instructions.length === PAGE_SIZE;
  const hasPrevPage = page > 0;

  useEffect(() => {
    (async () => {
      if (isOpen) {
        setLoading(true)

        try {
          const fetchedInstructions = await api.instructions.getInstructions(clientId, { page, pageSize: PAGE_SIZE })
          setInstructions(fetchedInstructions)
        } catch(e) {
          console.log(e)
        }

        setLoading(false)
      }
    })()
  }, [clientId, page, isOpen])

  const onNextPage = () => {
    if (hasNextPage) {
      setPage(page => page + 1)
    }
  }

  const onPrevPage = () => {
    if (hasPrevPage) {
      setPage(page => page - 1)
    }
  }

  return (
    <Dialog isOpen={isOpen} onClose={onClose} className='database-task__instructions__instructions'>
      <div>
        <div className={Classes.DIALOG_HEADER}>
          <H4>
            Instructions
          </H4>
        </div>
        <div className={Classes.DIALOG_BODY}>
          <Col>
            <Table
              loading={loading}
              numRows={instructions.length}
              columns={[
                {
                  title: 'ID',
                  cellRenderer: (data: Instruction) => (<p>{data.id}</p>),
                  width: helpers.getTableWith(0.1)
                },
                {
                  title: 'Description',
                  cellRenderer: descriptionColumn,
                  width: helpers.getTableWith(0.4)
                },
                {
                  title: 'Active',
                  cellRenderer: activeColumn,
                  width: helpers.getTableWith(0.07)
                },
                {
                  title: 'Created At',
                  cellRenderer: dateColumn,
                  width: helpers.getTableWith(0.13)
                },
                {
                  title: 'Actions',
                  cellRenderer: (data: Instruction) => {
                    return actionColumn(
                      data,
                      {
                        onView: onEditInstruction
                      }
                    )
                  },
                  width: helpers.getTableWith(0.3)
                }
              ]}
              data={instructions}
              enableRowHeader={false}
              hasNextPage={hasNextPage}
              hasPrevPage={hasPrevPage}
              onNextPage={onNextPage}
              onPrevPage={onPrevPage}
              page={page}
              emptyTableMessage="No Instructions Found"
            />
          </Col>
        </div>
      </div>
    </Dialog>
  )
}

export default InstructionsDialog;