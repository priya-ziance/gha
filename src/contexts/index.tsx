import { useEffect, useState } from 'react';
import { IResizeEntry, IToastProps, ResizeSensor, Toaster, Position } from '@blueprintjs/core';
import get from 'lodash/get';

import { DimensionsProvider } from './dimensions';
import { ClientProvider } from './client';
import { LocationProvider } from './location';
import { ToastsProvider } from './toasts';

import Storage from '../utils/storage';

import { LOCATION_STORAGE_KEY } from '../utils/constants';

import api from '../api';

import { IClientModel, IClientContext, ILocationModel, ILocationContext } from '../types';

import './index.scss';

const storage = new Storage();


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
    const storedId = storage.get(LOCATION_STORAGE_KEY);
    let _location = location;

    if (!location && storedId) {
      _location = locations.find(location => location.id === storedId); 
    } 

    setLocationContext({
      address: get(_location, 'address'),
      id: get(_location, 'id'),
      locations,
      location: _location
    })
  }, [locations, location])

  useEffect(() => {
    setClient({ ...client, loading: loadingClient })
  }, [loadingClient]);

  const loadLocations = async () => {
    setLoadingLocations(true);

    try {
      setLocations(await api.locations.getLocations())
    } catch(e: any) {}

    setLoadingLocations(false);
  }

  const setLocationId = (locationId: string) => {
    storage.set(LOCATION_STORAGE_KEY, locationId);
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
