import { useContext } from 'react';
import { BreadcrumbProps } from '@blueprintjs/core';

import { PageHeading } from '../../../components';

import ClientContext from '../../../contexts/client';

import URLS from '../../../utils/urls';

import './index.scss';


const Content = () => {
  const { id: clientId } = useContext(ClientContext);

  const BREADCRUMBS: BreadcrumbProps[] = [
    { href: URLS.getPagePath('dashboard'), icon: 'document', text: 'Dashboard'},
    { href: URLS.getPagePath('clients'), icon: 'document', text: "Clients" },
    { href: URLS.getPagePath('client-links', { clientId }), icon: 'document', text: 'Links' },
    { text: 'Client Contact' }
  ];
  

  return (
    <div>
      <div className='clients'>
        <PageHeading
          title='Clients'
          breadCrumbs={BREADCRUMBS}
        />
        <div className='clients__container'>
          <h1>CLient Contacts</h1>
        </div>
      </div>
    </div>
  );
}

export default Content;