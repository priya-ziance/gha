import URLS from '../../../utils/urls';
import ClientsImage from '../../../assets/svg/man-woman.svg';

export const getLinks = (clientId: string) => {
  return [
    {
      description: '',
      title: 'Info',
      image: ClientsImage,
      path: URLS.getPagePath('clients')
    },
    {
      description: '',
      title: 'Client Contacts',
      image: ClientsImage,
      path: URLS.getPagePath('client-contacts', { clientId })
    },
    {
      description: '',
      title: 'APD',
      image: ClientsImage,
      path: URLS.getPagePath('apd', { clientId })
    },
    {
      description: '',
      title: 'Expenses',
      image: ClientsImage,
      path: '/dashboard/clients'
    },
    {
      description: '',
      title: 'Logs',
      image: ClientsImage,
      path: '/dashboard/clients'
    },
    {
      description: '',
      title: 'Case Notes',
      image: ClientsImage,
      path: URLS.getPagePath('client-case-notes', { clientId })
    },
    {
      description: '',
      title: 'Goals',
      image: ClientsImage,
      path: URLS.getPagePath('goals', { clientId })
    },
    {
      description: '',
      title: 'Behaviours',
      image: ClientsImage,
      path: '/dashboard/clients'
    },
    {
      description: '',
      title: 'Appointments',
      image: ClientsImage,
      path: '/dashboard/clients'
    },
    {
      description: '',
      title: 'Medication',
      image: ClientsImage,
      path: '/dashboard/clients'
    },
    {
      description: '',
      title: 'Face Sheet',
      image: ClientsImage,
      path: '/dashboard/clients'
    },
    {
      description: '',
      title: 'Authorization',
      image: ClientsImage,
      path: '/dashboard/clients'
    },
    {
      description: '',
      title: 'Documents',
      image: ClientsImage,
      path: '/dashboard/clients'
    },
    {
      description: '',
      title: 'Inventory',
      image: ClientsImage,
      path: '/dashboard/clients'
    },
    {
      description: '',
      title: 'Submittals',
      image: ClientsImage,
      path: '/dashboard/clients'
    },
    {
      description: '',
      title: 'Comm Activity',
      image: ClientsImage,
      path: '/dashboard/clients'
    },
    {
      description: '',
      title: 'Seiure Log',
      image: ClientsImage,
      path: '/dashboard/clients'
    },
    {
      description: '',
      title: 'Descriptors',
      image: ClientsImage,
      path: '/dashboard/clients'
    }
  ]
}
