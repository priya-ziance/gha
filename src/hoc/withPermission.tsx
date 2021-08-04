import get from 'lodash/get';

type IOptions = {
  pathSlugs?: string[]
}


const withPermission = (options?: IOptions) => (Component: any) => (props: any) => {
  return (
    <Component {...props}/>
  )
}

export default withPermission;
