import { useEffect, useState } from 'react';
import { useAuth0, withAuthenticationRequired } from '@auth0/auth0-react';
import { Alignment, Classes, IRef, Navbar, NavbarGroup, Menu, MenuItem, NavbarHeading } from '@blueprintjs/core';
import { Popover2, Popover2Props } from '@blueprintjs/popover2';
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

import ClientNavigation from './client-navigation';

import './index.scss';


type CustomPopoverType = {
  ref: IRef<any>
}

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
              renderTarget={(props: Popover2Props & CustomPopoverType) => {
                const { isOpen, ref, ...targetProps } = props;

                return (
                  <Button
                    {...targetProps}
                    elementRef={ref}
                    className={Classes.MINIMAL}
                    icon="globe"
                  />
                )
              }}
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
              renderTarget={(props: Popover2Props & CustomPopoverType) => {
                const { isOpen, ref, ...targetProps } = props;

                return (
                  <Button
                    {...targetProps}
                    elementRef={ref}
                    className={Classes.MINIMAL}
                    icon="cog"
                  />
                )
              }}
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
    <div className='dashboard'>
      <MainNavbar />
      <div className='dashboard__container'>
        <Switch>
          <Route path="/dashboard" exact component={ContentPage} />
          <Route path="/dashboard/clients" exact component={ClientsPage} />
          <Route path="/dashboard/clients/add" exact component={AddClientPage} />
          <Route path="/dashboard/clients/:clientId" component={ClientNavigation} />
        </Switch>
      </div>
    </div>
  );
}

export default withAuthenticationRequired(Dashboard, {
  // Show a message while the user waits to be redirected to the login page.
  onRedirecting: () => (<div>Redirecting you to the login page...</div>)
});
