import { useContext, useEffect } from 'react';
import {
  Switch,
  Route,
  RouteComponentProps
} from 'react-router-dom';

import ClientContext from '../../contexts/client';

import withPathId from '../../hoc/withPathId';

import ClientLinksPage from './client-links';

import AddClientCaseNotesPage from './add-client-case-notes';
import ClientCaseNotesPage from './client-case-notes';
import EditClientCaseNotePage from './edit-case-note';

import AddClientContactsPage from './add-client-contact';
import ClientContactsPage from './client-contacts';
import EditClientContactPage from './edit-client-contact';

import ClientInfo from './client-info';

import AddDatabaseBehaviourPage from './add-database-behaviour';
import EditDatabaseBehaviourPage from './edit-database-behaviour';
import BehavioursPage from './behaviours';
import BehavioursProblemsPage from './behaviours-problems';
import BehavioursAssignPage from './behaviours-assign';
import BehavioursDatabasePage from './behaviours-database';

import AddExpensesAccountPage from './add-expenses-account';
import EditExpenseAccountPage from './edit-expense-account';
import ExpensesPage from './expenses';
import ExpensesAccountPage from './expenses-account';
import BankStatementsPage from './bank-statements';
import AddBankStatementPage from './add-bank-statement';
import EditBankStatementPage from './edit-bank-statement';
import ExpensesListPage from './expenses-list';
import AddExpensesListPage from './add-expenses-list';
import EditExpensesListPage from './edit-expenses-list';

import AddSpGoalsPage from './add-sp-goals';
import AddDatabaseGoal from './add-database-goal';
import AddDatabaseSubgoal from './add-database-subgoal';
import AddDatabaseTask from './add-database-task';
import EditDatabaseGoal from './edit-database-goal';
import EditDatabaseSubGoal from './edit-database-subgoal';
import EditDatabaseTask from './edit-database-task';
import GoalsPage from './goals';
import GoalsDataCollectionPage from './goals-data-collection';
import GoalsDatabasePage from './goals-database';
import GoalsDatabaseSubgoalsPage from './goals-database-subgoals'
import GoalsDatabaseGoalsPage from './goals-database-goals';
import GoalsDatabaseTasksPage from './goals-database-tasks';
import SpGoalsPage from './sp-goals';

import APDPage from './apd';
import AddAPDPage from './add-apd';
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

import AddMedication from './add-medication';
import EditMedicationPage from './edit-medication';
import MedicationPage from './medication';
import MedPassPage from './med-pass';
import MedDestructionPage from './med-destruction';
import MedicationListPage from './medication-list';

import AddAppointment from './add-appointment';
import AppointmentsPage from './appointments';
import EditAppointmentPage from './edit-appointment';

import api from '../../api';

interface ClientPathsType {
  clientId?: string
}

