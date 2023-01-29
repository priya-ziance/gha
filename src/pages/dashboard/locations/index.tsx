import { useContext, useEffect, useState } from 'react';
import { BreadcrumbProps, Intent } from '@blueprintjs/core';
import { IconNames } from '@blueprintjs/icons';

import { AnchorButton, Col, PageHeading, Table } from '../../../components';

import ClientContext from '../../../contexts/client';
import LocationContext from '../../../contexts/location';

import URLS from '../../../utils/urls';

import api from '../../../api';

import Location from '../../../models/location';

import * as helpers from '../../../utils/helpers';

import {
  actionColumn,
  phoneColumn,
  addressColumn,
} from './helpers';

import './index.scss';

const PAGE_SIZE = 10;

const ClientLocations = () => {
  const [locations, setLocations] = useState<Location[] | []>([]);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const { id: clientId } = useContext(ClientContext);
  const { id: selectedLocationId } = useContext(LocationContext)

  const hasNextPage = locations.length === PAGE_SIZE;
  const hasPrevPage = page > 0;

  useEffect(() => {
    (async () => {
      setLoading(true);

      try {
        const locations: Location[] = await api.locations.getLocations({ page, params: { pageSize: PAGE_SIZE } })
        setLocations(locations)
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
    { text: URLS.getPagePathName('locations') }
  ];

  const getAddButton = () => {
    return (
      <AnchorButton
        buttonProps={{
          intent: Intent.PRIMARY,
          icon: IconNames.ADD
        }}
        linkProps={{
          to: URLS.getPagePath('add-location')
        }}
      >
        Add location
      </AnchorButton>
    );
  }
  

  return (
    <div>
      <div className='locations'>
        <PageHeading
          title='Locations'
          breadCrumbs={BREADCRUMBS}
          renderRight={getAddButton}
        />
        <div className='locations__container'>
          <Col>
            <Table
              loading={loading}
              numRows={locations.length}
              getCellClipboardData={(row, col) => {

                return locations[row]
              }}
              columns={[
                {
                  title: 'ID',
                  cellRenderer: (data) => (<p>{data.id}</p>),
                  width: helpers.getTableWith(0.1)
                },
                {
                  title: 'Address',
                  cellRenderer: addressColumn,
                  width: helpers.getTableWith(0.6)
                },
                {
                  title: 'Phone',
                  cellRenderer: phoneColumn,
                  width: helpers.getTableWith(0.2)
                },
                {
                  title: 'Actions',
                  cellRenderer: (data) => {
                    return actionColumn(
                      data,
                      {
                        viewLink: URLS.getPagePath(
                          'edit-location',
                          { clientId, locationId: data.id })
                      }
                    )
                  },
                  width: helpers.getTableWith(0.1)
                }
              ]}
              data={locations}
              enableRowHeader={false}
              
              hasNextPage={hasNextPage}
              hasPrevPage={hasPrevPage}
              onNextPage={onNextPage}
              onPrevPage={onPrevPage}
              page={page}
              emptyTableMessage="No Locations Found"
            />
          </Col>
        </div>
      </div>
    </div>
  );
}

export default ClientLocations;