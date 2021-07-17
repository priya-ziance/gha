import { PAGE_TYPES } from '../types';


type OPTIONS_TYPE = {
  clientId?: string
}

const getPagePath = (page: PAGE_TYPES, options: OPTIONS_TYPE = {}) => {
  const clientBase = `/dashboard/clients/${options.clientId}`;

  switch (page) {
    case 'add-client-case-notes':
      return `${clientBase}/client_case_notes/add`;
    case 'add-client-contact':
      return `${clientBase}/client_contacts/add`;
    case 'add-sp-goals':
      return `${clientBase}/goals/sp_goals/add`;
    case 'dashboard':
      return '/dashboard';
    case 'clients':
      return '/dashboard/clients';
    case 'client-case-notes':
      return `${clientBase}/client_case_notes`;
    case 'client-links':
      return `${clientBase}/links`;
    case 'client-contacts':
      return `${clientBase}/client_contacts`;
    case 'goals':
      return `${clientBase}/goals`;
    case 'sp-goals':
      return `${clientBase}/goals/sp_goals`;
    default:
      return '';
  }
}

const getPagePathName = (page: PAGE_TYPES) => {
  switch (page) {
    case 'add-client-case-notes':
      return `Add Client Case Note`;
    case 'add-client-contact':
      return `Add Client Contact`;
    case 'add-sp-goals':
      return `Add SP Goals`;
    case 'dashboard':
      return 'Dashboard';
    case 'clients':
      return 'Clients';
    case 'client-case-notes':
      return `Client Case Notes`;
    case 'client-links':
      return `Client Links`;
    case 'client-contacts':
      return `Client Contacts`;
    case 'goals':
      return `Client Goals`;
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
