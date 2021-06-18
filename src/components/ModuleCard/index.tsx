import { Elevation } from '@blueprintjs/core';

import Card, { CardProps } from '../Card';
import Col from '../Col';
import Row from '../Row';
import H4 from '../H4';
import Ellipsis from '../Ellipsis';

import './index.scss';

export interface ModuleCardProps {
  title: string;
  body?: string;
  grow?: boolean;
  link?: string;
  image: string;
}

const ModuleCard = (_props: CardProps & ModuleCardProps) => {
  const { body, className, grow, image, link, title, ...props } = _props;

  let localClassName = 'gha__modulecard';

  if (grow) {
    localClassName += ' gha__modulecard--grow';
  }

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
            src={image}
            className='gha__modulecard__img'
          />
        </Col>
        <Col className='gha__modulecard__info-col'>
          <H4>{title}</H4>
          <p>
            <Ellipsis
              text={body}
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