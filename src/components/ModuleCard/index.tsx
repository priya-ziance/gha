import { useEffect, useState } from 'react';
import { Elevation, Spinner } from '@blueprintjs/core';
import { Link } from 'react-router-dom';

import Card, { CardProps } from '../Card';
import Col from '../Col';
import Row from '../Row';
import H4 from '../H4';
import Ellipsis from '../Ellipsis';

import './index.scss';
import { IFileModel } from '../../types';

export interface ModuleCardProps {
  title: string;
  body?: string;
  grow?: boolean;
  link?: string;
  image?: string;
  imageFile?: IFileModel
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
  const { body, className, grow, image, link, title, imageFile, ...props } = _props;
  const [imageLoading, setImageLoading] = useState(false);
  const [cardImage, setCardImage] = useState(image);

  useEffect(() => {
    (async () => {
      if (imageFile) {
        setImageLoading(true)

        try {
          await imageFile.loadFile();
          setCardImage(imageFile.publicUrl);
        } catch(e: any) {}

        setImageLoading(false)
      }
    })()
  }, [imageFile])

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
            {imageLoading ?
              <Spinner />
              :
              <img
                alt='module'
                src={cardImage}
                className='gha__modulecard__img'
              />
            }
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