function Clients(props: ClientPathsType & RouteComponentProps ) {
  const { onSetClient, setLoadingClient, loading: loadingClient } = useContext(ClientContext);

  const { clientId } = props;

  useEffect(() => {
    (async () => {
      if (setLoadingClient){
        setLoadingClient(true)
      }

      try {
        const client = await api.clients.getClient(clientId || '');

        if (onSetClient){
          onSetClient(client)
        }
      } catch(e) {}

      if (setLoadingClient){
        setLoadingClient(false)
      }
    })()
  }, [clientId]);

  if (loadingClient) {
    return (
      <p>Loading Client...</p>
    )
  }
  
  return (
    <Switch>
      <Route path="/dashboard/clients/:clientId/appointments/add" exact component={AddAppointment} />
      <Route path="/dashboard/clients/:clientId/appointments" exact component={AppointmentsPage} />
      <Route path="/dashboard/clients/:clientId/appointments/:appointmentId/edit" exact component={EditAppointmentPage} />

      <Route path="/dashboard/clients/:clientId/apd" exact component={APDPage} />
      <Route path="/dashboard/clients/:clientId/apd/add" exact component={AddAPDPage} />
      <Route path="/dashboard/clients/:clientId/links" exact component={ClientLinksPage} />
      
      <Route path="/dashboard/clients/:clientId/behaviours" exact component={BehavioursPage} />
      <Route path="/dashboard/clients/:clientId/behaviours/behaviours-problems" exact component={BehavioursProblemsPage} />
      <Route path="/dashboard/clients/:clientId/behaviours/assign" exact component={BehavioursAssignPage} />
      <Route path="/dashboard/clients/:clientId/behaviours/database" exact component={BehavioursDatabasePage} />
      <Route path="/dashboard/clients/:clientId/behaviours/database/add" exact component={AddDatabaseBehaviourPage} />
      <Route path="/dashboard/clients/:clientId/behaviours/database/:behaviourId/edit" exact component={EditDatabaseBehaviourPage} />
      
      <Route path="/dashboard/clients/:clientId/client-case-notes" exact component={ClientCaseNotesPage} />
      <Route path="/dashboard/clients/:clientId/client-case-notes/add" exact component={AddClientCaseNotesPage} />
      <Route path="/dashboard/clients/:clientId/client-case-notes/:caseNoteId/edit" exact component={EditClientCaseNotePage} />

      <Route path="/dashboard/clients/:clientId/expenses" exact component={ExpensesPage} />
      <Route path="/dashboard/clients/:clientId/expenses/bank-statement" exact component={BankStatementsPage} />
      <Route path="/dashboard/clients/:clientId/expenses/bank-statement/add" exact component={AddBankStatementPage} />
      <Route path="/dashboard/clients/:clientId/expenses/bank-statements/:bankStatementId/edit" exact component={EditBankStatementPage} />
      <Route path="/dashboard/clients/:clientId/expenses/:expenseId/edit" exact component={EditExpenseAccountPage} />
      <Route path="/dashboard/clients/:clientId/expenses/expense-account" exact component={ExpensesAccountPage} />
      <Route path="/dashboard/clients/:clientId/expenses/expense-account/add" exact component={AddExpensesAccountPage} />
      <Route path="/dashboard/clients/:clientId/expenses/expenses-list" exact component={ExpensesListPage} />
      <Route path="/dashboard/clients/:clientId/expenses/expenses-list/add" exact component={AddExpensesListPage} />
      <Route path="/dashboard/clients/:clientId/expenses/expenses-list/:expenseListId/edit" exact component={EditExpensesListPage} />
      
      <Route path="/dashboard/clients/:clientId/client-info" exact component={ClientInfo} />

      <Route path="/dashboard/clients/:clientId/client-contacts" exact component={ClientContactsPage} />
      <Route path="/dashboard/clients/:clientId/client-contacts/add" exact component={AddClientContactsPage} />
      <Route path="/dashboard/clients/:clientId/client-contacts/:clientContactId/edit" exact component={EditClientContactPage} />
      
      <Route path="/dashboard/clients/:clientId/goals" exact component={GoalsPage} />
      <Route path="/dashboard/clients/:clientId/goals/data-collection" exact component={GoalsDataCollectionPage} />
      <Route path="/dashboard/clients/:clientId/goals/database" exact component={GoalsDatabasePage} />
      <Route path="/dashboard/clients/:clientId/goals/database/goals" exact component={GoalsDatabaseGoalsPage} />
      <Route path="/dashboard/clients/:clientId/goals/database/subgoals" exact component={GoalsDatabaseSubgoalsPage} />
      <Route path="/dashboard/clients/:clientId/goals/database/tasks" exact component={GoalsDatabaseTasksPage} />
      <Route path="/dashboard/clients/:clientId/goals/database/subgoals/:subGoalId/edit" exact component={EditDatabaseSubGoal} />
      <Route path="/dashboard/clients/:clientId/goals/database/goals/:goalId/edit" exact component={EditDatabaseGoal} />
      <Route path="/dashboard/clients/:clientId/goals/database/tasks/:taskId/edit" exact component={EditDatabaseTask} />
      <Route path="/dashboard/clients/:clientId/goals/database/goals/add" exact component={AddDatabaseGoal} />
      <Route path="/dashboard/clients/:clientId/goals/database/subgoals/add" exact component={AddDatabaseSubgoal} />
      <Route path="/dashboard/clients/:clientId/goals/database/tasks/add" exact component={AddDatabaseTask} />
      <Route path="/dashboard/clients/:clientId/goals/sp-goals" exact component={SpGoalsPage} />
      <Route path="/dashboard/clients/:clientId/goals/sp-goals/add" exact component={AddSpGoalsPage} />

      <Route path="/dashboard/clients/:clientId/logs" exact component={LogsPage} />
      <Route path="/dashboard/clients/:clientId/logs/reshab-logs" exact component={ReshabLogsPage} />
      <Route path="/dashboard/clients/:clientId/logs/respite-logs" exact component={RespiteLogsPage} />
      <Route path="/dashboard/clients/:clientId/logs/life-skills" exact component={LifeSkillsPage} />
      <Route path="/dashboard/clients/:clientId/logs/life-skills/logs" exact component={LifeSkillsLogsPage} />
      <Route path="/dashboard/clients/:clientId/logs/life-skills/notes-database" exact component={LifeSkillsNotesDatabasePage} />
      <Route path="/dashboard/clients/:clientId/logs/life-skills/places-database" exact component={LifeSkillsPlacesDatabasePage} />
      <Route path="/dashboard/clients/:clientId/logs/personal-support" exact component={PersonalSupportPage} />
      <Route path="/dashboard/clients/:clientId/logs/personal-support/logs" exact component={PersonalSupportLogsPage} />
      <Route path="/dashboard/clients/:clientId/logs/personal-support/places-database" exact component={PersonalSupportPlacesDatabasePage} />
      <Route path="/dashboard/clients/:clientId/logs/personal-support/notes-database" exact component={PersonalSupportNotesDatabasePage} />

      <Route path="/dashboard/clients/:clientId/medication" exact component={MedicationPage} />
      <Route path="/dashboard/clients/:clientId/medication/med-pass" exact component={MedPassPage} />
      <Route path="/dashboard/clients/:clientId/medication/med-destruction" exact component={MedDestructionPage} />
      <Route path="/dashboard/clients/:clientId/medication/medication-list" exact component={MedicationListPage} />
      <Route path="/dashboard/clients/:clientId/medication/medication-list/add" exact component={AddMedication} />
      <Route path="/dashboard/clients/:clientId/medication/medication-list/:medicationId/edit" exact component={EditMedicationPage} />


    </Switch>
  );
}

export default withPathId({ pathSlugs:['clientId'] })(Clients);
