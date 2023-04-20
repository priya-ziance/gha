import { PAGE_TYPES } from "../types";

type OPTIONS_TYPE = {
  appointmentId?: string;
  caseNoteId?: string;
  clientContactId?: string;
  clientId?: string;
  bankStatementId?: string;
  behaviourId?: string;
  expenseId?: string;
  expensesListId?: string;
  locationId?: string;
  medicationId?: string;
  medicalContactId?: string;
  goalId?: string;
  subGoalId?: string;
  taskId?: string;
};

const getPagePath = (page: PAGE_TYPES, options: OPTIONS_TYPE = {}) => {
  const dashboardBase = `/dashboard`;
  const clientBase = `${dashboardBase}/clients/${options.clientId}`;

  switch (page) {
    case "admins":
      return `${dashboardBase}/admins`;
    case "add-apd":
      return `${clientBase}/apd/add`;
    case "add-appointment":
      return `${clientBase}/appointments/add`;
    case "add-bank-statement":
      return `${clientBase}/expenses/bank-statement/add`;
    case "add-client-case-notes":
      return `${clientBase}/client-case-notes/add`;
    case "add-client-contact":
      return `${clientBase}/client-contacts/add`;
    case "add-client-witness":
      return `${clientBase}/client-witness/add`;
    case "add-staff-witness":
      return `${clientBase}/staff-witness/add`;
    case "trainer":
      return `${clientBase}/trainer`;
    case "add-trainer":
        return `${clientBase}/trainer/add`;
    case "add-database-behaviour":
      return `${clientBase}/behaviours/database/add`;
    case "add-database-goal":
      return `${clientBase}/goals/database/goals/add`;
    case "add-database-subgoal":
      return `${clientBase}/goals/database/subgoals/add`;
    case "add-database-task":
      return `${clientBase}/goals/database/tasks/add`;
    case "add-expenses-account":
      return `${clientBase}/expenses/expense-account/add`;
    case "add-expenses-list":
      return `${clientBase}/expenses/expenses-list/add`;
    case "add-location":
      return `${dashboardBase}/locations/add`;
    case "add-medication":
      return `${clientBase}/medication/medication-list/add`;
    case "add-medical-contact":
      return `${dashboardBase}/admins/medical-contacts/add-medical-contact`;
    case "add-sp-goals":
      return `${clientBase}/goals/sp-goals/add`;
    case "apd":
      return `${clientBase}/apd`;
    case "appointments":
      return `${clientBase}/appointments`;
    case "bank-statement":
      return `${clientBase}/expenses/bank-statement`;
    case "behaviours":
      return `${clientBase}/behaviours`;
    case "behaviours-assign":
      return `${clientBase}/behaviours/assign`;
    case "behaviours-database":
      return `${clientBase}/behaviours/database`;
    case "behaviours-problems":
      return `${clientBase}/behaviours/behaviours-problems`;
    case "dashboard":
      return "/dashboard";
    case "clients":
      return "/dashboard/clients";
    case "client-case-notes":
      return `${clientBase}/client-case-notes`;
    case "client-links":
      return `${clientBase}/links`;
    case "client-contacts":
      return `${clientBase}/client-contacts`;
    case "client-witness":
      return `${clientBase}/client-witness`;
    case "staff-witness":
      return `${clientBase}/staff-witness`;
    case "client-info":
      return `${clientBase}/client-info`;
    case "edit-appointment":
      return `${clientBase}/appointments/${options.appointmentId}/edit`;
    case "edit-bank-statement":
      return `${clientBase}/expenses/bank-statements/${options.bankStatementId}/edit`;
    case "edit-case-note":
      return `${clientBase}/client-case-notes/${options.caseNoteId}/edit`;
    case "edit-client-contact":
      return `${clientBase}/client-contacts/${options.clientContactId}/edit`;
    case "edit-client-witness":
      return `${clientBase}/client-witness/${options.clientContactId}/edit`;
    case "edit-staff-witness":
      return `${clientBase}/staff-witness/${options.clientContactId}/edit`;
    case "edit-trainer":
      return `${clientBase}/trainer/${options.clientContactId}/edit`;
    case "edit-database-behaviour":
      return `${clientBase}/behaviours/database/${options.behaviourId}/edit`;
    case "edit-database-goal":
      return `${clientBase}/goals/database/goals/${options.goalId}/edit`;
    case "edit-database-subgoal":
      return `${clientBase}/goals/database/subgoals/${options.subGoalId}/edit`;
    case "edit-database-task":
      return `${clientBase}/goals/database/tasks/${options.taskId}/edit`;
    case "edit-expense-account":
      return `${clientBase}/expenses/${options.expenseId}/edit`;
    case "edit-expenses-list":
      return `${clientBase}/expenses/expenses-list/${options.expensesListId}/edit`;
    case "edit-location":
      return `${dashboardBase}/locations/${options.locationId}/edit`;
    case "edit-medication":
      return `${clientBase}/medication/medication-list/${options.medicationId}/edit`;
    case "edit-medical-contact":
      return `${dashboardBase}/admins/medical-contacts/${options.medicalContactId}/edit`;
    case "expenses":
      return `${clientBase}/expenses`;
    case "expenses-account":
      return `${clientBase}/expenses/expense-account`;
    case "expenses-list":
      return `${clientBase}/expenses/expenses-list`;
    case "goals":
      return `${clientBase}/goals`;
    case "goals-data-collection":
      return `${clientBase}/goals/data-collection`;
    case "goals-database":
      return `${clientBase}/goals/database`;
    case "goals-database-goals":
      return `${clientBase}/goals/database/goals`;
    case "goals-database-subgoals":
      return `${clientBase}/goals/database/subgoals`;
    case "goals-database-tasks":
      return `${clientBase}/goals/database/tasks`;
    case "life-skills":
      return `${dashboardBase}/logs/life-skills`;
    case "life-skills-logs":
      return `${dashboardBase}/logs/life-skills/logs`;
    case "life-skills-places-database":
      return `${dashboardBase}/logs/life-skills/places-database`;
    case "life-skills-notes-database":
      return `${dashboardBase}/logs/life-skills/notes-database`;
    case "logs":
      return `${dashboardBase}/logs`;
    case "locations":
      return `${dashboardBase}/locations`;
    case "medical-contacts":
      return `${dashboardBase}/admins/medical-contacts`;
    case "med-destruction":
      return `${clientBase}/medication/med-destruction`;
    case "med-pass":
      return `${clientBase}/medication/med-pass`;
    case "medication":
      return `${clientBase}/medication`;
    case "medication-list":
      return `${clientBase}/medication/medication-list`;
    case "personal-support":
      return `${dashboardBase}/logs/personal-support`;
    case "personal-support-logs":
      return `${dashboardBase}/logs/personal-support/logs`;
    case "personal-support-places-database":
      return `${dashboardBase}/logs/personal-support/places-database`;
    case "personal-support-notes-database":
      return `${dashboardBase}/logs/personal-support/notes-database`;
    case "reshab-logs":
      return `${dashboardBase}/logs/reshab-logs`;
    case "respite-logs":
      return `${dashboardBase}/logs/respite-logs`;
    case "sp-goals":
      return `${clientBase}/goals/sp-goals`;
    default:
      return "";
  }
};

