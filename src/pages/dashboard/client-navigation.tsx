import { useContext, useEffect } from 'react';
import {
  Switch,
  Route,
  RouteComponentProps
} from 'react-router-dom';

import ClientContext from '../../contexts/client';

import withPathId from '../../hoc/withPathId';

import ClientLinksPage from './client-links';
import ClientContactsPage from './client-contacts';

import api from '../../api';

interface ClientPathsType {
  clientId?: string
}

function Clients(props: ClientPathsType & RouteComponentProps ) {
  const { onSetClient, setLoadingClient, loading: loadingClient } = useContext(ClientContext);

  const { clientId } = props;

  useEffect(() => {
    (async () => {
      if (setLoadingClient){
        setLoadingClient(true)
      }

      try {
        const client = await api.clients.getClient(clientId);

        if (onSetClient){
          onSetClient(client)
        }
      } catch(e) {}

      if (setLoadingClient){
        setLoadingClient(false)
      }
    })()
  }, [clientId]);

  // if (loadingClient) {
  //   return (
  //     <p>Loading Client...</p>
  //   )
  // }
  
  return (
    <Switch>
      <Route path="/dashboard/clients/:clientId/links" exact component={ClientLinksPage} />
      <Route path="/dashboard/clients/:clientId/client_contacts" exact component={ClientContactsPage} />
    </Switch>
  );
}

export default withPathId({ pathSlugs:['clientId'] })(Clients);
