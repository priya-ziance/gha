import { useContext, useEffect, useState } from 'react';
import { useAuth0, withAuthenticationRequired } from '@auth0/auth0-react';
import { Alignment, Classes, IRef, Navbar, NavbarGroup, Menu, MenuItem, NavbarHeading } from '@blueprintjs/core';
import { Popover2, Popover2Props } from '@blueprintjs/popover2';
import {
  Switch,
  Route
} from 'react-router-dom';
import get from 'lodash/get';
import jwt from 'jwt-decode'

import * as config from '../../utils/config';
import urls from '../../utils/urls';
import * as permissions from '../../utils/permissions';

import client from '../../api/client';

import { Button, NoLocation } from '../../components';

import Logo from '../../assets/img/logo.png';

import AddClientPage from './add-client';
import ContentPage from './content';
import ClientsPage from './clients';

import ClientNavigation from './client-navigation';

import LocationContext from '../../contexts/location';

import { ILocationModel } from '../../types';

import './index.scss';


type CustomPopoverType = {
  ref: IRef<any>
}

type LocationMenuType = {
  locations?: ILocationModel[],
  selectedLocation?: string,
  setLocation?: (locationId: string) => void
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

const LocationMenu = (props: LocationMenuType) => {
  return (
    <div>
      <Menu>
        {get(props, 'locations', []).map((location: ILocationModel) => {
          const onClick = () => {
            if (props.setLocation) {
              props.setLocation(location.id)
            }
          }

          return (
            <MenuItem
              key={location.id}
              onClick={onClick}
              icon={location.id === props.selectedLocation ? 'tick': 'dot'}
              text={location.address}
            />
          )
        })}
      </Menu>
    </div>
  );
}

const MainNavbar = () => {
  const { locations, setLocation, id: selectedLocationId } = useContext(LocationContext)
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
              content={
                <LocationMenu
                  locations={locations}
                  setLocation={setLocation}
                  selectedLocation={selectedLocationId}
                />
              }
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

  const { id: selectedLocationId } = useContext(LocationContext)

  const { getAccessTokenSilently, isAuthenticated } = useAuth0();
  

  useEffect(() => {
    const getToken = async () => {
      setFetchingToken(true)

      try {
        const token = await getAccessTokenSilently({
          audience: config.AUTH0_AUDIENCE
        });
        const tokenPermissions: string[] = get(jwt(token), 'permissions');

        // TODO: Remove log
        console.log('TOKEN:', token, permissions.compilePermissions(tokenPermissions));
        client.defaults.setToken(token)
      } catch(e) {}

      setFetchingToken(false)
    }

    if (isAuthenticated) getToken();
  }, [getAccessTokenSilently, isAuthenticated]);

  useEffect(() => {
    client.defaults.setLocationHeader(selectedLocationId);
  }, [selectedLocationId])

  if (fetchingToken) return (
    <p>Authenticating</p>
  )

  return (
    <div className='dashboard'>
      <MainNavbar />
      <div className='dashboard__container'>
        {!selectedLocationId ?
          <NoLocation /> : 
          <Switch>
            <Route path="/dashboard" exact component={ContentPage} />
            <Route path="/dashboard/clients" exact component={ClientsPage} />
            <Route path="/dashboard/clients/add" exact component={AddClientPage} />
            <Route path="/dashboard/clients/:clientId" component={ClientNavigation} />
          </Switch>
        }
      </div>
    </div>
  );
}

export default withAuthenticationRequired(Dashboard, {
  // Show a message while the user waits to be redirected to the login page.
  onRedirecting: () => (<div>Redirecting you to the login page...</div>)
});
