import { useContext, useEffect } from 'react';
import {
  Switch,
  Route,
  RouteComponentProps
} from 'react-router-dom';

import ClientContext from '../../contexts/client';

import withPathId from '../../hoc/withPathId';

import AddClientCaseNotesPage from './add-client-case-notes';
import AddClientContactsPage from './add-client-contact';
import ClientLinksPage from './client-links';
import ClientCaseNotesPage from './client-case-notes';
import ClientContactsPage from './client-contacts';
import GoalsPage from './goals';
import SpGoalsPage from './sp-goals';
import AddSpGoalsPage from './add-sp-goals';

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
        const client = await api.clients.getClient(clientId || '');

        if (onSetClient){
          onSetClient(client)
        }
      } catch(e) {}

      if (setLoadingClient){
        setLoadingClient(false)
      }
    })()
  }, [clientId]);

  if (loadingClient) {
    return (
      <p>Loading Client...</p>
    )
  }
  
  return (
    <Switch>
      <Route path="/dashboard/clients/:clientId/links" exact component={ClientLinksPage} />
      <Route path="/dashboard/clients/:clientId/client_case_notes" exact component={ClientCaseNotesPage} />
      <Route path="/dashboard/clients/:clientId/client_case_notes/add" exact component={AddClientCaseNotesPage} />
      <Route path="/dashboard/clients/:clientId/client_contacts" exact component={ClientContactsPage} />
      <Route path="/dashboard/clients/:clientId/client_contacts/add" exact component={AddClientContactsPage} />
      <Route path="/dashboard/clients/:clientId/goals" exact component={GoalsPage} />
      <Route path="/dashboard/clients/:clientId/goals/sp_goals" exact component={SpGoalsPage} />
      <Route path="/dashboard/clients/:clientId/goals/sp_goals/add" exact component={AddSpGoalsPage} />
    </Switch>
  );
}

export default withPathId({ pathSlugs:['clientId'] })(Clients);
