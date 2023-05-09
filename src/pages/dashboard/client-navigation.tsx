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

import AddClientWitnessPage from './add-client-witness';
import ClientWitnessPage from './client-witness';
import EditClientWitnessPage from './edit-client-witness';

import AddStaffWitnessPage from './add-staff-witness';
import StaffWitnessPage from './staff-witness';
import EditStaffWitnessPage from './edit-staff-witness';

import AddTrainersPage from './add-trainers';
import Trainer from './trainer';
import EditTrainers from './edit-trainers';

import AddComunityActivities from './add-community-activities';
import ComunityActivities from './community-activities';
import EditComunityActivities from './edit-community-activities';

import AddPersonalBankStatement from './add-personal_bank_statement';
import PersonalBankStatement from './personal_bank_statement';
import EditPersonalBankStatement from './edit-personal-bank-statement';

import ADP from './adp';
import AddAdpPage from './add-adp';
import EditAdp from './edit-adp';

import AddDischargePage from './add-discharge';
import Discharge from './discharge';
import EditDischarge from './edit-discharge';

import AddRelocatePage from './add-relocate-transfer';
import Relocate from './relocate-transfer';
import EditRelocate from './edit-relocate-transfer';


import AddClientContactsPage from './add-client-contact';
import ClientContactsPage from './client-contacts';
import EditClientContactPage from './edit-client-contact';

import AddPersonalFundsPage from './add-personal-funds';
import PersonalFunds from './personal-funds';
import EditPersonalFunds from './edit-personal-funds';


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

import RecurringExpensePage from './recurring-expense';
import AddRecurringExpensePage from './add-recurring-expense';
import EditRecurringExpensePage from './edit-recurring-expense';

import AddSpGoalsPage from './add-sp-goals';
import EditSpGoals from './edit-sp-goals';
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

import AddMedication from './add-medication';
import EditMedicationPage from './edit-medication';
import MedicationPage from './medication';
import MedPassPage from './med-pass';
import MedDestructionPage from './med-destruction';
import MedicationListPage from './medication-list';

import AddInventoryPage from './add-inventorys';
import Inventory from './inventory';
import EditInventorys from './edit-inventorys';

import AddAppointment from './add-appointment';
import AppointmentsPage from './appointments';
import EditAppointmentPage from './edit-appointment';

