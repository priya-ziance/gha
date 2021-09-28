import URLS from '../../../utils/urls';
import ClientsImage from '../../../assets/svg/man-woman.svg';
import ClientContactImage from '../../../assets/svg/id.svg';

export const getLinks = (clientId: string) => {
  return [
    {
      description: '',
      title: 'Goals',
      image: ClientsImage,
      path: URLS.getPagePath('client-info', { clientId }),
      interactive: true
    },
    {
      description: '',
      title: 'Sub Goals',
      image: ClientContactImage,
      path: URLS.getPagePath('client-contacts', { clientId }),
      interactive: true
    },
    {
      description: '',
      title: 'Tasks List',
      image: ClientsImage,
      path: URLS.getPagePath('apd', { clientId }),
      interactive: true
    }
  ]
}
