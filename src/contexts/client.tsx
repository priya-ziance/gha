import React from 'react';

import { IClientContext } from '../types';

const defaultContext: IClientContext = {
  id: '',
  name: ''
}

const ClientContext = React.createContext(defaultContext);

export const ClientProvider = ClientContext.Provider;
export const ClientConsumer = ClientContext.Consumer;

export default ClientContext;