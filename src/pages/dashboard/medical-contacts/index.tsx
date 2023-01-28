import { useContext, useEffect, useState } from 'react';
import { BreadcrumbProps, Intent } from '@blueprintjs/core';
import { IconNames } from '@blueprintjs/icons';

import { AnchorButton, Col, PageHeading, Table } from '../../../components';

import ClientContext from '../../../contexts/client';

import URLS from '../../../utils/urls';

import api from '../../../api';

import * as helpers from '../../../utils/helpers';

import { IClientContactModel } from '../../../types';

import {
  actionColumn,
  activeColumn,
  medicalContactColumn,
  contactTypeColumn,
  firstNameColumn,
  lastNameColumn,
} from './helpers';

import './index.scss';

const MedicalClientContacts = () => {
  const [clientContacts, setMedicalClientContacts] = useState<IClientContactModel[] | []>([]);
  const [loading, setLoading] = useState(false);
  const { id: clientId } = useContext(ClientContext);

  useEffect(() => {
    (async () => {
      setLoading(true);

      try {
        setMedicalClientContacts(
          await api.clientContacts.getMedicalClientContacts()
        )
      } catch(e: any){}

      setTimeout(() => {
        setLoading(false);
      }, 200)
    })()
  }, []);

  const BREADCRUMBS: BreadcrumbProps[] = [
    { href: URLS.getPagePath('dashboard'), icon: 'document', text: URLS.getPagePathName('dashboard')},
    { href: URLS.getPagePath('admins'), icon: 'document', text: URLS.getPagePathName('admins') },
    { text: URLS.getPagePathName('medical-contacts') }
  ];

  const getAddButton = () => {
    return (
      <AnchorButton
        buttonProps={{
          intent: Intent.PRIMARY,
          icon: IconNames.ADD
        }}
        linkProps={{
          to: URLS.getPagePath('add-medical-contact')
        }}
      >
        Add medical contact
      </AnchorButton>
    );
  }
  

  return (
    <div>
      <div className='medical-contacts'>
        <PageHeading
          title='Client Contacts'
          breadCrumbs={BREADCRUMBS}
          renderRight={getAddButton}
        />
        <div className='medical-contacts__container'>
          <Col>
            <Table
              loading={loading}
              numRows={clientContacts.length}
              getCellClipboardData={(row, col) => {
                return clientContacts[row]
              }}
              columns={[
                {
                  title: 'First Name',
                  cellRenderer: firstNameColumn,
                  width: helpers.getTableWith(0.25)
                },
                {
                  title: 'Last Name',
                  cellRenderer: lastNameColumn,
                  width: helpers.getTableWith(0.25)
                },
                {
                  title: 'Contact Type',
                  cellRenderer: contactTypeColumn,
                  width: helpers.getTableWith(0.2)
                },
                {
                  title: 'Medical Contact',
                  cellRenderer: medicalContactColumn,
                  width: helpers.getTableWith(0.13)
                },
                {
                  title: 'Active',
                  cellRenderer: activeColumn,
                  width: helpers.getTableWith(0.07)
                },
                {
                  title: 'Actions',
                  cellRenderer: (data) => {
                    return actionColumn(
                      data,
                      {
                        viewLink: URLS.getPagePath(
                          'edit-medical-contact',
                          { clientId, medicalContactId: data.id })
                      }
                    )
                  },
                  width: helpers.getTableWith(0.1)
                }
              ]}
              data={clientContacts}
              enableRowHeader={false}
              emptyTableMessage="No Medical Contacts Found"
            />
          </Col>
        </div>
      </div>
    </div>
  );
}

export default MedicalClientContacts;