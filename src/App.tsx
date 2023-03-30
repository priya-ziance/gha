import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import LoginPage from './pages/login';
import DashboardPage from './pages/dashboard';
import ConnectivityListener from './components/ConnectionListener';

import Contexts from './contexts';

import 'bootstrap/dist/css/bootstrap.min.css';
import '@blueprintjs/core/lib/css/blueprint.css';
import '@blueprintjs/table/lib/css/table.css';
import '@blueprintjs/datetime/lib/css/blueprint-datetime.css';
import "@blueprintjs/select/lib/css/blueprint-select.css";

import './App.css';

function App() {
  return (
    <Contexts>
      <>
        <Router>
          <Switch>
            <Route path="/" exact component={LoginPage} />
            <Route path="/dashboard" component={DashboardPage} />
          </Switch>
        </Router>
        <ConnectivityListener />
      </>
    </Contexts>
  );
}

export default App;
