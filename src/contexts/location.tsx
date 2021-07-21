import React from 'react';

import { ILocationContext } from '../types';

const defaultContext: ILocationContext = {
  id: '',
  address: ''
}

const LocationContext = React.createContext(defaultContext);

export const LocationProvider = LocationContext.Provider;
export const LocationConsumer = LocationContext.Consumer;

export default LocationContext;