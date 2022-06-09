import { useEffect, useState } from 'react';

import { Spinner } from '@blueprintjs/core';

import AddLocation from '../add-location';

import api from '../../../api';

import ILocationModel from '../../../models/location';

import withPathId from '../../../hoc/withPathId';


interface LocationPathType {
  locationId: string
}

const LocationInfo = (props: LocationPathType) => {
  const [loading, setLoading] = useState(true);
  const [location, setLocation] = useState<ILocationModel | undefined>(undefined);

  const { locationId } = props;

  useEffect(() => {
    (async () => {
      setLoading(true);
      
      try {
        const fetchedLocation = await api.locations.getLocation(locationId );

        setLocation(fetchedLocation);
      } catch(e: any) {
        console.log(e)
      }

      setLoading(false);
    })()
  }, [locationId]);

  if (loading) {
    return ( <Spinner /> )
  }

  return (
    <AddLocation location={location} update />
  );
};

export default withPathId({ pathSlugs:['locationId'] })(LocationInfo);