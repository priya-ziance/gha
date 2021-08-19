import { useContext, useEffect, useState } from 'react';
import { BreadcrumbProps, Intent } from '@blueprintjs/core';
import { IconNames } from '@blueprintjs/icons';

import { AnchorButton, Col, PageHeading, Table } from '../../../components';

import ClientContext from '../../../contexts/client';

import URLS from '../../../utils/urls';

import api from '../../../api';

import * as helpers from '../../../utils/helpers';

import { IGoalModel } from '../../../types';

import {
  actionColumn,
  activeColumn,
  dateOfBirthColumn,
  addressColumn,
  firstNameColumn,
  lastNameColumn,
} from './helpers';

import './index.scss';

const PAGE_SIZE = 10;

const ClientContacts = () => {
  const [goals, setGoals] = useState<IGoalModel[] | []>([]);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const { id: clientId } = useContext(ClientContext);

  const hasNextPage = goals.length === PAGE_SIZE;
  const hasPrevPage = page > 0;

  console.log(goals)

  useEffect(() => {
    (async () => {
      setLoading(true);

      try {
        setGoals(
          await api.goals.getGoals(clientId, { page, pageSize: PAGE_SIZE })
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
    { href: URLS.getPagePath('dashboard'), icon: 'document', text: URLS.getPagePathName('dashboard')},
    { href: URLS.getPagePath('clients'), icon: 'document', text: URLS.getPagePathName('clients') },
    { href: URLS.getPagePath('client-links', { clientId }), icon: 'document', text: URLS.getPagePathName('client-links')},
    { href: URLS.getPagePath('goals', { clientId }), icon: 'document', text: URLS.getPagePathName('goals') },
    { text: URLS.getPagePathName('sp-goals') }
    
  ];

  const getAddButton = () => {
    return (
      <AnchorButton
        buttonProps={{
          intent: Intent.PRIMARY,
          icon: IconNames.ADD
        }}
        linkProps={{
          to: URLS.getPagePath('add-sp-goals', { clientId })
        }}
      >
        Add client contact
      </AnchorButton>
    );
  }
  

  return (
    <div>
      <div className='client-contacts'>
        <PageHeading
          title={URLS.getPagePathName('sp-goals')}
          breadCrumbs={BREADCRUMBS}
          renderRight={getAddButton}
        />
        <div className='client-contacts__container'>
          <Col>
            <Table
              loading={loading}
              numRows={goals.length}
              getCellClipboardData={(row, col) => {
                return goals[row]
              }}
              columns={[
                {
                  title: 'First Name',
                  cellRenderer: firstNameColumn,
                  width: helpers.getTableWith(0.15)
                },
                {
                  title: 'Last Name',
                  cellRenderer: lastNameColumn,
                  width: helpers.getTableWith(0.15)
                },
                {
                  title: 'DOB',
                  cellRenderer: dateOfBirthColumn,
                  width: helpers.getTableWith(0.13)
                },
                {
                  title: 'Active',
                  cellRenderer: activeColumn,
                  width: helpers.getTableWith(0.07)
                },
                {
                  title: 'Address',
                  cellRenderer: addressColumn,
                  width: helpers.getTableWith(0.3)
                },
                {
                  title: 'Actions',
                  cellRenderer: actionColumn,
                  width: helpers.getTableWith(0.2)
                }
              ]}
              data={goals}
              enableRowHeader={false}
              onSelection={(focusedCell) => {
                console.log(focusedCell)
              }}
              hasNextPage={hasNextPage}
              hasPrevPage={hasPrevPage}
              onNextPage={onNextPage}
              onPrevPage={onPrevPage}
              page={page}
              emptyTableMessage="No SP Goals Found"
            />
          </Col>
        </div>
      </div>
    </div>
  );
}

export default ClientContacts;