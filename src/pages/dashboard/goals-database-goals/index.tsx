import { useContext, useEffect, useState } from 'react';
import { BreadcrumbProps, Intent } from '@blueprintjs/core';
import { IconNames } from '@blueprintjs/icons';

import { AnchorButton, Col, PageHeading, Table } from '../../../components';

import ClientContext from '../../../contexts/client';
import LocationContext from '../../../contexts/location';

import URLS from '../../../utils/urls';

import api from '../../../api';

import CaseNote from '../../../models/caseNote';

import * as helpers from '../../../utils/helpers';

import {
  actionColumn,
  activeColumn,
  dateColumn,
  descriptionColumn,
  titleColumn,
} from './helpers';

import './index.scss';

const PAGE_SIZE = 10;

const ClientCaseNotes = () => {
  const [caseNotes, setCaseNotes] = useState<CaseNote[] | []>([]);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const { id: clientId } = useContext(ClientContext);
  const { id: selectedLocationId } = useContext(LocationContext)

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
  }, [clientId, page, selectedLocationId]);

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
    { href: URLS.getPagePath('goals', { clientId }), icon: 'document', text: URLS.getPagePathName('goals') },
    { href: URLS.getPagePath('goals-database', { clientId }), icon: 'document', text: URLS.getPagePathName('goals-database') },
    { text: URLS.getPagePathName('goals-database-goals') }
  ];

  const getAddButton = () => {
    return (
      <AnchorButton
        buttonProps={{
          intent: Intent.PRIMARY,
          icon: IconNames.ADD
        }}
        linkProps={{
          to: URLS.getPagePath('add-database-goal', { clientId })
        }}
      >
        Add goal
      </AnchorButton>
    );
  }
  

  return (
    <div>
      <div className='client-case-notes'>
        <PageHeading
          title='Database Goals'
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
                  width: helpers.getTableWith(0.1)
                },
                {
                  title: 'Title',
                  cellRenderer: titleColumn,
                  width: helpers.getTableWith(0.2)
                },
                {
                  title: 'Description',
                  cellRenderer: descriptionColumn,
                  width: helpers.getTableWith(0.3)
                },
                {
                  title: 'Active',
                  cellRenderer: activeColumn,
                  width: helpers.getTableWith(0.07)
                },
                {
                  title: 'Date',
                  cellRenderer: dateColumn,
                  width: helpers.getTableWith(0.13)
                },
                {
                  title: 'Actions',
                  cellRenderer: actionColumn,
                  width: helpers.getTableWith(0.2)
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
              emptyTableMessage="No Case Notes Found"
            />
          </Col>
        </div>
      </div>
    </div>
  );
}

export default ClientCaseNotes;