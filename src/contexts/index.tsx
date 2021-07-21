import { useEffect, useState } from 'react';
import { IResizeEntry, IToastProps, ResizeSensor, Toaster, Position } from '@blueprintjs/core';
import get from 'lodash/get';

import { DimensionsProvider } from './dimensions';
import { ClientProvider } from './client';
import { LocationProvider } from './location';
import { ToastsProvider } from './toasts';

import api from '../api';

import { IClientModel, IClientContext, ILocationModel, ILocationContext } from '../types';

function handleResize(entries: IResizeEntry[]) {
  console.log(entries.map(e => `${e.contentRect.width} x ${e.contentRect.height}`));
}

const AppToaster = Toaster.create({
  className: "gha__toaster",
  position: Position.TOP_RIGHT,
});


function Contexts(props: any) {
  const [loadingClient, setLoadingClient] = useState(false);
  const [loadingLocations, setLoadingLocations] = useState(false);
  const [locations, setLocations] = useState<ILocationModel[] | []>([])
  const [location, setLocation] = useState<ILocationModel | undefined>(undefined)
  const [locationContext, setLocationContext] = useState<ILocationContext>({});
  const [client, setClient] = useState<IClientContext>({
    id: '',
    name: ''
  });

  useEffect(() => {
    (async () => {
      await loadLocations()
    })()
  }, [])

  useEffect(() => {
    setLocationContext({
      address: get(location, 'address'),
      id: get(location, 'id'),
      locations
    })
  }, [locations, location])

  useEffect(() => {
    setClient({ ...client, loading: loadingClient })
  }, [loadingClient]);

  const loadLocations = async () => {
    setLoadingLocations(true);

    try {
      setLocations(await api.locations.getLocations())
    } catch(e) {}

    setLoadingLocations(false);
  }

  const setLocationId = (locationId: string) => {
    const location = locations.find(location => location.id === locationId);
    setLocation(location);
  }
  
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


  locationContext.loading = loadingLocations;
  locationContext.setLocation = setLocationId;

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
            <LocationProvider
              value={locationContext}
            >
              {props.children}
            </LocationProvider>
          </ResizeSensor>
        </ToastsProvider>
      </ClientProvider>
    </DimensionsProvider>
  );
}

export default Contexts;
