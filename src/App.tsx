import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import LoginPage from './pages/login';
import DashboardPage from './pages/dashboard';
import ClientWitness from './pages/client-witness';
import StaffWitness from './pages/staff-witness';
import AddClientWitness from './pages/add-client-witness'
import AddStaffWitness from "./pages/add-staff-witness";
import EditClientWitness from "./pages/edit-client-witness";
import EditStaffWitness from './pages/edit-staff-witness'

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
            <Route path="/client-witness" component={ClientWitness} />
            <Route path="/staff-witness" component={StaffWitness} />
            
            <Route path="/add-client-witness" component={AddClientWitness} />
            <Route path="/edit-client-witness" component={EditClientWitness} />
            <Route path="/add-staff-witness" component={AddStaffWitness} />
            <Route path="/edit-staff-witness" component={EditStaffWitness} />

          </Switch>
        </Router>
        <ConnectivityListener />
      </>
    </Contexts>
  );
}

export default App;
