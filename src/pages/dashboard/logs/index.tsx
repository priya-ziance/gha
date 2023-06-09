import { useContext } from 'react';
import { BreadcrumbProps } from '@blueprintjs/core';

import { ModuleCard, PageHeading, Row } from '../../../components';

import ClientContext from '../../../contexts/client';
import withLocation from '../../../hoc/withLocation';

import { getLinks } from './links';

import URLS from '../../../utils/urls';

import './index.scss';


const Content = () => {
  const { id: clientId } = useContext(ClientContext);
  const links = getLinks(clientId)

  const BREADCRUMBS: BreadcrumbProps[] = [
    { href: URLS.getPagePath('dashboard'), icon: 'document', text: URLS.getPagePathName('dashboard')},
    { text: URLS.getPagePathName('logs') }
  ];

  return (
    <div>
      <div className='clients'>
        <PageHeading
          title='Clients'
          breadCrumbs={BREADCRUMBS}
        />
        <div className='clients__container'>
          <Row>
            {links.map(link => {
              return (
                <ModuleCard
                  key={link.title}
                  title={link.title}
                  body={link.description}
                  interactive
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