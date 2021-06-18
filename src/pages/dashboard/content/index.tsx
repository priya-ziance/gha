import urls from '../../../utils/urls';

import { ModuleCard, H1, Row } from '../../../components';

import './index.scss';

const Content = () => {
  return (
    <div className='content'>
      <H1 intent='primary'>Dashboard</H1>
      <div className='content__container'>
        <Row>
          <ModuleCard
            title='Clients'
            interactive
            link='/dasboard/clients'
            image=''
          />
          <ModuleCard
            title='User Tasks List'
            interactive
            image=''
          />
          <ModuleCard
            title='Reports'
            interactive
            image=''
          />
        </Row>
      </div>
    </div>
  );
}

export default Content;