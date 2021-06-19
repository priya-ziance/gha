import { Breadcrumb, Breadcrumbs, BreadcrumbProps, Icon } from '@blueprintjs/core';
import { Link } from 'react-router-dom';

import H1 from '../H1';

interface PageHeadingProps {
  title: string;
  breadCrumbs: BreadcrumbProps[]
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
    <div>
      <H1>{props.title}</H1>
      {props.breadCrumbs && props.breadCrumbs.length &&
        <Breadcrumbs
          currentBreadcrumbRenderer={renderCurrentBreadcrumb}
          items={transformBreadcumbs(props.breadCrumbs)}
        />
      }
      <hr />
    </div>
  );
};

export default PageHeading;