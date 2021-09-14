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
import ClientInfo from './client-info';
import GoalsPage from './goals';
import SpGoalsPage from './sp-goals';
import AddSpGoalsPage from './add-sp-goals';
import APDPage from './apd';
import AddAPDPage from './add-apd';
import LogsPage from './logs';
import ReshabLogsPage from './reshab-logs';
import RespiteLogsPage from './respite-logs';
import LifeSkillsPage from './life-skills';
import PersonalSupportPage from './personal-support';

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
      <Route path="/dashboard/clients/:clientId/apd" exact component={APDPage} />
      <Route path="/dashboard/clients/:clientId/apd/add" exact component={AddAPDPage} />
      <Route path="/dashboard/clients/:clientId/links" exact component={ClientLinksPage} />
      
      <Route path="/dashboard/clients/:clientId/client-case-notes" exact component={ClientCaseNotesPage} />
      <Route path="/dashboard/clients/:clientId/client-case-notes/add" exact component={AddClientCaseNotesPage} />
      
      <Route path="/dashboard/clients/:clientId/client-contacts" exact component={ClientContactsPage} />
      <Route path="/dashboard/clients/:clientId/client-info" exact component={ClientInfo} />
      <Route path="/dashboard/clients/:clientId/client-contacts/add" exact component={AddClientContactsPage} />
      
      <Route path="/dashboard/clients/:clientId/goals" exact component={GoalsPage} />
      <Route path="/dashboard/clients/:clientId/goals/sp-goals" exact component={SpGoalsPage} />
      <Route path="/dashboard/clients/:clientId/goals/sp-goals/add" exact component={AddSpGoalsPage} />

      <Route path="/dashboard/clients/:clientId/logs" exact component={LogsPage} />
      <Route path="/dashboard/clients/:clientId/logs/reshab-logs" exact component={ReshabLogsPage} />
      <Route path="/dashboard/clients/:clientId/logs/respite-logs" exact component={RespiteLogsPage} />
      <Route path="/dashboard/clients/:clientId/logs/life-skills" exact component={LifeSkillsPage} />
      <Route path="/dashboard/clients/:clientId/logs/personal-support" exact component={PersonalSupportPage} />
    </Switch>
  );
}

export default withPathId({ pathSlugs:['clientId'] })(Clients);
