import { PAGE_TYPES } from '../types';


type OPTIONS_TYPE = {
  clientId?: string
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
    case 'add-sp-goals':
      return `${clientBase}/goals/sp-goals/add`;
    case 'apd':
      return `${clientBase}/apd`;
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
    case 'goals':
      return `${clientBase}/goals`;
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
    case 'add-sp-goals':
      return `Add SP Goals`;
    case 'apd':
      return 'APD';
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
