import { useContext, useEffect, useState } from 'react';
import { BreadcrumbProps, Intent } from '@blueprintjs/core';
import { IconNames } from '@blueprintjs/icons';

import { AnchorButton, Col, PageHeading, Table } from '../../../components';

import ClientContext from '../../../contexts/client';

import URLS from '../../../utils/urls';

import api from '../../../api';

import CaseNote from '../../../models/caseNote';

import {
  actionColumn,
  activeColumn,
  dateColumn,
  descriptionColumn,
  titleColumn,
} from './helpers';

import './index.scss';

const PAGE_SIZE = 10;

const ClientContacts = () => {
  const [caseNotes, setCaseNotes] = useState<CaseNote[] | []>([]);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const { id: clientId } = useContext(ClientContext);

  const hasNextPage = caseNotes.length === PAGE_SIZE;
  const hasPrevPage = page > 0;

  useEffect(() => {
    (async () => {
      setLoading(true);

      try {
        setCaseNotes(
          await api.caseNotes.getCaseNotes(clientId, { page, pageSize: PAGE_SIZE })
        )
      } catch(e){}

      setTimeout(() => {
        setLoading(false);
      }, 200)
    })()
  }, [clientId, page]);

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
    { href: URLS.getPagePath('dashboard'), icon: 'document', text: 'Dashboard'},
    { href: URLS.getPagePath('clients'), icon: 'document', text: "Clients" },
    { href: URLS.getPagePath('client-links', { clientId }), icon: 'document', text: 'Links' },
    { text: 'Case Notes' }
  ];

  const getAddButton = () => {
    return (
      <AnchorButton
        buttonProps={{
          intent: Intent.PRIMARY,
          icon: IconNames.ADD
        }}
        linkProps={{
          to: URLS.getPagePath('add-client-case-notes', { clientId })
        }}
      >
        Add case note
      </AnchorButton>
    );
  }
  

  return (
    <div>
      <div className='client-case-notes'>
        <PageHeading
          title='Case Notes'
          breadCrumbs={BREADCRUMBS}
          renderRight={getAddButton}
        />
        <div className='client-case-notes__container'>
          <Col>
            <Table
              loading={loading}
              numRows={caseNotes.length}
              getCellClipboardData={(row, col) => {

                return caseNotes[row]
              }}
              columns={[
                {
                  title: 'ID',
                  cellRenderer: (data) => (<p>{data.id}</p>),
                  width: 90
                },
                {
                  title: 'Title',
                  cellRenderer: titleColumn,
                  width: 200
                },
                {
                  title: 'Description',
                  cellRenderer: descriptionColumn,
                  width: 250
                },
                {
                  title: 'Active',
                  cellRenderer: activeColumn,
                  width: 60
                },
                {
                  title: 'Date',
                  cellRenderer: dateColumn,
                  width: 150
                },
                {
                  title: 'Actions',
                  cellRenderer: actionColumn,
                  width: 117
                }
              ]}
              data={caseNotes}
              enableRowHeader={false}
              onSelection={(focusedCell) => {
                console.log(focusedCell)
              }}
              hasNextPage={hasNextPage}
              hasPrevPage={hasPrevPage}
              onNextPage={onNextPage}
              onPrevPage={onPrevPage}
              page={page}
            />
          </Col>
        </div>
      </div>
    </div>
  );
}

export default ClientContacts;