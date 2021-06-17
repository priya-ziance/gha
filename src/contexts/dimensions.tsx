import React from 'react';

const DimensionsContext = React.createContext({
  deviceType: 'md'
});

export const DimensionsProvider = DimensionsContext.Provider;
export const DimensionsConsumer = DimensionsContext.Consumer;

export default DimensionsContext;