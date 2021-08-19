import URLS from '../../../utils/urls';
import ClientsImage from '../../../assets/svg/man-woman.svg';

export const getLinks = (clientId: string) => {
  return [
    {
      description: '',
      title: 'SP Goals',
      image: ClientsImage,
      path: URLS.getPagePath('sp-goals', { clientId })
    },
    {
      description: 'Collect data for client goals',
      title: 'Data Collection',
      image: ClientsImage,
      path: URLS.getPagePath('client-contacts', { clientId })
    },
    {
      description: '',
      title: 'Goals Database',
      image: ClientsImage,
      path: '/dashboard/clients'
    }
  ]
}
