import { useAuth0 } from '@auth0/auth0-react';

import urls from '../../utils/urls';

const Dashboard = () => {
  const { logout } = useAuth0();

  const handleLogout = () => {
    logout({ returnTo: urls.logoutUrl })
  }

  return (
    <div>
      <h1>Authenticated</h1>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default Dashboard;