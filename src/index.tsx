import React from 'react';
import ReactDOM from 'react-dom';
import { Auth0Provider } from "@auth0/auth0-react";
import { get } from 'lodash';

import * as config from './utils/config';
import './index.css';
import App from './App';
import history from './utils/history';

import reportWebVitals from './reportWebVitals';

import client from './api/client';

// Blueprintjs
import '@blueprintjs/icons/lib/css/blueprint-icons.css';
import '@blueprintjs/core/lib/css/blueprint.css';
import '@blueprintjs/datetime/lib/css/blueprint-datetime.css';
import '@blueprintjs/popover2/lib/css/blueprint-popover2.css';

import urls from './utils/urls';

const onRedirectCallback = (appState: any) => {
  history.push(
    appState && appState.returnTo
      ? appState.returnTo
      : window.location.pathname
  );
};

client.defaults.setBaseUrl(config.API_ENDPOINT);

ReactDOM.render(
  <React.StrictMode>
    <Auth0Provider
      audience={config.AUTH0_AUDIENCE}
      domain={get(config, 'AUTH0_DOMAIN', '')}
      clientId={get(config, 'AUTH0_CLIENT_ID', '')}
      redirectUri={urls.loginUrl}
      onRedirectCallback={onRedirectCallback}
      scope='read:current_user update:current_user_metadata'
    >
      <App />
    </Auth0Provider>    
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
