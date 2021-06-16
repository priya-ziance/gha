import Card, { CardProps } from '../Card';
import Col from '../Col';
import Row from '../Row';

import './index.scss';

const ModuleCard = (props: CardProps) => {
  return (
    <Card {...props}>
      <Row>
        <img
          src="https://images.unsplash.com/photo-1593642634443-44adaa06623a?ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1525&q=80"
          className="gha__modulecard__img"
        />
        <Col>

        </Col>
      </Row>
    </Card>
  );
};

export default ModuleCard;