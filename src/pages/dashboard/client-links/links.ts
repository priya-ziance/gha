import URLS from '../../../utils/urls';
import ClientsImage from '../../../assets/svg/man-woman.svg';
import ClientContactImage from '../../../assets/svg/id.svg';

export const getLinks = (clientId: string) => {
  return [
    {
      description: '',
      title: 'Client Info',
      image: ClientsImage,
      path: URLS.getPagePath('client-info', { clientId }),
      interactive: true
    },
    {
      description: '',
      title: 'Client Contacts',
      image: ClientContactImage,
      path: URLS.getPagePath('client-contacts', { clientId }),
      interactive: true
    },
    {
      description: '',
      title: 'APD',
      image: ClientsImage,
      path: URLS.getPagePath('apd', { clientId }),
      interactive: false
    },
    {
      description: '',
      title: 'Expenses',
      image: ClientsImage,
      path: URLS.getPagePath('expenses', { clientId }),
      interactive: true
    },
    {
      description: '',
      title: 'Logs',
      image: ClientsImage,
      path: URLS.getPagePath('logs', { clientId }),
      interactive: true
    },
    {
      description: '',
      title: 'Case Notes',
      image: ClientsImage,
      path: URLS.getPagePath('client-case-notes', { clientId }),
      interactive: true
    },
    {
      description: '',
      title: 'Goals',
      image: ClientsImage,
      path: URLS.getPagePath('goals', { clientId }),
      interactive: true
    },
    {
      description: '',
      title: 'Behaviours',
      image: ClientsImage,
      path: URLS.getPagePath('behaviours', { clientId }),
      interactive: true
    },
    {
      description: '',
      title: 'Appointments',
      image: ClientsImage,
      path: URLS.getPagePath('appointments', { clientId }),
      interactive: true
    },
    {
      description: '',
      title: 'Medication',
      image: ClientsImage,
      path: URLS.getPagePath('medication', { clientId }),
      interactive: true
    },
    {
      description: '',
      title: 'Face Sheet',
      image: ClientsImage,
      // path: '/dashboard/clients',
      interactive: false
    },
    {
      description: '',
      title: 'Authorization',
      image: ClientsImage,
      // path: '/dashboard/clients',
      interactive: false
    },
    {
      description: '',
      title: 'Documents',
      image: ClientsImage,
      // path: '/dashboard/clients',
      interactive: false
    },
    {
      description: '',
      title: 'Inventory',
      image: ClientsImage,
      // path: '/dashboard/clients',
      interactive: false
    },
    {
      description: '',
      title: 'Submittals',
      image: ClientsImage,
      // path: '/dashboard/clients',
      interactive: false
    },
    {
      description: '',
      title: 'Comm Activity',
      image: ClientsImage,
      // path: '/dashboard/clients',
      interactive: false
    },
    {
      description: '',
      title: 'Seiure Log',
      image: ClientsImage,
      // path: '/dashboard/clients',
      interactive: false
    },
    {
      description: '',
      title: 'Descriptors',
      image: ClientsImage,
      // path: '/dashboard/clients',
      interactive: false
    },
    {
      description: '',
      title: 'Relocate / Transfer',
      image: ClientsImage,
      path: URLS.getPagePath('relocate', { clientId }),
      interactive: true
    },
    {
      description: '',
      title: 'Client Witness',
      image: ClientsImage,
      path: URLS.getPagePath('client-witness', { clientId }),
      interactive: true
    },
    {
      description: '',
      title: 'Staff Witness',
      image: ClientsImage,
      path: URLS.getPagePath('staff-witness', { clientId }),
      interactive: true
    },
    {
      description: '',
      title: 'Trainer',
      image: ClientsImage,
      path: URLS.getPagePath('trainer', { clientId }),
      interactive: true
    },
    {
      description: '',
      title: 'Home Discharge',
      image: ClientsImage,
      path: URLS.getPagePath('discharge', { clientId }),
      interactive: true
    },
    {
      description: '',
      title: 'ADP',
      image: ClientsImage,
      path: URLS.getPagePath('adp', { clientId }),
      interactive: true
    },
    {
      description: '',
      title: 'Personal Funds',
      image: ClientsImage,
      path: URLS.getPagePath('personal_funds', { clientId }),
      interactive: true
    },
    {
      description: '',
      title: 'Personal Bank Statement',
      image: ClientsImage,
      path: URLS.getPagePath('personal_bank_statement', { clientId }),
      interactive: true
    },
    {
      description: '',
      title: 'Community Activities',
      image: ClientsImage,
      path: URLS.getPagePath('community_activities', { clientId }),
      interactive: true
    },
    {
      description: '',
      title: 'Inventory',
      image: ClientsImage,
      path: URLS.getPagePath('inventory', { clientId }),
      interactive: true
    },
    {
      description: '',
      title: 'Main Account Bank Statement',
      image: ClientsImage,
      path: URLS.getPagePath('main-bank-statement', { clientId }),
      interactive: true
    },
  ]
}
