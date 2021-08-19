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
      // path: URLS.getPagePath('apd', { clientId }),
      interactive: false
    },
    {
      description: '',
      title: 'Expenses',
      image: ClientsImage,
      // path: '/dashboard/clients',
      interactive: false
    },
    {
      description: '',
      title: 'Logs',
      image: ClientsImage,
      // path: '/dashboard/clients',
      interactive: false
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
      // path: '/dashboard/clients',
      interactive: false
    },
    {
      description: '',
      title: 'Appointments',
      image: ClientsImage,
      // path: '/dashboard/clients',
      interactive: false
    },
    {
      description: '',
      title: 'Medication',
      image: ClientsImage,
      // path: '/dashboard/clients',
      interactive: false
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
    }
  ]
}
