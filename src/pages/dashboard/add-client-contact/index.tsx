import { useContext, useState } from 'react';
import { BreadcrumbProps, Intent } from '@blueprintjs/core';
import { IconNames } from '@blueprintjs/icons';

import api from '../../../api';

import URLS from '../../../utils/urls';

import { PageHeading, Row } from '../../../components';

import ClientContext from '../../../contexts/client';

import Client from '../../../models/client';

import './index.scss';


const Content = () => {
  const [clients, setClients] = useState<Client[] | []>([]);
  const [loading, setLoading] = useState(false);

  const { id: clientId } = useContext(ClientContext);

  const BREADCRUMBS: BreadcrumbProps[] = [
    { href: URLS.getPagePath('dashboard'), icon: 'document', text: 'Dashboard'},
    { href: URLS.getPagePath('clients'), icon: 'document', text: "Clients" },
    { href: URLS.getPagePath('client-links', { clientId }), icon: 'document', text: 'Links' },
    { href: URLS.getPagePath('client-contacts', { clientId }), icon: 'document', text: 'Client Contacts' },
    { text: 'Add Client Contact' }
  ];

  return (
    <div className='add-client-contact'>
      <PageHeading
        title='Add Client Contact Detail'
        breadCrumbs={BREADCRUMBS}
      />
      <div className='clients__container'>
        
      </div>
    </div>
  );
}

export default Content;