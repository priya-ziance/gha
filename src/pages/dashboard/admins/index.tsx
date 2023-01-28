import { ModuleCard, PageHeading, Row } from '../../../components';

import { getLinks } from './links';

import './index.scss';
import URLS from '../../../utils/urls';
import { BreadcrumbProps } from '@blueprintjs/core';

const Content = () => {
  const links = getLinks()

  const BREADCRUMBS: BreadcrumbProps[] = [
    { href: URLS.getPagePath('dashboard'), icon: 'document', text: URLS.getPagePathName('dashboard')},
    { text: URLS.getPagePathName('admins') }
  ];

  return (
    <div className='content'>
      <PageHeading
        title='Dashboard'
        breadCrumbs={BREADCRUMBS}
      />
      <div className='content__container'>
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
  );
}

export default Content;