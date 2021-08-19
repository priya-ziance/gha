import Lottie from 'lottie-react';
import H1 from '../../components/H1'
 
import locationAnimation from '../../assets/lottie-json/location.json';

import './index.scss';

const NoLocation = () => {
  return (
    <div className='gha__no-location'>
      <Lottie
        animationData={locationAnimation}
        loop={false}
        style={{ height: 250 }}
      />
      <H1>
        No location selected
      </H1>
      <p>
        You have no location selected. Please select a location from the locations menu above.
      </p>
    </div>
  );
};

export default NoLocation;