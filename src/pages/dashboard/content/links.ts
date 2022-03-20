import URLS from '../../../utils/urls';
import ClientsImage from '../../../assets/svg/man-woman.svg';
import ListImage from '../../../assets/svg/list.svg';

export const getLinks = () => {
  return [
    {
      description: '',
      title: 'Clients',
      image: ClientsImage,
      path: URLS.getPagePath('clients')
    },
    {
      description: '',
      title: 'Logs',
      image: ListImage,
      path: URLS.getPagePath('logs')
    }
  ]
}
