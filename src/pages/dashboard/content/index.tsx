import urls from '../../../utils/urls';

import { Button, ModuleCard, H1 } from '../../../components';

import './index.scss';

const Content = () => {
  return (
    <div>
      <H1 intent='primary'>Dashboard</H1>
      <ModuleCard
        title='James Elujoba'
        interactive
      />
    </div>
  );
}

export default Content;