import { useEffect, useState } from 'react';
import { ToastProvider } from 'react-toast-notifications';
import { IResizeEntry, ResizeSensor } from "@blueprintjs/core";

import { DimensionsProvider } from './dimensions';
import { ClientProvider } from './client';

import { IClientModel, IClientContext } from '../types';

function handleResize(entries: IResizeEntry[]) {
  console.log(entries.map(e => `${e.contentRect.width} x ${e.contentRect.height}`));
}

function Contexts(props: any) {
  const [loadingClient, setLoadingClient] = useState(false);
  const [client, setClient] = useState<IClientContext>({
    id: '',
    name: ''
  });

  useEffect(() => {
    setClient({ ...client, loading: loadingClient })
  }, [loadingClient]);
  
  const onSetClient = (client: IClientModel) => {
    setClient({
      id: client.id,
      name: client.name,
      client: client.client,
    })
  }

  if (client) {
    client.onSetClient = onSetClient;
    client.setLoadingClient = setLoadingClient;
  }

  return (
    <ToastProvider>
      <DimensionsProvider
        value={{
          deviceType: 'sm'
        }}
      >
        <ClientProvider
          value={client}
        >
          <ResizeSensor onResize={handleResize}>
            {props.children}
          </ResizeSensor>
        </ClientProvider>
      </DimensionsProvider>
    </ToastProvider> 
  );
}

export default Contexts;
