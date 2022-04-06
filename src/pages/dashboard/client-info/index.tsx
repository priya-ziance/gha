import { useContext, useEffect, useState } from 'react';

import { Spinner } from '@blueprintjs/core';

import AddClient from '../add-client';

import api from '../../../api';

import IClientModel from '../../../models/client';

import ClientContext from '../../../contexts/client';


const ClientInfo = () => {
  const [loading, setLoading] = useState(true);
  const [client, setClient] = useState<IClientModel | undefined>(undefined);
  const { id: clientId } = useContext(ClientContext);

  useEffect(() => {
    (async () => {
      setLoading(true);
      
      try {
        const fetchedClient = await api.clients.getClient(clientId);
        
        if (fetchedClient.profilePicture) {
          await fetchedClient.profilePicture.loadFile();
        }

        if (fetchedClient.signature) {
          await fetchedClient.signature.loadFile();
        }

        if (fetchedClient.floridaId) {
          await fetchedClient.floridaId.loadFile();
        }

        if (fetchedClient.healthInsurance) {
          await fetchedClient.healthInsurance.loadFile();
        }

        setClient(fetchedClient);
      } catch(e) {}

      setLoading(false);
    })()
  }, [clientId]);

  if (loading) {
    return ( <Spinner /> )
  }

  return (
    <AddClient client={client} update />
  );
};

export default ClientInfo;