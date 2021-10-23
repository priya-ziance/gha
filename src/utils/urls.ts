import { PAGE_TYPES } from '../types';


type OPTIONS_TYPE = {
  clientId?: string,
  goalId?: string,
  subGoalId?: string,
  taskId?: string
}

const getPagePath = (page: PAGE_TYPES, options: OPTIONS_TYPE = {}) => {
  const clientBase = `/dashboard/clients/${options.clientId}`;

  switch (page) {
    case 'add-apd':
      return `${clientBase}/apd/add`;
    case 'add-client-case-notes':
      return `${clientBase}/client-case-notes/add`;
    case 'add-client-contact':
      return `${clientBase}/client-contacts/add`;
    case 'add-database-goal':
      return `${clientBase}/goals/database/goals/add`;
    case 'add-database-subgoal':
      return `${clientBase}/goals/database/subgoals/add`;
    case 'add-database-task':
      return `${clientBase}/goals/database/tasks/add`;
    case 'add-sp-goals':
      return `${clientBase}/goals/sp-goals/add`;
    case 'apd':
      return `${clientBase}/apd`;
    case 'behaviours':
      return `${clientBase}/behaviours`;
    case 'behaviours-assign':
      return `${clientBase}/behaviours/assign`;
    case 'dashboard':
      return '/dashboard';
    case 'clients':
      return '/dashboard/clients';
    case 'client-case-notes':
      return `${clientBase}/client-case-notes`;
    case 'client-links':
      return `${clientBase}/links`;
    case 'client-contacts':
      return `${clientBase}/client-contacts`;
    case 'client-info':
      return `${clientBase}/client-info`;
    case 'edit-database-goal':
      return `${clientBase}/goals/database/goals/${options.goalId}/edit`;
    case 'edit-database-subgoal':
      return `${clientBase}/goals/database/subgoals/${options.subGoalId}/edit`;
    case 'edit-database-task':
      return `${clientBase}/goals/database/tasks/${options.taskId}/edit`;
    case 'goals':
      return `${clientBase}/goals`;
    case 'goals-data-collection':
      return `${clientBase}/goals/data-collection`;
    case 'goals-database':
      return `${clientBase}/goals/database`;
    case 'goals-database-goals':
      return `${clientBase}/goals/database/goals`;
    case 'goals-database-subgoals':
      return `${clientBase}/goals/database/subgoals`;
    case 'goals-database-tasks':
      return `${clientBase}/goals/database/tasks`;
    case 'life-skills':
      return `${clientBase}/logs/life-skills`;
    case 'logs':
      return `${clientBase}/logs`;
    case 'personal-support':
      return `${clientBase}/logs/personal-support`;
    case 'reshab-logs':
      return `${clientBase}/logs/reshab-logs`;
    case 'respite-logs':
      return `${clientBase}/logs/respite-logs`;
    case 'sp-goals':
      return `${clientBase}/goals/sp-goals`;
    default:
      return '';
  }
}

const getPagePathName = (page: PAGE_TYPES) => {
  switch (page) {
    case 'add-apd':
      return 'Add APD';
    case 'add-client-case-notes':
      return `Add Client Case Note`;
    case 'add-client-contact':
      return `Add Client Contact`;
    case 'add-database-goal':
      return 'Add Database Goal';
    case 'add-database-subgoal':
      return 'Add Database Sugboal';
    case 'add-database-task':
      return 'Add Database Tasks';
    case 'add-sp-goals':
      return `Add SP Goals`;
    case 'apd':
      return 'APD';
    case 'behaviours':
      return 'Behaviours';
    case 'behaviours-assign':
      return 'Behaviours Assign';
    case 'dashboard':
      return 'Dashboard';
    case 'clients':
      return 'Clients';
    case 'client-case-notes':
      return `Client Case Notes`;
    case 'client-info':
      return 'Client Info';
    case 'client-links':
      return `Client Links`;
    case 'client-contacts':
      return `Client Contacts`;
    case 'edit-database-goal':
      return 'Edit Goal';
    case 'edit-database-subgoal':
      return 'Edit SubGoal';
    case 'edit-database-task':
      return 'Edit Task';
    case 'goals':
      return `Client Goals`;
    case 'goals-data-collection':
      return 'Goals Data Collection'
    case 'goals-database':
      return 'Goals Database'
    case 'goals-database-goals':
      return 'Goals Database Goals'
    case 'goals-database-subgoals':
      return 'Goals Database Subgoals'
    case 'goals-database-tasks':
      return 'Tasks'
    case 'life-skills':
      return 'Life Skills';
    case 'logs':
      return 'Logs';
    case 'personal-support':
      return 'Personal Support';
    case 'reshab-logs':
      return 'Reshab Logs';
    case 'respite-logs':
      return 'Respite Logs';
    case 'sp-goals':
      return `Client SP Goals`;
    default:
      return '';
  }
}

const URLS = {
  dashboardUrl: '/dashboard',
  loginUrl: window.location.origin,
  logoutUrl: window.location.origin,
  redirectUrl: '/dashboard',
  getPagePath,
  getPagePathName
}

export default URLS;
