import React from 'react';

import { IToastsContext } from '../types';


const defaultContext: IToastsContext = {
  addToast: (toast = { message: '' }) => ''
}

const ToastsContext = React.createContext(defaultContext);

export const ToastsProvider = ToastsContext.Provider;
export const ToastsConsumer = ToastsContext.Consumer;

export default ToastsContext;