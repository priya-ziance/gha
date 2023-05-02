import { useContext, useEffect, useState } from 'react';
import { BreadcrumbProps, Intent } from '@blueprintjs/core';
import { IconNames } from '@blueprintjs/icons';

import { AnchorButton, Col, PageHeading, Table } from '../../../components';

import ClientContext from '../../../contexts/client';

import URLS from '../../../utils/urls';

import api from '../../../api';

import * as helpers from '../../../utils/helpers';

import { IMedicationModel } from '../../../types';

import {
  actionColumn,
  medTimeColumn,
  dosageColumn,
  directionsColumn,
  propriataryNameColumn,
  typeColumn,
  expiryColumn
} from './helpers';

import './index.scss';
import ToastsContext from '../../../contexts/toasts';

const PAGE_SIZE = 10;

const MedicationListPage = () => {
  const [medications, setMedications] = useState<IMedicationModel[] | []>([]);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const { id: clientId } = useContext(ClientContext);
  const { addToast } = useContext(ToastsContext);

  const hasNextPage = medications.length === PAGE_SIZE;
  const hasPrevPage = page > 0;

  const fetchData = async () => {
    setLoading(true);

    try {
      setMedications(
        await api.medications.getMedications(clientId, { page, pageSize: PAGE_SIZE })
      )
    } catch(e: any){}

    setTimeout(() => {
      setLoading(false);
    }, 200)
  };
  useEffect(() => {
    fetchData()
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
    { href: URLS.getPagePath('medication', { clientId }), icon: 'document', text: URLS.getPagePathName('medication') },
    { text: URLS.getPagePathName('medication-list') }
  ];

  const getAddButton = () => {
    return (
      <AnchorButton
        buttonProps={{
          intent: Intent.PRIMARY,
          icon: IconNames.ADD
        }}
        linkProps={{
          to: URLS.getPagePath('add-medication', { clientId })
        }}
      >
        Add Medication
      </AnchorButton>
    );
  }
  
  const deleteMedication = async (data: IMedicationModel) => {
    setLoading(true)
    console.log("fhsdikf",data);
    
    try {
      await api.medications.deleteMedication(data.id|| "",clientId,data)

      await fetchData()
      addToast({
        message: 'Deleted...',
        intent: 'success'
      })
    } catch (e: any) {
      addToast({
        message: 'Something went wrong',
        intent: 'danger'
      })
    }

    setLoading(false)
  }
  return (
    <div>
      <div className='medication-list'>
        <PageHeading
          title='Medication List'
          breadCrumbs={BREADCRUMBS}
          renderRight={getAddButton}
        />
        <div className='medication-list__container'>
          <Col>
            <Table
              loading={loading}
              numRows={medications.length}
              columns={[
                {
                  title: 'Proprietary Name',
                  cellRenderer: propriataryNameColumn,
                  width: helpers.getTableWith(0.15)
                },
                {
                  title: 'Type',
                  cellRenderer: typeColumn,
                  width: helpers.getTableWith(0.15)
                },
                {
                  title: 'Dosage',
                  cellRenderer: dosageColumn,
                  width: helpers.getTableWith(0.10)
                },
                {
                  title: 'Directions',
                  cellRenderer: directionsColumn,
                  width: helpers.getTableWith(0.35)
                },
                {
                  title: 'Exp Date',
                  cellRenderer: expiryColumn,
                  width: helpers.getTableWith(0.15)
                },
                {
                  title: 'Actions',
                  cellRenderer: (data) => {
                    return actionColumn(
                      data,
                      {
                        viewLink: URLS.getPagePath(
                          'edit-medication',
                          { clientId, medicationId: data.id }),
                          onDelete() {
                            deleteMedication(data)
                          }
                      }
                    )
                  },
                  width: helpers.getTableWith(0.1)
                }
              ]}
              data={medications}
              enableRowHeader={false}
              
              hasNextPage={hasNextPage}
              hasPrevPage={hasPrevPage}
              onNextPage={onNextPage}
              onPrevPage={onPrevPage}
              page={page}
              emptyTableMessage="No Client Medication Found"
            />
          </Col>
        </div>
      </div>
    </div>
  );
}

export default MedicationListPage;