const getPagePathName = (page: PAGE_TYPES) => {
  switch (page) {
    case "admins":
      return "Admins";
    case "add-apd":
      return "Add APD";
    case "add-appointment":
      return "Add Appointment";
    case "add-bank-statement":
      return "Add Bank Statement";
    case "add-client-case-notes":
      return `Add Client Case Note`;
    case "add-database-behaviour":
      return "Add Database Behaviour";
    case "add-client-contact":
      return `Add Client Contact`;
    case "add-client-witness":
      return `Add Client Witness`;
    case "add-staff-witness":
      return `Add Staff Witness`;
    case "trainer":
        return `Trainer`;
    case "add-trainer":
      return `Add Trainer`;
    case "add-database-goal":
      return "Add Database Goal";
    case "add-database-subgoal":
      return "Add Database Sugboal";
    case "add-database-task":
      return "Add Database Tasks";
    case "add-expenses-account":
      return "Add Main Account Expense";
    case "add-expenses-list":
      return "Add Expenses List";
    case "add-medication":
      return "Add Client Medication";
    case "add-medical-contact":
      return "Add Medical Contact";
    case "add-location":
      return "Add Location";
    case "add-sp-goals":
      return `Add SP Goals`;
    case "apd":
      return "APD";
    case "appointments":
      return "Appointments";
    case "bank-statement":
      return "Bank Statements";
    case "behaviours":
      return "Behaviours";
    case "behaviours-assign":
      return "Behaviours Assign";
    case "behaviours-database":
      return "Behaviours Database";
    case "behaviours-problems":
      return "Behaviour Problems";
    case "dashboard":
      return "Dashboard";
    case "clients":
      return "Clients";
    case "client-case-notes":
      return `Client Case Notes`;
    case "client-info":
      return "Client Info";
    case "client-links":
      return `Client Links`;
    case "client-contacts":
      return `Client Contacts`;
    case "client-witness":
      return `Client Witness`;
    case "staff-witness":
      return `Staff Witness`;
    // case "add-trainer":
    //   return `Add Trainer`;
    case "edit-appointment":
      return "Edit Appointment";
    case "edit-bank-statement":
      return "Edit Bank Statement";
    case "edit-client-contact":
      return "Edit Client Contact";
    case "edit-client-witness":
      return "Edit Client Witness";
    case "edit-staff-witness":
      return "Edit Staff Witness";
    case "edit-trainer":
        return "Edit Trainer";
    case "edit-database-behaviour":
      return "Edit Behaviour";
    case "edit-database-goal":
      return "Edit Goal";
    case "edit-database-subgoal":
      return "Edit SubGoal";
    case "edit-database-task":
      return "Edit Task";
    case "edit-case-note":
      return "Edit Case Note";
    case "edit-expense-account":
      return "Edit Expense";
    case "edit-expenses-list":
      return "Edit Expense List";
    case "edit-location":
      return "Edit Location";
    case "edit-medical-contact":
      return "Edit Medical Contact";
    case "expenses":
      return "Expenses";
    case "expenses-account":
      return "Expenses Main Account";
    case "expenses-list":
      return "Expenses List";
    case "edit-medication":
      return "Edit Medication";
    case "goals":
      return `Client Goals`;
    case "goals-data-collection":
      return "Goals Data Collection";
    case "goals-database":
      return "Goals Database";
    case "goals-database-goals":
      return "Goals Database Goals";
    case "goals-database-subgoals":
      return "Goals Database Subgoals";
    case "goals-database-tasks":
      return "Tasks";
    case "life-skills":
      return "Life Skills";
    case "life-skills-logs":
      return "Life Skills Logs";
    case "life-skills-places-database":
      return "Life Skills Places Database";
    case "life-skills-notes-database":
      return "Life Skills Notes Database";
    case "locations":
      return "Locations";
    case "logs":
      return "Logs";
    case "medical-contacts":
      return "Medical Contacts";
    case "med-destruction":
      return "Medication Destruction List";
    case "med-pass":
      return "Med Pass List";
    case "medication":
      return "Medication";
    case "medication-list":
      return "Medication List";
    case "personal-support":
      return "Personal Support";
    case "personal-support-logs":
      return "Personal Support Logs";
    case "personal-support-places-database":
      return "Personal Support Places Database";
    case "personal-support-notes-database":
      return "Personal Support Notes Database";
    case "reshab-logs":
      return "Reshab Logs";
    case "respite-logs":
      return "Respite Logs";
    case "sp-goals":
      return `Client SP Goals`;
    default:
      return "";
  }
};

const URLS = {
  dashboardUrl: "/dashboard",
  loginUrl: window.location.origin,
  logoutUrl: window.location.origin,
  redirectUrl: "/dashboard",
  getPagePath,
  getPagePathName,
};

export default URLS;
