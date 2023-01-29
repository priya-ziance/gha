import { useContext, useEffect, useState } from 'react';
import { BreadcrumbProps, Intent } from '@blueprintjs/core';
import { IconNames } from '@blueprintjs/icons';
import useSWR from 'swr'

import { Button, Col, PageHeading, Table } from '../../../components';

import ClientContext from '../../../contexts/client';

import URLS from '../../../utils/urls';

import api from '../../../api';

import * as helpers from '../../../utils/helpers';

import { IPlaceDatabaseModel } from '../../../types';

import {
  actionColumn,
  activeColumn,
  dateColumn,
  descriptionColumn,
} from './helpers';

import AddPlaceDialog from './addPlaceDialog';
import DeletePlaceDialog from './deletePlaceDialog';

import './index.scss';

const PAGE_SIZE = 10;

const TYPE = 'lifeskills';

const DatabasePlaces = () => {
  const [page, setPage] = useState(0);
  const [isAddPlaceOpen, setIsAddPlaceOpen] = useState(false);
  const [selectedPlace, setSelectedPlace] = useState<IPlaceDatabaseModel | undefined>(undefined);
  const [selectedPlaceToDelete, setSelectedPlaceToDelete] = useState<IPlaceDatabaseModel | undefined>(undefined);
  const { id: clientId } = useContext(ClientContext);

  const { data: _places, isValidating } = useSWR('/api/client-behaviours', () => {
    return api.places.getPlaces(clientId, TYPE, { page, pageSize: PAGE_SIZE })
  }, { refreshInterval: 50 })

  const places = _places || []

  const hasNextPage = places.length === PAGE_SIZE;
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
    { href: URLS.getPagePath('logs'), icon: 'document', text: URLS.getPagePathName('logs') },
    { href: URLS.getPagePath('life-skills'), icon: 'document', text: URLS.getPagePathName('life-skills') },
    { text: URLS.getPagePathName('life-skills-places-database') }
  ];

  const onAddPlace = () => {
    setIsAddPlaceOpen(true)
  }

  const onClosePlaceDialog = () => {
    setIsAddPlaceOpen(false)
    setSelectedPlace(undefined);
  }

  const onCloseDeleteDialog = () => {
    setSelectedPlaceToDelete(undefined)
  }

  const getAddButton = () => {
    return (
      <Button
        intent={Intent.PRIMARY}
        icon={IconNames.ADD}
        onClick={onAddPlace}
      >
        Add place
      </Button>
    );
  }

  return (
    <div>
      <div className='life-skills-places'>
        <PageHeading
          title='Life Skills Places Database'
          breadCrumbs={BREADCRUMBS}
          renderRight={getAddButton}
        />
        <div className='life-skills-places__container'>
          <Col>
            <Table
              loading={isValidating && !places}
              numRows={places.length}
              getCellClipboardData={(row, col) => {

                return places[row]
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
                        onView(data: IPlaceDatabaseModel) {
                          setSelectedPlace(data);
                          setIsAddPlaceOpen(true)
                        },
                        onDelete(data: IPlaceDatabaseModel) {
                          setSelectedPlaceToDelete(data)
                        }
                      }
                    )
                  },
                  width: helpers.getTableWith(0.2)
                }
              ]}
              data={places}
              enableRowHeader={false}
              
              hasNextPage={hasNextPage}
              hasPrevPage={hasPrevPage}
              onNextPage={onNextPage}
              onPrevPage={onPrevPage}
              page={page}
              emptyTableMessage="No Places Found"
            />
          </Col>
        </div>

        <AddPlaceDialog place={selectedPlace} isOpen={isAddPlaceOpen} onClose={onClosePlaceDialog} type={TYPE} />
        {selectedPlaceToDelete &&
          <DeletePlaceDialog place={selectedPlaceToDelete} isOpen={!!selectedPlaceToDelete} onClose={onCloseDeleteDialog} />
        }
      </div>
    </div>
  );
}

export default DatabasePlaces;