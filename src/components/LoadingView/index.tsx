import { Intent, Spinner } from "@blueprintjs/core";
import './index.scss';


const LoadingView: any = (props: any) => {
  const { children, loading } = props;
  
  if (loading) {
    return (
      <div className='loading_view'>
        <Spinner intent={Intent.PRIMARY}/>
      </div>
    );
  }
  
  return (
    <>
      {children}
    </>
  )
};

export default LoadingView;