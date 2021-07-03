import { useContext } from 'react';
import { BreadcrumbProps, Intent } from '@blueprintjs/core';
import { IconNames } from '@blueprintjs/icons';

import { AnchorButton, Col, PageHeading, Table } from '../../../components';

import ClientContext from '../../../contexts/client';

import URLS from '../../../utils/urls';

import './index.scss';


const ClientContacts = () => {
  const { id: clientId } = useContext(ClientContext);

  const tableData = ['test','test','test','test','test','test','test','test','test','test','test','test','test','test','test','test','test','test','test','test','test','test','test','test','test','test','test','test','test','test','test','test','test','test','test','test','test','test','test','test','test','test','test','test','test','test','test','test','test','test','test','test','test','test']

  const BREADCRUMBS: BreadcrumbProps[] = [
    { href: URLS.getPagePath('dashboard'), icon: 'document', text: 'Dashboard'},
    { href: URLS.getPagePath('clients'), icon: 'document', text: "Clients" },
    { href: URLS.getPagePath('client-links', { clientId }), icon: 'document', text: 'Links' },
    { text: 'Client Contact' }
  ];

  const getAddButton = () => {
    return (
      <AnchorButton
        buttonProps={{
          intent: Intent.PRIMARY,
          icon: IconNames.ADD
        }}
        linkProps={{
          to: `/dashboard/clients/${clientId}/client_contacts/add`
        }}
      >
        Add client
      </AnchorButton>
    );
  }
  

  return (
    <div>
      <div className='clients'>
        <PageHeading
          title='Client Contacts'
          breadCrumbs={BREADCRUMBS}
          renderRight={getAddButton}
        />
        <div className='clients__container'>
          <Col>
            <Table
              numRows={tableData.length}
              getCellClipboardData={(row, col) => {
                return tableData[row]
              }}
              columns={[
                {
                  title: 'Trial',
                  cellRenderer: (data) => (<p>{data}</p>),
                  width: 100
                },
                {
                  title: 'Trial',
                  cellRenderer: (data) => data
                },
                {
                  title: 'Trial',
                  cellRenderer: (data) => data
                }
              ]}
              data={tableData}
            />
          </Col>
        </div>
      </div>
    </div>
  );
}

export default ClientContacts;