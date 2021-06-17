import { Elevation } from '@blueprintjs/core';

import Card, { CardProps } from '../Card';
import Col from '../Col';
import Row from '../Row';
import H4 from '../H4';
import Ellipsis from '../Ellipsis';

import './index.scss';

const ModuleCard = (_props: CardProps) => {
  const { className, ...props } = _props;

  let localClassName = 'gha__modulecard';

  if (className) {
    if (Array.isArray(className)) {
      localClassName = `${className.join(' ')} ${localClassName}`;
    } else {
      localClassName = `${className} ${localClassName}`
    }
  }

  return (
    <Card {...props} className={localClassName} elevation={Elevation.ONE}>
      <Row>
        <Col>
          <img
            alt='module'
            src='https://images.unsplash.com/photo-1593642634443-44adaa06623a?ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1525&q=80'
            className='gha__modulecard__img'
          />
        </Col>
        <Col className='gha__modulecard__info-col'>
          <H4>James Elujoba</H4>
          <p>
            <Ellipsis
              text='This is the main test of your resolve. This is the main test of your resolve. This is the main test of your resolve. This is the main test of your resolve'
              breakpoints={{
                sm: 30
              }}
            />
          </p>
        </Col>
      </Row>
    </Card>
  );
};

export default ModuleCard;