import MainBankAccountPage from './main-bank-statement';
import AddMainBankAccountPage from './add-main-bank-statement';
import EditMainBankAccountPage from './edit-main-bank-statement';

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
      } catch(e: any) {}

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

      <Route path="/dashboard/clients/:clientId/expenses/recurring-expense" exact component={RecurringExpensePage} />
      <Route path="/dashboard/clients/:clientId/expenses/recurring-expense/add" exact component={AddRecurringExpensePage} />
      <Route path="/dashboard/clients/:clientId/expenses/recurring-expense/:recurringExpenseId/edit" exact component={EditRecurringExpensePage} />
      
      <Route path="/dashboard/clients/:clientId/client-info" exact component={ClientInfo} />

      <Route path="/dashboard/clients/:clientId/inventory" exact component={Inventory} />
      <Route path="/dashboard/clients/:clientId/inventory/add" exact component={AddInventoryPage} />
      <Route path="/dashboard/clients/:clientId/inventory/:inventoryId/edit" exact component={EditInventorys} />

      <Route path="/dashboard/clients/:clientId/client-contacts" exact component={ClientContactsPage} />
      <Route path="/dashboard/clients/:clientId/client-contacts/add" exact component={AddClientContactsPage} />
      <Route path="/dashboard/clients/:clientId/client-contacts/:clientContactId/edit" exact component={EditClientContactPage} />
      
      <Route path="/dashboard/clients/:clientId/client-witness" exact component={ClientWitnessPage} />
      <Route path="/dashboard/clients/:clientId/client-witness/add" exact component={AddClientWitnessPage} />
      <Route path="/dashboard/clients/:clientId/client-witness/:clientWitnessId/edit" exact component={EditClientWitnessPage} />

      <Route path="/dashboard/clients/:clientId/staff-witness" exact component={StaffWitnessPage} />
      <Route path="/dashboard/clients/:clientId/staff-witness/add" exact component={AddStaffWitnessPage} />
      <Route path="/dashboard/clients/:clientId/staff-witness/:staffWitnessId/edit" exact component={EditStaffWitnessPage} />


      <Route path="/dashboard/clients/:clientId/trainer" exact component={Trainer} />
      <Route path="/dashboard/clients/:clientId/trainer/add" exact component={AddTrainersPage} />
      <Route path="/dashboard/clients/:clientId/trainer/:trainerId/edit" exact component={EditTrainers} />

      <Route path="/dashboard/clients/:clientId/community_activities" exact component={ComunityActivities} />
      <Route path="/dashboard/clients/:clientId/community_activities/add" exact component={AddComunityActivities} />
      <Route path="/dashboard/clients/:clientId/community_activities/:communityActivitiesId/edit" exact component={EditComunityActivities} />
      
      <Route path="/dashboard/clients/:clientId/personal_bank_statement" exact component={PersonalBankStatement} />
      <Route path="/dashboard/clients/:clientId/personal_bank_statement/add" exact component={AddPersonalBankStatement} />
      <Route path="/dashboard/clients/:clientId/personal_bank_statement/:personalBankStatementId/edit" exact component={EditPersonalBankStatement} />

      <Route path="/dashboard/clients/:clientId/personal_funds" exact component={PersonalFunds} />
      <Route path="/dashboard/clients/:clientId/personal_funds/add" exact component={AddPersonalFundsPage} />
      <Route path="/dashboard/clients/:clientId/personal_funds/:personalFundId/edit" exact component={EditPersonalFunds} />

      <Route path="/dashboard/clients/:clientId/adp" exact component={ADP} />
      <Route path="/dashboard/clients/:clientId/adp/add" exact component={AddAdpPage} />
      <Route path="/dashboard/clients/:clientId/adp/:adpId/edit" exact component={EditAdp} />

      <Route path="/dashboard/clients/:clientId/discharge" exact component={Discharge} />
      <Route path="/dashboard/clients/:clientId/discharge/add" exact component={AddDischargePage} />
      <Route path="/dashboard/clients/:clientId/discharge/:dischargeId/edit" exact component={EditDischarge} />

      <Route path="/dashboard/clients/:clientId/relocate" exact component={Relocate} />
      <Route path="/dashboard/clients/:clientId/relocate/add" exact component={AddRelocatePage} />
      <Route path="/dashboard/clients/:clientId/relocate/:relocateId/edit" exact component={EditRelocate} />

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
      <Route path="/dashboard/clients/:clientId/goals/sp-goals/:spGoalId/edit" exact component={EditSpGoals} />

      <Route path="/dashboard/clients/:clientId/medication" exact component={MedicationPage} />
      <Route path="/dashboard/clients/:clientId/medication/med-pass" exact component={MedPassPage} />
      <Route path="/dashboard/clients/:clientId/medication/med-destruction" exact component={MedDestructionPage} />
      <Route path="/dashboard/clients/:clientId/medication/medication-list" exact component={MedicationListPage} />
      <Route path="/dashboard/clients/:clientId/medication/medication-list/add" exact component={AddMedication} />
      <Route path="/dashboard/clients/:clientId/medication/medication-list/:medicationId/edit" exact component={EditMedicationPage} />

      <Route path="/dashboard/clients/:clientId/main-bank-statement" exact component={MainBankAccountPage} />
      <Route path="/dashboard/clients/:clientId/main-bank-statement/add" exact component={AddMainBankAccountPage} />
      <Route path="/dashboard/clients/:clientId/main-bank-statement/:mainBankStatementId/edit" exact component={EditMainBankAccountPage} />


    </Switch>
  );
}

export default withPathId({ pathSlugs:['clientId'] })(Clients);
