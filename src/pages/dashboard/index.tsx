import { useEffect, useState } from 'react';
import { useAuth0, withAuthenticationRequired } from '@auth0/auth0-react';
import { Intent, Spinner } from '@blueprintjs/core';

import * as config from '../../utils/config';
import client from '../../api/client';

import {
  Switch,
  Route
} from "react-router-dom";

import ContentPage from './content';

function Dashboard() {
  const [fetchingToken, setFetchingToken] = useState(true);

  const { getAccessTokenSilently, isAuthenticated } = useAuth0();

  useEffect(() => {
    const getToken = async () => {
      setFetchingToken(true)

      try {
        const token = await getAccessTokenSilently({
          audience: config.AUTH0_AUDIENCE
        });

        client.defaults.setToken(token)
      } catch(e) {}

      setFetchingToken(false)
    }

    if (isAuthenticated) getToken();
  }, [getAccessTokenSilently, isAuthenticated]);

  if (fetchingToken) return (<Spinner intent={Intent.PRIMARY} />)

  return (
    <Switch>
      <Route path="/dashboard" exact component={ContentPage} />
    </Switch>
  );
}

export default withAuthenticationRequired(Dashboard, {
  // Show a message while the user waits to be redirected to the login page.
  onRedirecting: () => (<div>Redirecting you to the login page...</div>)
});
