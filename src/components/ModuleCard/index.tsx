import { Elevation } from '@blueprintjs/core';
import { Link } from 'react-router-dom';

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

const LinkWrapper = (props: any) => {
  if (props.link) {
    return (
      <Link to={props.link || ''}>
        {props.children}
      </Link>
    );
  } else {
    return props.children;
  }
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
      <LinkWrapper link={link || ''}>
        <Row>
          <Col xs={4}>
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
      </LinkWrapper>
    </Card>
  );
};

export default ModuleCard;