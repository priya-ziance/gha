import { useContext, useEffect, useState } from 'react';
import { BreadcrumbProps, Intent } from '@blueprintjs/core';
import { IconNames } from '@blueprintjs/icons';

import { AnchorButton, Col, PageHeading, Table } from '../../../components';

import ClientContext from '../../../contexts/client';

import URLS from '../../../utils/urls';

import api from '../../../api';

import * as helpers from '../../../utils/helpers';

import { IAddAdpModel, IClientContactModel } from '../../../types';

import {
  actionColumn,
  addressColumn,
  nameColumn,
  countryNameColumn,
  telephoneColumn,
  notifiedColumn,
  criticalIncidentColumn,
  criticalIncidentTypeColumn,
  facilityColumn,
  incidentDateColumn,
  reportedDateColumn,
  eventDescColumn,
} from './helpers';

import './index.scss';
import ToastsContext from '../../../contexts/toasts';

const PAGE_SIZE = 10;

const ClientContacts = () => {
  const [clientContacts, setClientContacts] = useState<IClientContactModel[] | []>([]);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const { id: clientId } = useContext(ClientContext);
  const [adp, setadp] = useState<IAddAdpModel[] | []>(
    []
  )
  const { addToast } = useContext(ToastsContext);

  const hasNextPage = clientContacts.length === PAGE_SIZE;
  const hasPrevPage = page > 0;

  useEffect(() => {
    (async () => {
      setLoading(true);

      try {
        setClientContacts(
          await api.clientContacts.getClientContacts(clientId, { page, pageSize: PAGE_SIZE })
        )
      } catch(e: any){}

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
  const fetchData = async () => {
    setLoading(true);
    try {
      setadp(
        await api.ADP.getAdp(clientId, {
          page,
          pageSize: PAGE_SIZE,
        })
      );
    } catch (e: any) { }
    setTimeout(() => {
      setLoading(false);
    }, 200);
  };
  useEffect(() => {
    fetchData()
  }, [clientId, page]);
  const onPrevPage = () => {
    if (hasPrevPage) {
      setPage(page => page - 1)
    }
  }
  const deleteadp = async (data: IAddAdpModel) => {
    setLoading(true)

    try {
      await api.ADP.deleteAdp(data.adp?._id || "")

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

  const BREADCRUMBS: BreadcrumbProps[] = [
    { href: URLS.getPagePath('dashboard'), icon: 'document', text: URLS.getPagePathName('dashboard')},
    { href: URLS.getPagePath('clients'), icon: 'document', text: URLS.getPagePathName('clients') },
    { href: URLS.getPagePath('client-links', { clientId }), icon: 'document', text: URLS.getPagePathName('client-links') },
    { text: URLS.getPagePathName('apd') }
  ];

  const getAddButton = () => {
    return (
      <AnchorButton
        buttonProps={{
          intent: Intent.PRIMARY,
          icon: IconNames.ADD
        }}
        linkProps={{
          to: URLS.getPagePath('add-apd', { clientId })
        }}
      >
        Add APD
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
              numRows={clientContacts.length}
              getCellClipboardData={(row, col) => {
                return clientContacts[row]
              }}
              columns={[
                // {
                //   title: 'First Name',
                //   cellRenderer: firstNameColumn,
                //   width: helpers.getTableWith(0.15)
                // },
                // {
                //   title: 'Last Name',
                //   cellRenderer: lastNameColumn,
                //   width: helpers.getTableWith(0.15)
                // },
                // {
                //   title: 'DOB',
                //   cellRenderer: dateOfBirthColumn,
                //   width: helpers.getTableWith(0.13)
                // },
                // {
                //   title: 'Active',
                //   cellRenderer: activeColumn,
                //   width: helpers.getTableWith(0.07)
                // },
                // {
                //   title: 'Address',
                //   cellRenderer: addressColumn,
                //   width: helpers.getTableWith(0.3)
                // },
                // {
                //   title: 'Actions',
                //   cellRenderer: actionColumn,
                //   width: helpers.getTableWith(0.2)
                // }
                {
                  title: "Name",
                  cellRenderer: nameColumn,
                  width: helpers.getTableWith(0.25),
                },
                {
                  title: "Address",
                  cellRenderer: addressColumn,
                  width: helpers.getTableWith(0.25),
                },
                {
                  title: "Country",
                  cellRenderer: countryNameColumn,
                  width: helpers.getTableWith(0.25),
                },
                {
                  title: "Telephone",
                  cellRenderer: telephoneColumn,
                  width: helpers.getTableWith(0.25),
                },
                {
                  title: "Notified",
                  cellRenderer: notifiedColumn,
                  width: helpers.getTableWith(0.25),
                },
                {
                  title: "Critical Incident",
                  cellRenderer: criticalIncidentColumn,
                  width: helpers.getTableWith(0.25),
                },
                {
                  title: "Critical Incident Type",
                  cellRenderer: criticalIncidentTypeColumn,
                  width: helpers.getTableWith(0.25),
                },
                {
                  title: "Name of Facility",
                  cellRenderer: facilityColumn,
                  width: helpers.getTableWith(0.25),
                },
                {
                  title: "Incient Date",
                  cellRenderer: incidentDateColumn,
                  width: helpers.getTableWith(0.25),
                },
                {
                  title: "Reported Date",
                  cellRenderer: reportedDateColumn,
                  width: helpers.getTableWith(0.25),
                },
                {
                  title: "Event Description",
                  cellRenderer: eventDescColumn,
                  width: helpers.getTableWith(0.25),
                },
                {
                  title: "Actions",
                  cellRenderer: (data: any) => {
                    return actionColumn(data, {
                      viewLink: URLS.getPagePath("edit-adp", {
                        clientId,
                        clientContactId: data.id,
                      }),
                      onDelete() {
                        deleteadp (data)
                      }
                    });
                  },
                  width: helpers.getTableWith(0.1),
                },
              ]}
              data={clientContacts}
              enableRowHeader={false}
              
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