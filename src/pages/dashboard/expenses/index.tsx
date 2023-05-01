

import { useContext } from 'react';
import { BreadcrumbProps } from '@blueprintjs/core';

import { ModuleCard, PageHeading, Row } from '../../../components';

import ClientContext from '../../../contexts/client';

import { getLinks } from './links';

import URLS from '../../../utils/urls';

import './index.scss';


const Content = () => {
  const { id: clientId } = useContext(ClientContext);
  const links = getLinks(clientId)

  const BREADCRUMBS: BreadcrumbProps[] = [
    { href: URLS.getPagePath('dashboard'), icon: 'document', text: URLS.getPagePathName('dashboard')},
    { href: URLS.getPagePath('clients'), icon: 'document', text: URLS.getPagePathName('clients') },
    { href: URLS.getPagePath('client-links'), icon: 'document', text: URLS.getPagePathName('client-links') },
    { text: URLS.getPagePathName('expenses') }
  ];

  return (
    <div>
      <div className='expenses'>
        <PageHeading
          title='Expenses'
          breadCrumbs={BREADCRUMBS}
        />
        <div className='module-cards__container'>
          <Row>
            {links.map(link => {
              return (
                <ModuleCard
                  key={link.title}
                  title={link.title}
                  body={link.description}
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