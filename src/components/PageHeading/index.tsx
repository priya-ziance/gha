import { Breadcrumb, Breadcrumbs, BreadcrumbProps, Icon } from '@blueprintjs/core';
import { Link } from 'react-router-dom';
import { Col, Row } from '..';

import H1 from '../H1';

import './index.scss';

interface PageHeadingProps {
  title: string;
  breadCrumbs?: BreadcrumbProps[];
  renderRight?: () => {}
}


const renderCurrentBreadcrumb = ({ text, ...restProps }: BreadcrumbProps) => {
  // customize rendering of last breadcrumb
  return <Breadcrumb {...restProps}>{text}</Breadcrumb>;
};


/**
 * 
 * @param breadcrumbs 
 * @returns 
 * 
 * This transformation is needed to use react-router-link to enable frontend routing
 */
const transformBreadcumbs = (breadcrumbs: BreadcrumbProps[]) : BreadcrumbProps[] => {
  return breadcrumbs.map(breadcrumb => {
    const { text, href, icon } = breadcrumb;
    const result: BreadcrumbProps = {};

    if (href) {
      result.text = (
        <Link className='bp3-breadcrumb' to={href}>
          {icon && <Icon icon={icon} />}
          {text}
        </Link>
      );
    } else {
      return breadcrumb;
    }

    return result;
  })
}

const PageHeading = (props: PageHeadingProps) => {
  return (
    <div className='gha__page-heading'>
      <Row>
        <Col xs={9}>
          <H1>{props.title}</H1>
          {props.breadCrumbs && props.breadCrumbs.length &&
            <Breadcrumbs
              currentBreadcrumbRenderer={renderCurrentBreadcrumb}
              items={transformBreadcumbs(props.breadCrumbs)}
            />
          }
        </Col>
        <Col xs={3} className='gha__page-heading__actions'>
          <div>
            {props.renderRight && props.renderRight()}
          </div>
        </Col>
      </Row>
      <hr />
    </div>
  );
};

export default PageHeading;
