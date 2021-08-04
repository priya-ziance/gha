import { ModuleCard, PageHeading, Row } from '../../../components';

import ClientsImage from '../../../assets/svg/man-woman.svg';
import ListImage from '../../../assets/svg/list.svg';
import ReportImage from '../../../assets/svg/report.svg';

import './index.scss';

const Content = () => {
  return (
    <div className='content'>
      <PageHeading
        title='Dashboard'
      />
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
            image={ListImage}
          />
          <ModuleCard
            title='Reports'
            image={ReportImage}
          />
        </Row>
      </div>
    </div>
  );
}

export default Content;