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

import LocationsPage from './locations';
import AddLocationPage from './add-location';
import EditLocationPage from './edit-location';

import LogsPage from './logs';
import ReshabLogsPage from './reshab-logs';
import RespiteLogsPage from './respite-logs';
import LifeSkillsPage from './life-skills';
import LifeSkillsLogsPage from './life-skills-logs';
import LifeSkillsNotesDatabasePage from './life-skills-notes-database';
import LifeSkillsPlacesDatabasePage from './life-skills-places-database';
import PersonalSupportPage from './personal-support';
import PersonalSupportLogsPage from './personal-support-logs';
import PersonalSupportPlacesDatabasePage from './personal-support-places-database';
import PersonalSupportNotesDatabasePage from './personal-support-notes-database';

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
        // console.log('TOKEN:', token, permissions.compilePermissions(tokenPermissions));
        client.defaults.setToken(token)
      } catch(e: any) {}

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

            <Route path="/dashboard/logs" exact component={LogsPage} />
            <Route path="/dashboard/logs/reshab-logs" exact component={ReshabLogsPage} />
            <Route path="/dashboard/logs/respite-logs" exact component={RespiteLogsPage} />
            <Route path="/dashboard/logs/life-skills" exact component={LifeSkillsPage} />
            <Route path="/dashboard/logs/life-skills/logs" exact component={LifeSkillsLogsPage} />
            <Route path="/dashboard/logs/life-skills/notes-database" exact component={LifeSkillsNotesDatabasePage} />
            <Route path="/dashboard/logs/life-skills/places-database" exact component={LifeSkillsPlacesDatabasePage} />
            <Route path="/dashboard/logs/personal-support" exact component={PersonalSupportPage} />
            <Route path="/dashboard/logs/personal-support/logs" exact component={PersonalSupportLogsPage} />
            <Route path="/dashboard/logs/personal-support/places-database" exact component={PersonalSupportPlacesDatabasePage} />
            <Route path="/dashboard/logs/personal-support/notes-database" exact component={PersonalSupportNotesDatabasePage} />

            <Route path="/dashboard/locations" exact component={LocationsPage} />
            <Route path="/dashboard/locations/add" exact component={AddLocationPage} />
            <Route path="/dashboard/locations/:locationId/edit" exact component={EditLocationPage} />
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
