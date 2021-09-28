import { useContext } from 'react';
import { BreadcrumbProps } from '@blueprintjs/core';

import { ModuleCard, PageHeading, Row } from '../../../components';

import URLS from '../../../utils/urls';

import ClientContext from '../../../contexts/client';

import { getLinks } from './links';

import './index.scss';


const Content = () => {
  const { id: clientId } = useContext(ClientContext);
  const links = getLinks(clientId)

  const BREADCRUMBS: BreadcrumbProps[] = [
    { href: URLS.getPagePath('dashboard'), icon: 'document', text: URLS.getPagePathName('dashboard')},
    { href: URLS.getPagePath('clients'), icon: 'document', text: URLS.getPagePathName('clients') },
    { href: URLS.getPagePath('client-links', { clientId }), icon: 'document', text: URLS.getPagePathName('client-links')},
    { href: URLS.getPagePath('goals', { clientId }), icon: 'document', text: URLS.getPagePathName('goals') },
    { text: URLS.getPagePathName('goals-database') }
  ];

  return (
    <div>
      <div className='goals-database'>
        <PageHeading
          title='Clients'
          breadCrumbs={BREADCRUMBS}
        />
        <div className='goals-database__container'>
          <Row>
            {links.map(link => {
              return (
                <ModuleCard
                  key={link.title}
                  title={link.title}
                  interactive={link.interactive}
                  link={link.path}
                  image={link.image}
                />
              );
            })}
          </Row>
        </div>
      </div>
    </div>
  );
}

export default Content;