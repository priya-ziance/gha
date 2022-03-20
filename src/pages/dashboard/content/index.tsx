import { ModuleCard, PageHeading, Row } from '../../../components';

import { getLinks } from './links';

import './index.scss';

const Content = () => {
  const links = getLinks()

  return (
    <div className='content'>
      <PageHeading
        title='Dashboard'
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