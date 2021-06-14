import { useAuth0 } from '@auth0/auth0-react';
import { Alignment, Classes, Navbar, NavbarGroup, Menu, MenuItem, NavbarHeading } from '@blueprintjs/core';
import { Popover2 } from '@blueprintjs/popover2';

import urls from '../../../utils/urls';

import { Button, H1 } from '../../../components';

import './index.css';

const SettingsMenu = (props: any) => {
  return (
    <div>
      <Menu>
        <MenuItem icon="power" text="Logout" onClick={props.handleLogout} />
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
          <NavbarHeading>Blueprint</NavbarHeading>
      </NavbarGroup>
      <NavbarGroup align={Alignment.RIGHT}>
          <Popover2
              interactionKind="click"
              popoverClassName="content__popover"
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

const Content = () => {
  return (
    <div>
      <MainNavbar />
      <H1>Dashboard</H1>
    </div>
  );
}

export default Content;