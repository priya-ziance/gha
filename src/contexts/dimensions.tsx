import React from 'react';

import { IDimensionsContext } from '../types';

const defaultContext: IDimensionsContext = {
  deviceType: 'md'
}

const DimensionsContext = React.createContext(defaultContext);

export const DimensionsProvider = DimensionsContext.Provider;
export const DimensionsConsumer = DimensionsContext.Consumer;

export default DimensionsContext;