import { useContext, useEffect, useState } from 'react';
import { BreadcrumbProps, Intent } from '@blueprintjs/core';
import { IconNames } from '@blueprintjs/icons';
import useSWR from 'swr'

import { Button, Col, PageHeading, Table } from '../../../components';

import ClientContext from '../../../contexts/client';

import URLS from '../../../utils/urls';

import api from '../../../api';

import * as helpers from '../../../utils/helpers';

import { INotesDatabaseModel } from '../../../types';

import {
  actionColumn,
  activeColumn,
  dateColumn,
  descriptionColumn,
} from './helpers';

import AddNoteDialog from './addNoteDialog';
import DeleteNoteDialog from './deleteNoteDialog';

import './index.scss';

const PAGE_SIZE = 10;

const TYPE = 'lifeskills';

const DatabaseNotes = () => {
  const [page, setPage] = useState(0);
  const [isAddNoteOpen, setIsAddNoteOpen] = useState(false);
  const [selectedNote, setSelectedNote] = useState<INotesDatabaseModel | undefined>(undefined);
  const [selectedNoteToDelete, setSelectedNoteToDelete] = useState<INotesDatabaseModel | undefined>(undefined);
  const { id: clientId } = useContext(ClientContext);

  const { data: _Notes, isValidating } = useSWR('/api/life-skills/Notes', () => {
    return api.notes.getNotes(clientId, TYPE, { page, pageSize: PAGE_SIZE })
  }, { refreshInterval: 50 })

  const Notes = _Notes || []

  const hasNextPage = Notes.length === PAGE_SIZE;
  const hasPrevPage = page > 0;

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

  const BREADCRUMBS: BreadcrumbProps[] = [
    { href: URLS.getPagePath('dashboard'), icon: 'document', text: URLS.getPagePathName('dashboard')},
    { href: URLS.getPagePath('clients'), icon: 'document', text: URLS.getPagePathName('clients') },
    { href: URLS.getPagePath('client-links', { clientId }), icon: 'document', text: URLS.getPagePathName('client-links')},
    { href: URLS.getPagePath('logs', { clientId }), icon: 'document', text: URLS.getPagePathName('logs') },
    { href: URLS.getPagePath('life-skills', { clientId }), icon: 'document', text: URLS.getPagePathName('life-skills') },
    { text: URLS.getPagePathName('life-skills-notes-database') }
  ];

  const onAddNote = () => {
    setIsAddNoteOpen(true)
  }

  const onCloseNoteDialog = () => {
    setIsAddNoteOpen(false)
    setSelectedNote(undefined);
  }

  const onCloseDeleteDialog = () => {
    setSelectedNoteToDelete(undefined)
  }

  const getAddButton = () => {
    return (
      <Button
        intent={Intent.PRIMARY}
        icon={IconNames.ADD}
        onClick={onAddNote}
      >
        Add Note
      </Button>
    );
  }

  return (
    <div>
      <div className='life-skills-notes'>
        <PageHeading
          title='Life Skills Notes Database'
          breadCrumbs={BREADCRUMBS}
          renderRight={getAddButton}
        />
        <div className='life-skills-notes__container'>
          <Col>
            <Table
              loading={isValidating && !Notes}
              numRows={Notes.length}
              getCellClipboardData={(row, col) => {

                return Notes[row]
              }}
              columns={[
                {
                  title: 'ID',
                  cellRenderer: (data) => (<p>{data.id}</p>),
                  width: helpers.getTableWith(0.1)
                },
                {
                  title: 'Description',
                  cellRenderer: descriptionColumn,
                  width: helpers.getTableWith(0.5)
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
                  cellRenderer: (data) => {
                    return actionColumn(
                      data,
                      {
                        onView(data: INotesDatabaseModel) {
                          setSelectedNote(data);
                          setIsAddNoteOpen(true)
                        },
                        onDelete(data: INotesDatabaseModel) {
                          setSelectedNoteToDelete(data)
                        }
                      }
                    )
                  },
                  width: helpers.getTableWith(0.2)
                }
              ]}
              data={Notes}
              enableRowHeader={false}
              onSelection={(focusedCell) => {
                console.log(focusedCell)
              }}
              hasNextPage={hasNextPage}
              hasPrevPage={hasPrevPage}
              onNextPage={onNextPage}
              onPrevPage={onPrevPage}
              page={page}
              emptyTableMessage="No Notes Found"
            />
          </Col>
        </div>

        <AddNoteDialog note={selectedNote} isOpen={isAddNoteOpen} onClose={onCloseNoteDialog} type={TYPE}/>
        {selectedNoteToDelete &&
          <DeleteNoteDialog note={selectedNoteToDelete} isOpen={!!selectedNoteToDelete} onClose={onCloseDeleteDialog} />
        }
      </div>
    </div>
  );
}

export default DatabaseNotes;