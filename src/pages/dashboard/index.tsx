import { useEffect, useState } from 'react';
import { useAuth0, withAuthenticationRequired } from '@auth0/auth0-react';
import { Alignment, Classes, Intent, Navbar, NavbarGroup, Menu, MenuItem, NavbarHeading,  Spinner } from '@blueprintjs/core';
import { Popover2 } from '@blueprintjs/popover2';
import {
  Switch,
  Route
} from "react-router-dom";

import * as config from '../../utils/config';
import urls from '../../utils/urls';
import client from '../../api/client';

import { Button } from '../../components';

import Logo from '../../assets/img/logo.png';

import AddClientPage from './add-client';
import ContentPage from './content';
import ClientsPage from './clients';

import './index.scss';


const SettingsMenu = (props: any) => {
  return (
    <div>
      <Menu>
        <MenuItem icon="power" text="Logout" onClick={props.handleLogout} />
      </Menu>
    </div>
  );
}

const LocationMenu = () => {
  return (
    <div>
      <Menu>
        <MenuItem icon="tick" text="New York" />
      </Menu>
    </div>
  );
}

const MainNavbar = () => {
  const { logout } = useAuth0();

  const handleLogout = () => {
    logout({ returnTo: urls.logoutUrl })
  }

  return (
    <Navbar>
      <NavbarGroup align={Alignment.LEFT}>
        <NavbarHeading>
          <a href='/dashboard'>
            <img alt='logo' className='navbar__logo' src={Logo} />
          </a>
        </NavbarHeading>
      </NavbarGroup>
      <NavbarGroup align={Alignment.RIGHT}>
          <Popover2
              interactionKind="click"
              popoverClassName="navbar__popover"
              placement="bottom"
              modifiers={{
                arrow: {
                  enabled: false
                }
              }}
              content={<LocationMenu />}
              renderTarget={({ isOpen, ref, ...targetProps }) => (
                  <Button
                    {...targetProps}
                    elementRef={ref}
                    className={Classes.MINIMAL}
                    icon="globe"
                    style={{
                      paddingBottom: 10
                    }}
                  />
              )}
          />
          <Popover2
              interactionKind="click"
              popoverClassName="navbar__popover"
              placement="bottom"
              modifiers={{
                arrow: {
                  enabled: false
                }
              }}
              content={<SettingsMenu handleLogout={handleLogout} />}
              renderTarget={({ isOpen, ref, ...targetProps }) => (
                  <Button
                    {...targetProps}
                    elementRef={ref}
                    className={Classes.MINIMAL}
                    icon="cog"
                    style={{
                      paddingBottom: 10
                    }}
                  />
              )}
          />
      </NavbarGroup>
    </Navbar>
  );
}


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

        // TODO: Remove log
        console.log('TOKEN:', token);
        client.defaults.setToken(token)
      } catch(e) {}

      setFetchingToken(false)
    }

    if (isAuthenticated) getToken();
  }, [getAccessTokenSilently, isAuthenticated]);

  if (fetchingToken) return (
    <p>Authenticating</p>
  )

  return (
    <div>
      <MainNavbar />
      <div className='dashboard__container'>
        <Switch>
          <Route path="/dashboard" exact component={ContentPage} />
          <Route path="/dashboard/clients" exact component={ClientsPage} />
          <Route path="/dashboard/clients/add" exact component={AddClientPage} />
        </Switch>
      </div>
    </div>
  );
}

export default withAuthenticationRequired(Dashboard, {
  // Show a message while the user waits to be redirected to the login page.
  onRedirecting: () => (<div>Redirecting you to the login page...</div>)
});
