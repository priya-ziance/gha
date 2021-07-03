import { useEffect, useState } from 'react';
import { IResizeEntry, IToastProps, ResizeSensor, Toaster, Position } from "@blueprintjs/core";

import { DimensionsProvider } from './dimensions';
import { ClientProvider } from './client';
import { ToastsProvider } from './toasts';

import { IClientModel, IClientContext } from '../types';

function handleResize(entries: IResizeEntry[]) {
  console.log(entries.map(e => `${e.contentRect.width} x ${e.contentRect.height}`));
}

const AppToaster = Toaster.create({
  className: "gha__toaster",
  position: Position.TOP_RIGHT,
});


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

  const addToast = (toast: IToastProps) => {
    return AppToaster.show(toast);
  }

  const removeToast = (toastId: string) => {
    return AppToaster.dismiss(toastId);
  }

  return (
    <DimensionsProvider
      value={{
        deviceType: 'sm'
      }}
    >
      <ClientProvider
        value={client}
      >
        <ToastsProvider
          value={{
            addToast,
            removeToast
          }}
        >
          <ResizeSensor onResize={handleResize}>
            {props.children}
          </ResizeSensor>
        </ToastsProvider>
      </ClientProvider>
    </DimensionsProvider>
  );
}

export default Contexts;
