import { useParams } from 'react-router';
import get from 'lodash/get';

type IOptions = {
  pathSlugs?: string[]
}

/**
 * This will get paths from the URL and pass them in as props.
 * @param options 
 * @returns 
 */

const withPathId = (options?: IOptions) => (Component: any) => (props: any) => {
  const params: any = useParams();
  const paramsProps: any = {};
  let pathSlugs = get(options, 'pathSlugs', []);

  if (pathSlugs.length) {
    pathSlugs.forEach(slug => {
      paramsProps[slug] = params[slug];
    })
  }

  return (
    <Component {...props} {...paramsProps}/>
  )
}

export default withPathId;
