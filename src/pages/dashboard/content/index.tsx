import urls from '../../../utils/urls';

import { ModuleCard, H1, Row } from '../../../components';

import ClientsImage from '../../../assets/svg/man-woman.svg';
import ListImage from '../../../assets/svg/list.svg';
import ReportImage from '../../../assets/svg/report.svg';

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
            link='/dashboard/clients'
            image={ClientsImage}
          />
          <ModuleCard
            title='User Tasks List'
            interactive
            image={ListImage}
          />
          <ModuleCard
            title='Reports'
            interactive
            image={ReportImage}
          />
        </Row>
      </div>
    </div>
  );
}

export default Content;