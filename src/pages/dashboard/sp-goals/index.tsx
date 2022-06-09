import { useContext, useEffect, useState } from 'react';
import { BreadcrumbProps, Intent } from '@blueprintjs/core';
import { IconNames } from '@blueprintjs/icons';

import { AnchorButton, Col, PageHeading, Table } from '../../../components';

import ClientContext from '../../../contexts/client';
import LocationContext from '../../../contexts/location';

import URLS from '../../../utils/urls';

import api from '../../../api';

import SpGoal from '../../../models/spGoal';

import * as helpers from '../../../utils/helpers';

import {
  actionColumn,
  activeColumn,
  dateColumn,
  notesColumn,
} from './helpers';

import './index.scss';

const PAGE_SIZE = 10;

const DatabaseGoals = () => {
  const [spGoals, setSpGoals] = useState<SpGoal[] | []>([]);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const { id: clientId } = useContext(ClientContext);
  const { id: selectedLocationId } = useContext(LocationContext)

  const hasNextPage = spGoals.length === PAGE_SIZE;
  const hasPrevPage = page > 0;

  useEffect(() => {
    (async () => {
      setLoading(true);

      try {
        setSpGoals(
          await api.spGoals.getSpGoals(clientId, { page, pageSize: PAGE_SIZE })
        )
      } catch(e: any){}

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
        Add SP Goal
      </AnchorButton>
    );
  }

  return (
    <div>
      <div className='goals-database-goals'>
        <PageHeading
          title='SP Goals'
          breadCrumbs={BREADCRUMBS}
          renderRight={getAddButton}
        />
        <div className='goals-database-goals__container'>
          <Col>
            <Table
              loading={loading}
              numRows={spGoals.length}
              columns={[
                {
                  title: 'ID',
                  cellRenderer: (data) => (<p>{data.id}</p>),
                  width: helpers.getTableWith(0.1)
                },
                {
                  title: 'Notes',
                  cellRenderer: notesColumn,
                  width: helpers.getTableWith(0.6)
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
                        viewLink: URLS.getPagePath(
                          'edit-database-goal',
                          { clientId, goalId: data.id })
                      }
                    )
                  },
                  width: helpers.getTableWith(0.1)
                }
              ]}
              data={spGoals}
              enableRowHeader={false}
              hasNextPage={hasNextPage}
              hasPrevPage={hasPrevPage}
              onNextPage={onNextPage}
              onPrevPage={onPrevPage}
              page={page}
              emptyTableMessage="No Sp Goals Found"
            />
          </Col>
        </div>
      </div>
    </div>
  );
}

export default DatabaseGoals;