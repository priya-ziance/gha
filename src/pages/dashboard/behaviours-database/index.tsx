import { useContext, useEffect, useState } from 'react';
import { BreadcrumbProps, Intent } from '@blueprintjs/core';
import { IconNames } from '@blueprintjs/icons';

import { AnchorButton, Col, PageHeading, Table } from '../../../components';

import ClientContext from '../../../contexts/client';
import LocationContext from '../../../contexts/location';

import URLS from '../../../utils/urls';

import api from '../../../api';

import Behaviour from '../../../models/behaviour';

import * as helpers from '../../../utils/helpers';

import {
  actionColumn,
  activeColumn,
  behaviourTypeColumn,
  dateColumn,
  descriptionColumn,
} from './helpers';

import './index.scss';

const PAGE_SIZE = 10;

const DatabaseBehaviours = () => {
  const [behaviours, setBehaviours] = useState<Behaviour[] | []>([]);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const { id: clientId } = useContext(ClientContext);
  const { id: selectedLocationId } = useContext(LocationContext)

  const hasNextPage = behaviours.length === PAGE_SIZE;
  const hasPrevPage = page > 0;

  useEffect(() => {
    (async () => {
      setLoading(true);

      try {
        setBehaviours(
          await api.behaviours.getBehaviours(clientId, { page, pageSize: PAGE_SIZE })
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
    { href: URLS.getPagePath('behaviours', { clientId }), icon: 'document', text: URLS.getPagePathName('behaviours') },
    { text: URLS.getPagePathName('behaviours-database') },
  ];

  const getAddButton = () => {
    return (
      <AnchorButton
        buttonProps={{
          intent: Intent.PRIMARY,
          icon: IconNames.ADD
        }}
        linkProps={{
          to: URLS.getPagePath('add-database-behaviour', { clientId })
        }}
      >
        Add behaviour
      </AnchorButton>
    );
  }

  return (
    <div>
      <div className='behaviours-database'>
        <PageHeading
          title='Behaviour Problem List'
          breadCrumbs={BREADCRUMBS}
          renderRight={getAddButton}
        />
        <div className='behaviours-database__container'>
          <Col>
            <Table
              loading={loading}
              numRows={behaviours.length}
              getCellClipboardData={(row, col) => {

                return behaviours[row]
              }}
              columns={[
                {
                  title: 'ID',
                  cellRenderer: (data) => (<p>{data.id}</p>),
                  width: helpers.getTableWith(0.1)
                },
                {
                  title: 'Behaviour Type',
                  cellRenderer: behaviourTypeColumn,
                  width: helpers.getTableWith(0.2)
                },
                {
                  title: 'Behaviour Description',
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
                  cellRenderer: (data) => {
                    return actionColumn(
                      data,
                      {
                        viewLink: URLS.getPagePath(
                          'edit-database-behaviour',
                          { clientId, behaviourId: data.id })
                      }
                    )
                  },
                  width: helpers.getTableWith(0.1)
                }
              ]}
              data={behaviours}
              enableRowHeader={false}
              onSelection={(focusedCell) => {
                console.log(focusedCell)
              }}
              hasNextPage={hasNextPage}
              hasPrevPage={hasPrevPage}
              onNextPage={onNextPage}
              onPrevPage={onPrevPage}
              page={page}
              emptyTableMessage="No Behaviours Found"
            />
          </Col>
        </div>
      </div>
    </div>
  );
}

export default DatabaseBehaviours;