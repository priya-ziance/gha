import { useContext } from 'react';
import { BreadcrumbProps } from '@blueprintjs/core';

import { ModuleCard, PageHeading, Row } from '../../../components';

import URLS from '../../../utils/urls';
import ClientContext from '../../../contexts/client';
import withLocation from '../../../hoc/withLocation';

import { getLinks } from './links';

import './index.scss';


const BREADCRUMBS: BreadcrumbProps[] = [
  { href: URLS.getPagePath('dashboard'), icon: 'document', text: URLS.getPagePathName('dashboard')},
  { href: URLS.getPagePath('clients'), icon: 'document', text: URLS.getPagePathName('clients') },
  { text: URLS.getPagePathName('client-links') }
];


const Content = () => {
  const { id: clientId } = useContext(ClientContext);
  const links = getLinks(clientId)

  return (
    <div>
      <div className='clients'>
        <PageHeading
          title='Clients'
          breadCrumbs={BREADCRUMBS}
        />
        <div className='clients__container'>
          <Row>
            {links.filter(link => link.interactive).map(link => {
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

export default withLocation()(Content);