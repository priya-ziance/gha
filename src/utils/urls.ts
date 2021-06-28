import { PAGE_TYPES } from '../types';


type OPTIONS_TYPE = {
  clientId?: string
}

const getPagePath = (page: PAGE_TYPES, options: OPTIONS_TYPE = {}) => {
  switch (page) {
    case 'dashboard':
      return '/dashboard';
    case 'clients':
      return '/dashboard/clients';
    case 'client-links':
      return `/dashboard/clients/${options.clientId}/links`;
    case 'client-contacts':
      return `/dashboard/clients/${options.clientId}/client_contacts`;
    default:
      return '';
  }
}

const URLS = {
  dashboardUrl: '/dashboard',
  loginUrl: window.location.origin,
  logoutUrl: window.location.origin,
  redirectUrl: '/dashboard',
  getPagePath
}

export default URLS;
